-- Migration: 025_create_user_vocab_progress.sql




-- ============================================================
-- 26. USER VOCABULARY PROGRESS
-- ============================================================

CREATE TABLE user_vocab_progress (
    user_id BIGINT UNSIGNED NOT NULL,
    vocabulary_id INT UNSIGNED NOT NULL,

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

    ease_factor DECIMAL(4,2) NOT NULL DEFAULT 2.50,

    interval_days INT UNSIGNED NOT NULL DEFAULT 0,

    PRIMARY KEY (
        user_id,
        vocabulary_id
    ),

    INDEX idx_user_vocab_status (
        user_id,
        status
    ),

    INDEX idx_user_vocab_next_review (
        user_id,
        next_review_at
    ),

    CONSTRAINT fk_user_vocab_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_vocab_progress_vocab
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
