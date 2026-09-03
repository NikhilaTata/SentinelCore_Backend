package com.sentinelcore.controller;

import com.sentinelcore.dto.AlertDTO;
import com.sentinelcore.service.AlertService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/alerts") // 🌟 FIXED: Changed from /api/alerts to /alerts to align with React
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AlertController {

    private final AlertService alertService;

    // 🌟 ADDED: This catches the base HTTP GET request made by alertService.js
    @GetMapping
    public List<AlertDTO> getAllAlerts() {
        return alertService.getOpenAlerts();
    }

    @GetMapping("/open")
    public List<AlertDTO> getOpenAlerts() {
        return alertService.getOpenAlerts();
    }

    @PostMapping
    public AlertDTO createAlert(
            @RequestParam Long assetId,
            @RequestParam String severity,
            @RequestParam String message) {

        return alertService.createAlert(assetId, severity, message);
    }

    @PutMapping("/{id}/resolve")
    public AlertDTO resolveAlert(@PathVariable Long id) {
        return alertService.resolveAlert(id);
    }
}
