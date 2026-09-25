-- Migration: 033_create_quiz_attempts.sql


-- ============================================================
-- 34. QUIZ ATTEMPTS
-- ============================================================

CREATE TABLE quiz_attempts (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    quiz_id INT UNSIGNED NOT NULL,

    score INT NOT NULL DEFAULT 0,

    total_points INT NOT NULL DEFAULT 0,

    correct_count INT UNSIGNED NOT NULL DEFAULT 0,
    wrong_count INT UNSIGNED NOT NULL DEFAULT 0,

    started_at DATETIME,
    completed_at DATETIME,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_quiz_attempts_user (
        user_id,
        created_at
    ),

    INDEX idx_quiz_attempts_quiz (
        quiz_id,
        created_at
    ),

    CONSTRAINT fk_quiz_attempts_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_quiz_attempts_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
