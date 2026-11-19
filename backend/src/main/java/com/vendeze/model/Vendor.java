package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;
import java.math.BigDecimal;
import java.time.Instant;

@Entity
@Table(name = "vendors")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Vendor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "owner_user_id")
    private Long ownerUserId;

    @Column(nullable = false, length = 150)
    private String name;

    @Column(name = "category_id", nullable = false, length = 20)
    private String categoryId;

    @Column(length = 100)
    private String area;

    @Builder.Default
    private BigDecimal rating = BigDecimal.ZERO;

    @Column(name = "reviews_count")
    @Builder.Default
    private Integer reviewsCount = 0;

    @Column(name = "price_from", nullable = false)
    private BigDecimal priceFrom;

    @Column(name = "price_unit", length = 20)
    private String priceUnit; // null or "head"

    @Column(length = 500)
    private String blurb;

    @Enumerated(EnumType.STRING)
    @Builder.Default
    private VendorStatus status = VendorStatus.ACTIVE;

    @Column(name = "success_rate")
    @Builder.Default
    private BigDecimal successRate = new BigDecimal("96.0");

    @Column(name = "created_at")
    private Instant createdAt;

    // Packages and portfolio items are separate entities, queried via their
    // own repositories (PackageRepository.findByVendorId(), etc.) rather
    // than mapped as a collection here — keeps each vendor fetch cheap,
    // since most endpoints don't need the full package list.

    @PrePersist
    void onCreate() {
        if (createdAt == null) createdAt = Instant.now();
    }

    public enum VendorStatus { ACTIVE, PAUSED, DOWNGRADED }
}
