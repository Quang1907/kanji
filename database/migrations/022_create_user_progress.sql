-- Migration: 022_create_user_progress.sql



-- ============================================================
-- 23. USER OVERALL PROGRESS
-- ============================================================

CREATE TABLE user_progress (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,

    total_study_seconds BIGINT UNSIGNED NOT NULL DEFAULT 0,

    total_xp INT UNSIGNED NOT NULL DEFAULT 0,

    current_streak INT UNSIGNED NOT NULL DEFAULT 0,
    longest_streak INT UNSIGNED NOT NULL DEFAULT 0,

    last_study_date DATE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE KEY uk_user_progress_user (user_id),

    CONSTRAINT fk_user_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
