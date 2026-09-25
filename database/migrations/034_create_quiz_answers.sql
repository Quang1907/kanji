-- Migration: 034_create_quiz_answers.sql


-- ============================================================
-- 35. QUIZ ANSWERS
-- ============================================================

CREATE TABLE quiz_answers (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    attempt_id BIGINT UNSIGNED NOT NULL,
    question_id BIGINT UNSIGNED NOT NULL,

    selected_choice_id BIGINT UNSIGNED,

    answer_text TEXT,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    points_earned INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_quiz_answers_attempt (attempt_id),
    INDEX idx_quiz_answers_question (question_id),

    CONSTRAINT fk_quiz_answers_attempt
        FOREIGN KEY (attempt_id)
        REFERENCES quiz_attempts(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_quiz_answers_question
        FOREIGN KEY (question_id)
        REFERENCES quiz_questions(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_quiz_answers_choice
        FOREIGN KEY (selected_choice_id)
        REFERENCES quiz_choices(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
