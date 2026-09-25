-- Migration: 011_create_vocabulary_examples.sql


-- ============================================================
-- 12. VOCABULARY EXAMPLES
-- ============================================================

CREATE TABLE vocabulary_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    vocabulary_id INT UNSIGNED NOT NULL,

    sentence TEXT NOT NULL,
    sentence_hiragana TEXT,
    sentence_romaji TEXT,

    translation TEXT,

    explanation TEXT,

    audio_url VARCHAR(500),

    difficulty TINYINT UNSIGNED NOT NULL DEFAULT 1,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_vocabulary_examples_vocab (vocabulary_id),
    INDEX idx_vocabulary_examples_difficulty (difficulty),

    CONSTRAINT fk_vocabulary_examples_vocab
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;