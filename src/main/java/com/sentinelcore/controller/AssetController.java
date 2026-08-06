package com.sentinelcore.controller;

import com.sentinelcore.Asset;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.service.AssetService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/assets")
public class AssetController {

    @Autowired
    private AssetService assetService;

    // Save Asset
    @PostMapping
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
    public AssetDTO getAssetById(@PathVariable int id) {
        return assetService.getAssetById(id);
    }
}