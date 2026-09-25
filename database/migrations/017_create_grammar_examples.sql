-- Migration: 017_create_grammar_example.sql



-- ============================================================
-- 18. GRAMMAR EXAMPLES
-- ============================================================

CREATE TABLE grammar_examples (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    grammar_id INT UNSIGNED NOT NULL,

    sentence TEXT NOT NULL,
    sentence_hiragana TEXT,

    translation TEXT,

    explanation TEXT,

    audio_url VARCHAR(500),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_grammar_examples_grammar (grammar_id),

    CONSTRAINT fk_grammar_examples_grammar
        FOREIGN KEY (grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;