-- Migration: 026_create_user_grammar_progress.sql


-- ============================================================
-- 27. USER GRAMMAR PROGRESS
-- ============================================================

CREATE TABLE user_grammar_progress (
    user_id BIGINT UNSIGNED NOT NULL,
    grammar_id INT UNSIGNED NOT NULL,

    status ENUM(
        'new',
        'learning',
        'review',
        'mastered'
    ) NOT NULL DEFAULT 'new',

    correct_count INT UNSIGNED NOT NULL DEFAULT 0,
    wrong_count INT UNSIGNED NOT NULL DEFAULT 0,

    last_reviewed_at DATETIME,
    next_review_at DATETIME,

    PRIMARY KEY (
        user_id,
        grammar_id
    ),

    INDEX idx_user_grammar_status (
        user_id,
        status
    ),

    INDEX idx_user_grammar_next_review (
        user_id,
        next_review_at
    ),

    CONSTRAINT fk_user_grammar_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_grammar_progress_grammar
        FOREIGN KEY (grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;