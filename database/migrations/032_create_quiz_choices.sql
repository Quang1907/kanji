-- Migration: 032_create_quiz_choices.sql



-- ============================================================
-- 33. QUIZ CHOICES
-- ============================================================

CREATE TABLE quiz_choices (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    question_id BIGINT UNSIGNED NOT NULL,

    choice_text TEXT NOT NULL,

    is_correct BOOLEAN NOT NULL DEFAULT FALSE,

    sort_order INT NOT NULL DEFAULT 0,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_quiz_choices_question (
        question_id,
        sort_order
    ),

    CONSTRAINT fk_quiz_choices_question
        FOREIGN KEY (question_id)
        REFERENCES quiz_questions(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
