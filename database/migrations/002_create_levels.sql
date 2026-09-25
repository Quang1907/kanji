-- Migration: 002_create_levels.sql


-- ============================================================
-- 3. JLPT LEVELS
-- ============================================================

CREATE TABLE levels (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    code VARCHAR(10) NOT NULL,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    sort_order INT NOT NULL DEFAULT 0,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE KEY uk_levels_code (code),
    INDEX idx_levels_sort_order (sort_order)
) ENGINE=InnoDB;