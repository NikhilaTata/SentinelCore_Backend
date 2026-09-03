package com.sentinelcore.service;

import com.sentinelcore.Asset;
import com.sentinelcore.Incident;
import com.sentinelcore.repository.AssetRepository;
import com.sentinelcore.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class HealthMonitorService {

    private final AssetRepository assetRepository;
    private final AlertService alertService;
    private final IncidentRepository incidentRepository; // 🌟 Connects your new incidents table

    private static final double CPU_CRITICAL_THRESHOLD = 90.0;
    private static final double MEMORY_WARNING_THRESHOLD = 80.0;

    @Scheduled(fixedRate = 60000)
    public void checkAssetHealth() {

        alertService.clearActiveAlerts();

        List<Asset> assets = assetRepository.findAll();

        for (Asset asset : assets) {

            if ("OFFLINE".equalsIgnoreCase(asset.getStatus())) {
                continue;
            }

            if (asset.getCpuUsage() != null &&
                    asset.getCpuUsage() >= CPU_CRITICAL_THRESHOLD) {

                asset.setStatus("CRITICAL");

                alertService.createAlert(
                        asset.getId(),
                        "CRITICAL",
                        "CPU usage critical: " + asset.getCpuUsage() + "%"
                );

                // 🌟 AUTOMATED INCIDENT RESPONSE: Creates an open ticket if one doesn't exist yet!
                if (incidentRepository.findByAssetIdAndStatus(asset.getId(), "OPEN").isEmpty()) {
                    Incident incident = Incident.builder()
                            .assetId(asset.getId())
                            .title("Critical Resource Threshold Overload Exception")
                            .severity("HIGH")
                            .status("OPEN")
                            .description("Asset '" + asset.getAssetName() + "' breached safety metrics with severe CPU saturation: " + asset.getCpuUsage() + "%.")
                            .assignedTo("Security Operations Team Node A")
                            .createdDate(LocalDateTime.now().toString())
                            .build();
                    incidentRepository.save(incident);
                }

            } else if (asset.getMemoryUsage() != null &&
                    asset.getMemoryUsage() >= MEMORY_WARNING_THRESHOLD) {

                asset.setStatus("WARNING");

                alertService.createAlert(
                        asset.getId(),
                        "WARNING",
                        "Memory usage high: " + asset.getMemoryUsage() + "%"
                );

            } else {
                asset.setStatus("ONLINE");
            }

            assetRepository.save(asset);
        }
    }
}
