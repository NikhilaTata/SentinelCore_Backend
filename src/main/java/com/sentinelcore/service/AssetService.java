package com.sentinelcore.service;

import com.sentinelcore.Asset;
import com.sentinelcore.dto.AssetDTO;
import com.sentinelcore.repository.AssetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class AssetService {

    @Autowired
    private AssetRepository assetRepository;

    // Save Asset
    public Asset saveAsset(Asset asset) {
        return assetRepository.save(asset);
    }

    public AssetDTO createAsset(AssetDTO assetDTO)
    {
        Asset asset = Asset.builder()
                .assetName(assetDTO.getAssetName())
                .assetType(assetDTO.getAssetType())
                .ipAddress(assetDTO.getIpAddress())
                .location(assetDTO.getLocation())
                .status(assetDTO.getStatus())
                .cpuUsage(assetDTO.getCpuUsage())
                .memoryUsage(assetDTO.getMemoryUsage())
                .diskUsage(assetDTO.getDiskUsage())
                .createdDate(assetDTO.getCreatedDate())
                .build();

        Asset savedAsset = assetRepository.save(asset);

        return AssetDTO.builder()
                .id(savedAsset.getId())
                .assetName(savedAsset.getAssetName())
                .assetType(savedAsset.getAssetType())
                .ipAddress(savedAsset.getIpAddress())
                .location(savedAsset.getLocation())
                .status(savedAsset.getStatus())
                .cpuUsage(savedAsset.getCpuUsage())
                .memoryUsage(savedAsset.getMemoryUsage())
                .diskUsage(savedAsset.getDiskUsage())
                .createdDate(savedAsset.getCreatedDate())
                .build();
    }

    // Get All Assets
    public List<AssetDTO> getAllAssets() {

        List<Asset> assets = assetRepository.findAll();
        List<AssetDTO> assetDTOList = new ArrayList<>();

        for (Asset asset : assets) {

            AssetDTO dto = new AssetDTO();

            dto.setId(asset.getId());
            dto.setAssetName(asset.getAssetName());
            dto.setAssetType(asset.getAssetType());
            dto.setIpAddress(asset.getIpAddress());
            dto.setLocation(asset.getLocation());
            dto.setStatus(asset.getStatus());
            dto.setCpuUsage(asset.getCpuUsage());
            dto.setMemoryUsage(asset.getMemoryUsage());
            dto.setDiskUsage(asset.getDiskUsage());
            dto.setCreatedDate(asset.getCreatedDate());

            assetDTOList.add(dto);
        }

        return assetDTOList;
    }

    // Get Asset By ID
    public AssetDTO getAssetById(int id) {

        Asset asset = assetRepository.findById(id).orElse(null);

        if (asset == null) {
            return null;
        }

        AssetDTO dto = new AssetDTO();

        dto.setId(asset.getId());
        dto.setAssetName(asset.getAssetName());
        dto.setAssetType(asset.getAssetType());
        dto.setIpAddress(asset.getIpAddress());
        dto.setLocation(asset.getLocation());
        dto.setStatus(asset.getStatus());
        dto.setCpuUsage(asset.getCpuUsage());
        dto.setMemoryUsage(asset.getMemoryUsage());
        dto.setDiskUsage(asset.getDiskUsage());
        dto.setCreatedDate(asset.getCreatedDate());

        return dto;
    }
}