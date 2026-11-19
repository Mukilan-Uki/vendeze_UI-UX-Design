package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;
import java.time.Instant;

@Entity
@Table(name = "portfolio_items")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class PortfolioItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "vendor_id", nullable = false)
    private Long vendorId;

    @Column(nullable = false, length = 200)
    private String title;

    @Column(name = "added_at")
    private Instant addedAt;

    @PrePersist
    void onCreate() { if (addedAt == null) addedAt = Instant.now(); }
}
