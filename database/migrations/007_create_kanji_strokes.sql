-- Migration: 007_create_kanji_strokes.sql



-- ============================================================
-- 8. KANJI STROKES
-- ============================================================

CREATE TABLE kanji_strokes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    kanji_id INT UNSIGNED NOT NULL,

    stroke_number SMALLINT UNSIGNED NOT NULL,

    stroke_path LONGTEXT,

    stroke_type VARCHAR(50),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE KEY uk_kanji_stroke (
        kanji_id,
        stroke_number
    ),

    INDEX idx_kanji_strokes_kanji (kanji_id),

    CONSTRAINT fk_kanji_strokes_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
