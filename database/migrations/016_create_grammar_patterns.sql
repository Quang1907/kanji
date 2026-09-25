-- Migration: 016_create_grammar_patterns.sql

-- ============================================================
-- 17. GRAMMAR
-- ============================================================

CREATE TABLE grammar_patterns (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    pattern VARCHAR(500) NOT NULL,
    pattern_short VARCHAR(500),

    meaning TEXT,

    explanation LONGTEXT,

    usage_notes LONGTEXT,

    formation LONGTEXT,

    level_id INT UNSIGNED,

    difficulty TINYINT UNSIGNED NOT NULL DEFAULT 1,

    mnemonic TEXT,

    notes TEXT,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_grammar_level (level_id),
    INDEX idx_grammar_difficulty (difficulty),
    INDEX idx_grammar_pattern (pattern(100)),

    CONSTRAINT fk_grammar_level
        FOREIGN KEY (level_id)
        REFERENCES levels(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;

