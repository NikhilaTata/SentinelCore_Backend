package com.sentinelcore;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "incidents")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Incident {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long assetId;
    private String title;
    private String severity;    // e.g., HIGH, MEDIUM, LOW
    private String status;      // e.g., OPEN, INVESTIGATING, RESOLVED

    @Column(length = 500)
    private String description;
    private String assignedTo;
    private String createdDate;
    // 🌟 Fallback Getter rule fixes the empty "Asset" column on your UI grid table
    public Long getAsset() {
        return this.assetId;
    }

    // 🌟 Fallback Getter rule fixes the empty "Created" column on your UI grid table
    public String getCreated() {
        return this.createdDate;
    }

}
