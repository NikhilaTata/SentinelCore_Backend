package com.sentinelcore.repository;

import com.sentinelcore.Incident;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IncidentRepository extends JpaRepository<Incident, Long> {
    Optional<Incident> findByAssetIdAndStatus(Long assetId, String status);
}
