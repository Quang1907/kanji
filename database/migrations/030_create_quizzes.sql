-- Migration: 030_create_quizzes.sql


-- ============================================================
-- 31. QUIZZES
-- ============================================================

CREATE TABLE quizzes (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    title VARCHAR(255) NOT NULL,

    description TEXT,

    level_id INT UNSIGNED,

    quiz_type ENUM(
        'vocabulary',
        'kanji',
        'grammar',
        'reading',
        'mixed'
    ) NOT NULL,

    difficulty TINYINT UNSIGNED NOT NULL DEFAULT 1,

    time_limit_seconds INT UNSIGNED,

    is_published BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_quizzes_level (level_id),
    INDEX idx_quizzes_type (quiz_type),
    INDEX idx_quizzes_published (is_published),

    CONSTRAINT fk_quizzes_level
        FOREIGN KEY (level_id)
        REFERENCES levels(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
