-- Migration: 019_create_lesson_grammar.sql


-- ============================================================
-- 20. LESSON <-> GRAMMAR
-- ============================================================

CREATE TABLE lesson_grammar (
    lesson_id INT UNSIGNED NOT NULL,

    grammar_id INT UNSIGNED NOT NULL,

    sort_order INT NOT NULL DEFAULT 0,

    PRIMARY KEY (
        lesson_id,
        grammar_id
    ),

    INDEX idx_lesson_grammar_grammar (grammar_id),
    INDEX idx_lesson_grammar_order (lesson_id, sort_order),

    CONSTRAINT fk_lesson_grammar_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_lesson_grammar_grammar
        FOREIGN KEY (grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
