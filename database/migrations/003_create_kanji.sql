-- Migration: 003_create_kanji.sql


-- ============================================================
-- 4. KANJI
-- ============================================================

CREATE TABLE kanji (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    kanji_character VARCHAR(10) NOT NULL,
    han_viet VARCHAR(100),
    meaning TEXT,
    strokes SMALLINT UNSIGNED NOT NULL DEFAULT 0,
    radical VARCHAR(20),
    frequency INT UNSIGNED,
    grade TINYINT UNSIGNED,
    jlpt_level_id INT UNSIGNED,
    lesson_id INT UNSIGNED,
    mnemonic TEXT,
    stroke_paths LONGTEXT,
    audio_url VARCHAR(500),
    image_url VARCHAR(500),
    notes TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE KEY uk_kanji_character (kanji_character),

    INDEX idx_kanji_jlpt (jlpt_level_id),
    INDEX idx_kanji_radical (radical),
    INDEX idx_kanji_strokes (strokes),
    INDEX idx_kanji_frequency (frequency),

    CONSTRAINT fk_kanji_level
        FOREIGN KEY (jlpt_level_id)
        REFERENCES levels(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE

) ENGINE=InnoDB;
