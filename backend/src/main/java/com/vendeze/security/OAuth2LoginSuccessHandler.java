package com.vendeze.security;

import com.vendeze.model.Role;
import com.vendeze.model.User;
import com.vendeze.repository.UserRepository;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.oidc.user.OidcUser;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;
import org.springframework.web.util.UriComponentsBuilder;

import java.io.IOException;

/**
 * Runs once, right after Google or Apple confirms the person's identity.
 * Finds-or-creates the matching User row, then redirects to the React app
 * with a short-lived JWT in the URL — the SPA reads it once and stores it
 * (e.g. in memory / sessionStorage), after which every API call uses that
 * JWT instead of the OAuth2 session.
 */
@Component
public class OAuth2LoginSuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final String frontendUrl;

    public OAuth2LoginSuccessHandler(
        UserRepository userRepository,
        JwtService jwtService,
        @Value("${app.frontend-url}") String frontendUrl
    ) {
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.frontendUrl = frontendUrl;
    }

    @Override
    public void onAuthenticationSuccess(
        HttpServletRequest request,
        HttpServletResponse response,
        Authentication authentication
    ) throws IOException, ServletException {

        OAuth2User oauthUser = (OAuth2User) authentication.getPrincipal();
        String registrationId = extractRegistrationId(request);
        User.AuthProvider provider = "apple".equals(registrationId)
            ? User.AuthProvider.APPLE
            : User.AuthProvider.GOOGLE;

        String providerId = oauthUser.getName(); // the "sub" claim for both Google and Apple OIDC
        String email = oauthUser.getAttribute("email");
        String name = oauthUser.getAttribute("name");

        // Apple only sends the name on the very first authorization ever —
        // on every later login it's null, so don't overwrite a stored name with it.
        if (name == null && email != null) {
            name = email.substring(0, email.indexOf('@'));
        }

        User user = userRepository.findByAuthProviderAndProviderId(provider, providerId)
            .or(() -> email != null ? userRepository.findByEmail(email) : java.util.Optional.empty())
            .orElseGet(() -> User.builder()
                .email(email)
                .name(name)
                .role(Role.CUSTOMER) // default role for a brand-new sign-up
                .authProvider(provider)
                .providerId(providerId)
                .build());

        // keep provider linkage current even if this user first signed up
        // the other way (e.g. originally Google, now also tries Apple with the same email)
        user.setAuthProvider(provider);
        user.setProviderId(providerId);
        if (user.getName() == null) user.setName(name);
        user = userRepository.save(user);

        String token = jwtService.generateToken(
            user.getId(), user.getEmail(), user.getRole().name(), user.getVendorId()
        );

        String redirectUrl = UriComponentsBuilder.fromUriString(frontendUrl + "/oauth-callback")
            .queryParam("token", token)
            .build()
            .toUriString();

        response.sendRedirect(redirectUrl);
    }

    private String extractRegistrationId(HttpServletRequest request) {
        // request URI looks like /login/oauth2/code/google or /login/oauth2/code/apple
        String uri = request.getRequestURI();
        String[] parts = uri.split("/");
        return parts[parts.length - 1];
    }
}
