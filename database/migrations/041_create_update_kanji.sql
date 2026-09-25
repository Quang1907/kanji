-- Migration: 041_create_update_kanji.sql
-- Add missing columns to kanji

ALTER TABLE kanji
    ADD COLUMN onyomi VARCHAR(255) NULL AFTER meaning,
    ADD COLUMN kunyomi VARCHAR(255) NULL AFTER onyomi,
    ADD INDEX idx_kanji_lesson_id (lesson_id),

    ADD CONSTRAINT fk_kanji_lesson
            FOREIGN KEY (lesson_id)
            REFERENCES lessons(id)
            ON DELETE SET NULL
            ON UPDATE CASCADE