package com.vendeze.model;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "categories")
@Getter @Setter @NoArgsConstructor @AllArgsConstructor @Builder
public class Category {
    @Id
    @Column(length = 20)
    private String id;          // "photo", "catering", ...

    @Column(nullable = false, length = 80)
    private String name;

    @Column(length = 255)
    private String note;

    @Column(length = 40)
    private String icon;
}
