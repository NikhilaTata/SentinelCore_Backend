package com.sentinelcore.controller;

import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.service.AssetService;
import lombok.RequiredArgsConstructor;
import org.springframework.security.access.prepost.PreAuthorize; // 🌟 Added for Step 5.2
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/assets")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AssetController {

    private final AssetService assetService;

    // Save Asset — Only ROLE_ADMIN accounts can hit this route!
    @PostMapping
    @PreAuthorize("hasRole('ADMIN')") // 🌟 Step 5.2: Restricts asset creation to Admin accounts
    public AssetDTO createAsset(@RequestBody AssetDTO assetDTO) {
        return assetService.createAsset(assetDTO);
    }

    // Get All Assets
    @GetMapping
    public List<AssetDTO> getAllAssets() {
        return assetService.getAllAssets();
    }

    // Get Asset By ID
    @GetMapping("/{id}")
    public AssetDTO getAssetById(@PathVariable Long id) {
        return assetService.getAssetById(id);
    }

    // Delete Asset
    @DeleteMapping("/{id}")
    public void deleteAsset(@PathVariable Long id) {
        assetService.deleteAsset(id);
    }
}
