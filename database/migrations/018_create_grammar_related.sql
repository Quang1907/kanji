-- Migration: 018_create_grammar_related.sql


-- ============================================================
-- 19. RELATED GRAMMAR
-- ============================================================

CREATE TABLE grammar_related (
    grammar_id INT UNSIGNED NOT NULL,

    related_grammar_id INT UNSIGNED NOT NULL,

    relation_type ENUM(
        'similar',
        'opposite',
        'prerequisite',
        'advanced'
    ) NOT NULL,

    PRIMARY KEY (
        grammar_id,
        related_grammar_id
    ),

    INDEX idx_grammar_related_related (
        related_grammar_id
    ),

    CONSTRAINT fk_grammar_related_main
        FOREIGN KEY (grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_grammar_related_target
        FOREIGN KEY (related_grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
