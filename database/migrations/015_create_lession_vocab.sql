-- Migration: 015_create_lession_vocab.sql


-- ============================================================
-- 16. LESSON <-> VOCABULARY
-- ============================================================

CREATE TABLE lesson_vocab (
    lesson_id INT UNSIGNED NOT NULL,
    vocabulary_id INT UNSIGNED NOT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    PRIMARY KEY (
        lesson_id,
        vocabulary_id
    ),

    INDEX idx_lesson_vocab_vocab (vocabulary_id),
    INDEX idx_lesson_vocab_order (lesson_id, sort_order),

    CONSTRAINT fk_lesson_vocab_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_lesson_vocab_vocabulary
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
