-- Migration: 010_create_vocabulary_meanings.sql


-- ============================================================
-- 11. VOCABULARY MEANINGS
-- ============================================================

CREATE TABLE vocabulary_meanings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    vocabulary_id INT UNSIGNED NOT NULL,

    meaning TEXT NOT NULL,

    language VARCHAR(10) NOT NULL DEFAULT 'vi',

    part_of_speech VARCHAR(100),

    priority INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_vocabulary_meanings_vocab (vocabulary_id),
    INDEX idx_vocabulary_meanings_language (language),

    CONSTRAINT fk_vocabulary_meanings_vocab
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
