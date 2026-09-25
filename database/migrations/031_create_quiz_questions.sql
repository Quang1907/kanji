-- Migration: 031_create_quiz_questions.sql


-- ============================================================
-- 32. QUIZ QUESTIONS
-- ============================================================

CREATE TABLE quiz_questions (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    quiz_id INT UNSIGNED NOT NULL,

    question_type ENUM(
        'multiple_choice',
        'true_false',
        'fill_blank',
        'listening',
        'writing'
    ) NOT NULL,

    question TEXT NOT NULL,
    question_hiragana TEXT,

    explanation TEXT,

    points INT UNSIGNED NOT NULL DEFAULT 1,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_quiz_questions_quiz (
        quiz_id,
        sort_order
    ),

    CONSTRAINT fk_quiz_questions_quiz
        FOREIGN KEY (quiz_id)
        REFERENCES quizzes(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;