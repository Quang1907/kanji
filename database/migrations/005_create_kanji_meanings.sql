-- Migration: 005_create_kanji_meanings.sql


-- ============================================================
-- 6. KANJI MEANINGS
-- ============================================================

CREATE TABLE kanji_meanings (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    kanji_id INT UNSIGNED NOT NULL,

    meaning VARCHAR(255) NOT NULL,

    language VARCHAR(10) NOT NULL DEFAULT 'vi',

    priority INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_kanji_meanings_kanji (kanji_id),
    INDEX idx_kanji_meanings_language (language),

    CONSTRAINT fk_kanji_meanings_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;