-- Migration: 023_create_user_lesson_progress.sql


-- ============================================================
-- 24. USER LESSON PROGRESS
-- ============================================================

CREATE TABLE user_lesson_progress (
    user_id BIGINT UNSIGNED NOT NULL,
    lesson_id INT UNSIGNED NOT NULL,

    status ENUM(
        'not_started',
        'in_progress',
        'completed'
    ) NOT NULL DEFAULT 'not_started',

    progress_percent TINYINT UNSIGNED NOT NULL DEFAULT 0,

    started_at DATETIME,
    completed_at DATETIME,
    last_accessed_at DATETIME,

    PRIMARY KEY (
        user_id,
        lesson_id
    ),

    INDEX idx_user_lesson_status (
        user_id,
        status
    ),

    INDEX idx_user_lesson_access (
        user_id,
        last_accessed_at
    ),

    CONSTRAINT fk_user_lesson_progress_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_user_lesson_progress_lesson
        FOREIGN KEY (lesson_id)
        REFERENCES lessons(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
