-- Migration: 008_create_vocabulary.sql


-- ============================================================
-- 9. VOCABULARY
-- ============================================================

CREATE TABLE vocabulary (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    word VARCHAR(255) NOT NULL,

    word_type VARCHAR(100),

    han_viet VARCHAR(255),

    meaning TEXT,

    jlpt_level_id INT UNSIGNED,

    frequency INT UNSIGNED,

    pitch_accent VARCHAR(100),

    audio_url VARCHAR(500),
    image_url VARCHAR(500),

    notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_vocabulary_word (word),
    INDEX idx_vocabulary_level (jlpt_level_id),
    INDEX idx_vocabulary_type (word_type),
    INDEX idx_vocabulary_frequency (frequency),

    CONSTRAINT fk_vocabulary_level
        FOREIGN KEY (jlpt_level_id)
        REFERENCES levels(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
