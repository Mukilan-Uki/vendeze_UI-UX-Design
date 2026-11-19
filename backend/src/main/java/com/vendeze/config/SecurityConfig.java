package com.vendeze.config;

import com.vendeze.security.JwtAuthFilter;
import com.vendeze.security.OAuth2LoginSuccessHandler;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
@EnableMethodSecurity // turns on @PreAuthorize("hasRole('ADMIN')") etc. in controllers
public class SecurityConfig {

    private final JwtAuthFilter jwtAuthFilter;
    private final OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler;
    private final String[] corsAllowedOrigins;

    public SecurityConfig(
        JwtAuthFilter jwtAuthFilter,
        OAuth2LoginSuccessHandler oAuth2LoginSuccessHandler,
        @Value("${app.cors-allowed-origins}") String corsAllowedOrigins
    ) {
        this.jwtAuthFilter = jwtAuthFilter;
        this.oAuth2LoginSuccessHandler = oAuth2LoginSuccessHandler;
        this.corsAllowedOrigins = corsAllowedOrigins.split(",");
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
            .cors(cors -> cors.configurationSource(corsConfigurationSource()))
            // CSRF is for cookie-based sessions; this API is stateless and
            // authenticates every request with a JWT bearer token instead,
            // so there's no session cookie for an attacker to ride on.
            .csrf(AbstractHttpConfigurer::disable)
            .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))

            .authorizeHttpRequests(auth -> auth
                // public, read-only browsing — no login required, same as
                // the prototype's "browse as a guest" flow. Note /api/vendors/**
                // covers GET (browsing) only in practice — there's no POST/PUT
                // mapped on that path by any controller, so nothing writable
                // is accidentally exposed here.
                .requestMatchers("/api/categories/**", "/api/vendors/**").permitAll()
                .requestMatchers(org.springframework.http.HttpMethod.GET, "/api/ads", "/api/popup").permitAll()
                .requestMatchers("/api/auth/**").permitAll()
                .requestMatchers("/login/**", "/oauth2/**").permitAll()
                .requestMatchers("/api/admin/**").hasAnyRole("ADMIN", "DEVELOPER")
                .requestMatchers("/api/vendor-dashboard/**").hasRole("VENDOR")
                .anyRequest().authenticated()
            )

            // the OAuth2 "login with Google/Apple" handshake — still uses a
            // session for the brief redirect dance itself; everything after
            // that (every /api/** call) is authenticated via the JWT filter below
            .oauth2Login(oauth2 -> oauth2
                .successHandler(oAuth2LoginSuccessHandler)
            )

            .addFilterBefore(jwtAuthFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of(corsAllowedOrigins));
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"));
        config.setAllowedHeaders(List.of("Authorization", "Content-Type"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }
}
