package com.sentinelcore.controller;

import com.sentinelcore.Incident;
import com.sentinelcore.repository.IncidentRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/incidents")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class IncidentController {

    private final IncidentRepository incidentRepository;

    @GetMapping
    public List<Incident> getAllIncidents() {
        return incidentRepository.findAll();
    }

    @PutMapping("/{id}/resolve")
    public Incident resolveIncident(@PathVariable Long id) {
        Incident incident = incidentRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Incident log trace record missing"));
        incident.setStatus("RESOLVED");
        return incidentRepository.save(incident);
    }
}
