package com.vendeze.controller;

import com.vendeze.model.Role;
import com.vendeze.model.User;
import com.vendeze.model.Vendor;
import com.vendeze.repository.UserRepository;
import com.vendeze.repository.VendorRepository;
import com.vendeze.security.JwtService;
import com.vendeze.security.VendezePrincipal;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final JwtService jwtService;
    private final PasswordEncoder passwordEncoder;
    private final boolean devLoginEnabled;

    public AuthController(
        UserRepository userRepository,
        VendorRepository vendorRepository,
        JwtService jwtService,
        PasswordEncoder passwordEncoder,
        @Value("${app.dev-login-enabled:true}") boolean devLoginEnabled
    ) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.jwtService = jwtService;
        this.passwordEncoder = passwordEncoder;
        this.devLoginEnabled = devLoginEnabled;
    }

    // ---------------------------------------------------------------
    // Email + password signup and login
    // ---------------------------------------------------------------

    public record SignupRequest(
        @NotBlank String name,
        @Email @NotBlank String email,
        @Size(min = 8, message = "Password must be at least 8 characters.") String password,
        @NotBlank String role,        // "CUSTOMER" or "VENDOR" — see validation below
        String businessName,          // required if role = VENDOR
        String category               // required if role = VENDOR — must match an existing category id
    ) {}

    /**
     * Self-service signup only ever creates a CUSTOMER or VENDOR account.
     * Admin and developer accounts are never self-signed-up — in this
     * codebase they only exist via the seed data (see DataSeeder), the
     * same way a real company would provision internal staff accounts by
     * hand rather than letting anyone sign up as an admin.
     */
    @PostMapping("/signup")
    @Transactional
    public ResponseEntity<?> signup(@Valid @RequestBody SignupRequest req) {
        String email = req.email().trim().toLowerCase();

        if (userRepository.findByEmail(email).isPresent()) {
            return ResponseEntity.status(409).body(Map.of("error", "An account with that email already exists."));
        }

        Role role;
        try {
            role = Role.valueOf(req.role().toUpperCase());
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "role must be CUSTOMER or VENDOR."));
        }
        if (role != Role.CUSTOMER && role != Role.VENDOR) {
            return ResponseEntity.status(403).body(Map.of(
                "error", "Only customer or vendor accounts can be created through signup."
            ));
        }

        User user = User.builder()
            .name(req.name().trim())
            .email(email)
            .role(role)
            .authProvider(User.AuthProvider.EMAIL)
            .providerId(email) // EMAIL accounts have no external provider id, so use the email itself
            .passwordHash(passwordEncoder.encode(req.password()))
            .build();
        user = userRepository.save(user);

        // A brand-new vendor needs a vendor profile to manage — created here
        // with sensible defaults; they fill in pricing/portfolio/packages
        // from their own dashboard afterward.
        if (role == Role.VENDOR) {
            if (req.businessName() == null || req.businessName().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "businessName is required for a vendor account."));
            }
            if (req.category() == null || req.category().isBlank()) {
                return ResponseEntity.badRequest().body(Map.of("error", "category is required for a vendor account."));
            }
            Vendor vendor = Vendor.builder()
                .ownerUserId(user.getId())
                .name(req.businessName().trim())
                .categoryId(req.category())
                .area("Batticaloa")
                .rating(BigDecimal.ZERO)
                .reviewsCount(0)
                .priceFrom(BigDecimal.ZERO)
                .blurb("New vendor — update your profile from the dashboard.")
                .status(Vendor.VendorStatus.ACTIVE)
                .successRate(new BigDecimal("96.0"))
                .build();
            vendor = vendorRepository.save(vendor);
            user.setVendorId(vendor.getId());
            user = userRepository.save(user);
        }

        return ResponseEntity.ok(buildLoginResponse(user));
    }

    public record LoginRequest(@Email @NotBlank String email, @NotBlank String password) {}

    @PostMapping("/login")
    public ResponseEntity<?> login(@Valid @RequestBody LoginRequest req) {
        String email = req.email().trim().toLowerCase();
        User user = userRepository.findByEmail(email).orElse(null);

        if (user == null || user.getAuthProvider() != User.AuthProvider.EMAIL || user.getPasswordHash() == null) {
            // same message whether the account doesn't exist or isn't an
            // email account at all — don't reveal which, to anyone probing
            return ResponseEntity.status(401).body(Map.of("error", "Incorrect email or password."));
        }
        if (!passwordEncoder.matches(req.password(), user.getPasswordHash())) {
            return ResponseEntity.status(401).body(Map.of("error", "Incorrect email or password."));
        }
        return ResponseEntity.ok(buildLoginResponse(user));
    }

    // ---------------------------------------------------------------
    // Dev login (unchanged) — instant login as any seeded demo account,
    // local testing only
    // ---------------------------------------------------------------

    @PostMapping("/dev-login")
    public ResponseEntity<?> devLogin(@RequestBody Map<String, Long> body) {
        if (!devLoginEnabled) {
            return ResponseEntity.status(403).body(Map.of("error", "Dev login is disabled."));
        }
        Long userId = body.get("userId");
        if (userId == null) {
            return ResponseEntity.badRequest().body(Map.of("error", "userId is required."));
        }
        User user = userRepository.findById(userId).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("error", "No such user."));
        }
        return ResponseEntity.ok(buildLoginResponse(user));
    }

    @GetMapping("/demo-accounts")
    public ResponseEntity<?> demoAccounts() {
        if (!devLoginEnabled) return ResponseEntity.status(403).build();
        List<User> users = userRepository.findAll();
        return ResponseEntity.ok(users.stream().map(u -> Map.of(
            "id", u.getId(),
            "name", u.getName(),
            "email", u.getEmail(),
            "role", u.getRole().name(),
            "avatarInitials", u.getAvatarInitials() == null ? "" : u.getAvatarInitials()
        )).toList());
    }

    @GetMapping("/me")
    public ResponseEntity<?> me(@AuthenticationPrincipal VendezePrincipal principal) {
        if (principal == null) return ResponseEntity.status(401).build();
        return ResponseEntity.ok(Map.of(
            "id", principal.userId(),
            "email", principal.email(),
            "role", principal.role(),
            "vendorId", principal.vendorId() == null ? 0 : principal.vendorId()
        ));
    }

    // ---------------------------------------------------------------
    // Shared response shape — every login path (signup, email login,
    // dev-login, and OAuth2LoginSuccessHandler separately) returns the
    // same { token, user } shape, so the front end handles them identically
    // ---------------------------------------------------------------
    private Map<String, Object> buildLoginResponse(User user) {
        String token = jwtService.generateToken(
            user.getId(), user.getEmail(), user.getRole().name(), user.getVendorId()
        );
        return Map.of(
            "token", token,
            "user", Map.of(
                "id", user.getId(),
                "name", user.getName(),
                "email", user.getEmail(),
                "role", user.getRole().name(),
                "avatarInitials", user.getAvatarInitials() == null ? "" : user.getAvatarInitials(),
                "vendorId", user.getVendorId() == null ? 0 : user.getVendorId()
            )
        );
    }
}
