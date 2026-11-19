package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "cart_holds")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class CartHold {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "customer_id", nullable = false)
    private Long customerId;

    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Column(name = "event_id")
    private Long eventId;

    @Column(name = "package_id")
    private Long packageId;

    @Column(name = "held_at")
    private Instant heldAt;

    @Column(name = "expires_at", nullable = false)
    private Instant expiresAt;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private HoldStatus status = HoldStatus.HELD;

    @PrePersist
    void onCreate() {
        if (heldAt == null) heldAt = Instant.now();
        if (expiresAt == null) expiresAt = Instant.now().plusSeconds(24 * 3600);
    }

    public enum HoldStatus { HELD, CONFIRMED, RELEASED, EXPIRED }
}
