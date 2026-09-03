package com.sentinelcore.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder; // 🌟 Added for Step 2.3
import org.springframework.security.crypto.password.PasswordEncoder;       // 🌟 Added for Step 2.3
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    // Assuming you have your custom JwtFilter injected or declared here
    // private final JwtFilter jwtFilter;
    // public SecurityConfig(JwtFilter jwtFilter) { this.jwtFilter = jwtFilter; }

    // 🌟 Step 2.3: Expose the PasswordEncoder Bean for BCrypt hashing
    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                .sessionManagement(session ->
                        session.sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                )
                .authorizeHttpRequests(auth -> auth
                        // Allow CORS preflight requests
                        .requestMatchers(HttpMethod.OPTIONS, "/**").permitAll()

                        // Login endpoints do not require JWT
                        .requestMatchers("/auth/**").permitAll()

                        // Assets API configurations
                        .requestMatchers("/assets").permitAll()
                        .requestMatchers("/assets/**").permitAll()

                        // Alerts API configurations
                        .requestMatchers("/alerts").permitAll()
                        .requestMatchers("/alerts/**").permitAll()

                        // Incidents API configurations
                        .requestMatchers("/incidents").permitAll()
                        .requestMatchers("/incidents/**").permitAll()

                        // Audit Logs API configurations
                        .requestMatchers("/audit-logs").permitAll()
                        .requestMatchers("/audit-logs/**").permitAll()

                        // Everything else requires JWT validation
                        .anyRequest().authenticated()
                );

        // If you are using your custom jwtFilter, uncomment the line below:
        // http.addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("*"));
        configuration.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
