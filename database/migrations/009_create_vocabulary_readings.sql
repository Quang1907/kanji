-- Migration: 009_create_vocabulary_readings.sql


-- ============================================================
-- 10. VOCABULARY READINGS
-- ============================================================

CREATE TABLE vocabulary_readings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    vocabulary_id INT UNSIGNED NOT NULL,

    reading VARCHAR(255) NOT NULL,
    romaji VARCHAR(255),

    priority INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_vocabulary_readings_vocab (vocabulary_id),
    INDEX idx_vocabulary_readings_reading (reading),

    CONSTRAINT fk_vocabulary_readings_vocab
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;