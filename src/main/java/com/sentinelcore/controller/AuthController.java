package com.sentinelcore.controller;

import com.sentinelcore.entity.User;
import com.sentinelcore.repository.UserRepository;
import com.sentinelcore.util.JwtUtil;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/auth") // Preserves the exact backend-to-frontend connection route
@RequiredArgsConstructor
public class AuthController {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;

    @PostMapping("/login")
    public Map<String, String> login(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String rawPassword = credentials.get("password");

        // 🌟 REPLACEMENT: Query your database to find the real user record
        User user = userRepository.findByUsername(username)
                .orElseThrow(() -> new RuntimeException("Invalid credentials"));

        // 🌟 REPLACEMENT: Match the raw input password stream against the database BCrypt hash
        if (!passwordEncoder.matches(rawPassword, user.getPassword())) {
            throw new RuntimeException("Invalid credentials");
        }

        // Generate custom short-lived access and long-lived refresh tokens matching Step 4
        String token = jwtUtil.generateToken(username);
        String refreshToken = jwtUtil.generateRefreshToken(username);

        // Return a clean map structure matching your frontend authService.js layout fields
        return Map.of(
                "token", token,
                "refreshToken", refreshToken
        );
    }
    // 🌟 ADDED FOR STEP 4: Token lifecycle refresh point
    @PostMapping("/refresh")
    public Map<String, String> refresh(@RequestBody Map<String, String> body) {
        String refreshToken = body.get("refreshToken");

        if (refreshToken == null || !jwtUtil.isTokenValid(refreshToken)) {
            throw new RuntimeException("Invalid or expired refresh token");
        }

        String username = jwtUtil.extractUsername(refreshToken);
        String newAccessToken = jwtUtil.generateToken(username);

        return Map.of("token", newAccessToken);
    }

}
