-- Seed: 017_insert_users.sql


-- ============================================================
-- SAMPLE ADMIN USER
-- Password should be replaced by a real bcrypt hash.
-- DO NOT use this password in production.
-- ============================================================

INSERT INTO users
(
    username,
    email,
    password_hash,
    display_name,
    role
)
VALUES
(
    'admin',
    'admin@example.com',
    '$2b$12$REPLACE_WITH_REAL_BCRYPT_HASH',
    'Administrator',
    'admin'
);
