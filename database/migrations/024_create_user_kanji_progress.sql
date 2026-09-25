-- Migration: 024_create_user_kanji_progress.sql


-- ============================================================
-- 25. USER KANJI PROGRESS
-- ============================================================

CREATE TABLE user_kanji_progress (
    user_id BIGINT UNSIGNED NOT NULL,
    kanji_id INT UNSIGNED NOT NULL,

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
        kanji_id
    ),

    INDEX idx_user_kanji_status (
        user_id,
        status
    ),

    INDEX idx_user_kanji_next_review (
        user_id,
        next_review_at
    ),

    CONSTRAINT fk_user_kanji_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_kanji_progress_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;