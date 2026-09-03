-- Seed the mandatory role profiles required by Step 1 & 2
INSERT INTO roles (name) VALUES ('ROLE_ADMIN'), ('ROLE_OPERATOR'), ('ROLE_VIEWER');

-- Create a default admin account (The password is set to 'admin123' using a pre-computed BCrypt hash)
INSERT INTO users (username, password, email, enabled)
VALUES ('admin', '$2a$10$R7MhK8r6eHwGZ5E9v7QZeuO7U77z6mH2YwApeF9/mYgK7HhKCe6G2', 'admin@sentinelcore.local', true);

-- Link User ID 1 (admin) cleanly to Role ID 1 (ROLE_ADMIN) inside your join table mapping
INSERT INTO user_roles (user_id, role_id) VALUES (1, 1);
