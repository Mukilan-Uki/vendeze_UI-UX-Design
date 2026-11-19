package com.vendeze.controller;

import com.vendeze.model.Role;
import com.vendeze.model.User;
import com.vendeze.model.Vendor;
import com.vendeze.repository.UserRepository;
import com.vendeze.repository.VendorRepository;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@PreAuthorize("hasAnyRole('ADMIN','DEVELOPER')") // belt-and-suspenders on top of SecurityConfig's URL rule
public class AdminController {

    private final UserRepository userRepository;
    private final VendorRepository vendorRepository;

    public AdminController(UserRepository userRepository, VendorRepository vendorRepository) {
        this.userRepository = userRepository;
        this.vendorRepository = vendorRepository;
    }

    @GetMapping("/users")
    public List<User> users() {
        return userRepository.findAll();
    }

    @GetMapping("/vendors")
    public List<Vendor> vendors() {
        return vendorRepository.findAll();
    }

    public record RoleChangeRequest(String role) {}

    @PatchMapping("/users/{id}/role")
    public ResponseEntity<?> changeRole(@PathVariable Long id, @RequestBody RoleChangeRequest req) {
        User user = userRepository.findById(id).orElse(null);
        if (user == null) return ResponseEntity.status(404).body(Map.of("error", "User not found"));
        try {
            user.setRole(Role.valueOf(req.role().toUpperCase()));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(Map.of("error", "Unknown role: " + req.role()));
        }
        userRepository.save(user);
        return ResponseEntity.ok(user);
    }

    // NOTE: password reset is intentionally not implemented here — Vendeze
    // has no password at all (Google/Apple OAuth2 only), so there is
    // nothing to reset. If a "reset password" admin action is still
    // wanted, it would need to mean something else (e.g. force sign-out /
    // revoke sessions) — flagging rather than guessing at the real intent.
}
