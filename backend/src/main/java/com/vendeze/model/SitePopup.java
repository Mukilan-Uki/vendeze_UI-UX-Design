package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "site_popup")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class SitePopup {
    @Id
    private Integer id; // always 1 — single-row config table

    @Builder.Default
    private Boolean enabled = true;

    private String title;

    @Column(length = 500)
    private String body;

    private String cta;
}
