package com.vendeze.config;

import com.vendeze.model.Role;
import com.vendeze.model.User;
import com.vendeze.model.Vendor;
import com.vendeze.repository.UserRepository;
import com.vendeze.repository.VendorRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;

/**
 * Creates a couple of ready-to-use email/password test accounts on first
 * startup, so "test the email login" doesn't require signing up first.
 * Uses the real PasswordEncoder bean, so the hash is guaranteed correct —
 * no hand-typed/guessed hash string anywhere in this codebase.
 *
 * Runs every startup but checks for existing emails first, so it's safe
 * to restart the app without creating duplicates.
 */
@Component
public class DataSeeder implements CommandLineRunner {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(UserRepository userRepository, VendorRepository vendorRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
        this.passwordEncoder = passwordEncoder;
    }

    private static final String TEST_PASSWORD = "Test1234!";

    @Override
    public void run(String... args) {
        seedEmailCustomer();
        seedEmailVendor();
    }

    private void seedEmailCustomer() {
        String email = "customer.test@vendeze.lk";
        if (userRepository.findByEmail(email).isPresent()) return;

        userRepository.save(User.builder()
            .name("Test Customer")
            .email(email)
            .avatarInitials("TC")
            .role(Role.CUSTOMER)
            .authProvider(User.AuthProvider.EMAIL)
            .providerId(email)
            .passwordHash(passwordEncoder.encode(TEST_PASSWORD))
            .build());

        System.out.println("[DataSeeder] Email test account ready — " + email + " / " + TEST_PASSWORD);
    }

    private void seedEmailVendor() {
        String email = "vendor.test@vendeze.lk";
        if (userRepository.findByEmail(email).isPresent()) return;

        User user = userRepository.save(User.builder()
            .name("Test Vendor")
            .email(email)
            .avatarInitials("TV")
            .role(Role.VENDOR)
            .authProvider(User.AuthProvider.EMAIL)
            .providerId(email)
            .passwordHash(passwordEncoder.encode(TEST_PASSWORD))
            .build());

        Vendor vendor = vendorRepository.save(Vendor.builder()
            .ownerUserId(user.getId())
            .name("Test Vendor Studio")
            .categoryId("photo")
            .area("Batticaloa")
            .rating(BigDecimal.ZERO)
            .reviewsCount(0)
            .priceFrom(new BigDecimal("15000"))
            .blurb("Seeded test vendor account — safe to edit from the dashboard.")
            .status(Vendor.VendorStatus.ACTIVE)
            .successRate(new BigDecimal("96.0"))
            .build());

        user.setVendorId(vendor.getId());
        userRepository.save(user);

        System.out.println("[DataSeeder] Email test account ready — " + email + " / " + TEST_PASSWORD);
    }
}
