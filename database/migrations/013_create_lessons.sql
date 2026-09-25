-- Migration: 013_create_lessons.sql



-- ============================================================
-- 14. LESSONS
-- ============================================================

CREATE TABLE lessons (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    level_id INT UNSIGNED NOT NULL,
    lesson_number INT UNSIGNED NOT NULL,
    title VARCHAR(255) NOT NULL,
    title_hiragana VARCHAR(255),
    description TEXT,
    objectives TEXT,
    content LONGTEXT,
    thumbnail_url VARCHAR(500),
    estimated_minutes INT UNSIGNED,
    is_published BOOLEAN NOT NULL DEFAULT FALSE,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,
    UNIQUE KEY uk_lesson_number (
        level_id,
        lesson_number
    ),

    INDEX idx_lessons_level (level_id),
    INDEX idx_lessons_published (is_published),

    CONSTRAINT fk_lessons_level
        FOREIGN KEY (level_id)
        REFERENCES levels(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
