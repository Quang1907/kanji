-- Migration: 021_create_user_settings.sql


-- ============================================================
-- 22. USER SETTINGS
-- ============================================================

CREATE TABLE user_settings (
    user_id BIGINT UNSIGNED PRIMARY KEY,

    current_level_id INT UNSIGNED,

    daily_goal_minutes INT UNSIGNED NOT NULL DEFAULT 30,
    daily_goal_words INT UNSIGNED NOT NULL DEFAULT 20,

    sound_enabled BOOLEAN NOT NULL DEFAULT TRUE,
    autoplay_audio BOOLEAN NOT NULL DEFAULT TRUE,

    show_furigana BOOLEAN NOT NULL DEFAULT TRUE,

    dark_mode BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_user_settings_level (current_level_id),

    CONSTRAINT fk_user_settings_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_settings_level
        FOREIGN KEY (current_level_id)
        REFERENCES levels(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
