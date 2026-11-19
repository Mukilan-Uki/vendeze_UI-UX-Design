package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "ads")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Ad {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Builder.Default
    @Column(length = 20)
    private String label = "AD";

    @Column(nullable = false, length = 255)
    private String body;

    @Builder.Default
    private Boolean active = true;
}
