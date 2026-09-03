package com.sentinelcore.service;

import com.sentinelcore.dto.AlertDTO;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class AlertService {

    private final List<AlertDTO> activeAlerts = new ArrayList<>();

    public void clearActiveAlerts() {
        this.activeAlerts.clear();
    }

    public AlertDTO createAlert(Long assetId, String severity, String message) {

        // 🌟 DUPLICATION CHECK: If this asset already has an active log entry, update it instead of adding a new row!
        for (AlertDTO alert : activeAlerts) {
            if (alert.getAssetId().equals(assetId)) {
                alert.setSeverity(severity);
                alert.setMessage(message);
                alert.setTimestamp(LocalDateTime.now().toString()); // ISO Date String
                return alert;
            }
        }

        // Add a clean single row if it doesn't exist yet
        AlertDTO newAlert = AlertDTO.builder()
                .id((long) (activeAlerts.size() + 1))
                .assetId(assetId)
                .assetName("Asset #" + assetId)
                .severity(severity)
                .message(message)
                .timestamp(LocalDateTime.now().toString()) // 🌟 FIXES "Invalid Date" text on Frontend
                .build();

        activeAlerts.add(newAlert);
        return newAlert;
    }

    public List<AlertDTO> getOpenAlerts() {
        return activeAlerts;
    }

    public AlertDTO resolveAlert(Long id) {
        for (AlertDTO alert : activeAlerts) {
            if (alert.getId().equals(id)) {
                activeAlerts.remove(alert);
                return alert;
            }
        }
        return null;
    }
}
