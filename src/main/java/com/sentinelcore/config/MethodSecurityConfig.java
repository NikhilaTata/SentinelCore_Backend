package com.sentinelcore.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;

@Configuration
@EnableMethodSecurity // 🌟 Step 5: Enables @PreAuthorize role scanning globally
public class MethodSecurityConfig {
}
