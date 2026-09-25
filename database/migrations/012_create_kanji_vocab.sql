-- Migration: 012_create_kanji_vocab.sql


-- ============================================================
-- 13. KANJI <-> VOCABULARY
-- ============================================================

CREATE TABLE kanji_vocab (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    kanji_id INT UNSIGNED NOT NULL,
    vocabulary_id INT UNSIGNED NOT NULL,

    importance TINYINT UNSIGNED NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE KEY uk_kanji_vocab (
        kanji_id,
        vocabulary_id
    ),

    INDEX idx_kanji_vocab_kanji (kanji_id),
    INDEX idx_kanji_vocab_vocab (vocabulary_id),

    CONSTRAINT fk_kanji_vocab_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_kanji_vocab_vocabulary
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;