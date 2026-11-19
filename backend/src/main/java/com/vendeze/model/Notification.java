package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

/**
 * One shared notification table, filtered by audience (+ optionally one
 * specific vendor or customer) — this is the real-database version of the
 * audience-tagged notification feed the front-end prototype simulated
 * in-memory. A booking made by a customer creates a row with
 * audience=VENDOR and vendorId set to the specific vendor who was booked.
 */
@Entity
@Table(name = "notifications")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Notification {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    private Role audience;

    @Column(name = "vendor_id")
    private Long vendorId;   // target one vendor only, if set

    @Column(name = "customer_id")
    private Long customerId; // target one customer only, if set

    @Column(length = 40)
    private String icon;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(nullable = false, length = 500)
    private String body;

    @Column(name = "is_read")
    @Builder.Default
    private Boolean isRead = false;

    @Column(name = "created_at")
    private Instant createdAt;

    @PrePersist
    void onCreate() { if (createdAt == null) createdAt = Instant.now(); }
}
