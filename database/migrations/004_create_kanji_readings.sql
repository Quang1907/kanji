-- Migration: 004_create_kanji_readings.sql


-- ============================================================
-- 5. KANJI READINGS
-- ============================================================

CREATE TABLE kanji_readings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    kanji_id INT UNSIGNED NOT NULL,

    reading VARCHAR(100) NOT NULL,

    reading_type ENUM(
        'on',
        'kun',
        'nanori'
    ) NOT NULL,

    romaji VARCHAR(100),

    priority INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_kanji_readings_kanji (kanji_id),
    INDEX idx_kanji_readings_reading (reading),

    CONSTRAINT fk_kanji_readings_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
