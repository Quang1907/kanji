-- Migration: 014_create_lesson_kanji.sql




-- ============================================================
-- 15. LESSON <-> KANJI
-- ============================================================

CREATE TABLE lesson_kanji (
    lesson_id INT UNSIGNED NOT NULL,
    kanji_id INT UNSIGNED NOT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    PRIMARY KEY (
        lesson_id,
        kanji_id
    ),

    INDEX idx_lesson_kanji_kanji (kanji_id),
    INDEX idx_lesson_kanji_order (lesson_id, sort_order),

    CONSTRAINT fk_lesson_kanji_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_lesson_kanji_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
