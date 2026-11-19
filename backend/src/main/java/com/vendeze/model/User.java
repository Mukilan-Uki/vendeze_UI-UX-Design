package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "users", uniqueConstraints = {
    @UniqueConstraint(columnNames = "email"),
    @UniqueConstraint(columnNames = {"auth_provider", "provider_id"})
})
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(nullable = false, length = 190)
    private String email;

    @Column(name = "avatar_initials", length = 4)
    private String avatarInitials;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    @Builder.Default
    private Role role = Role.CUSTOMER;

    @Enumerated(EnumType.STRING)
    @Column(name = "auth_provider", nullable = false)
    private AuthProvider authProvider;

    @Column(name = "provider_id", nullable = false)
    private String providerId;

    // only set for EMAIL accounts — null for Google/Apple, which have no password at all
    @Column(name = "password_hash")
    private String passwordHash;

    // only populated when role == VENDOR — links this login to their vendor row
    @Column(name = "vendor_id")
    private Long vendorId;

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
        if (avatarInitials == null && name != null) {
            String[] parts = name.trim().split("\\s+");
            avatarInitials = parts.length > 1
                ? ("" + parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase()
                : name.substring(0, Math.min(2, name.length())).toUpperCase();
        }
    }

    public enum AuthProvider { GOOGLE, APPLE, EMAIL }
}
