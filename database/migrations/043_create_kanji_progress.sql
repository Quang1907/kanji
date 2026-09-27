-- Migration: 043_create_kanji_progress.sql

CREATE TABLE kanji_progress (
    id INT UNSIGNED AUTO_INCREMENT,
    user_id BIGINT NOT NULL,
    kanji_id BIGINT NOT NULL,
    status VARCHAR(30) NOT NULL,
    repetitions INT NOT NULL DEFAULT 0,
    lapses INT NOT NULL DEFAULT 0,
    difficulty DECIMAL(10,4) NOT NULL DEFAULT 5,
    stability DECIMAL(10,4) NOT NULL DEFAULT 0,
    interval_days DECIMAL(10,4) NOT NULL DEFAULT 0,
    due_at DATETIME NOT NULL,
    last_reviewed_at DATETIME NULL,
    version INT NOT NULL DEFAULT 1,
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,

    PRIMARY KEY (id),

    UNIQUE KEY uq_user_kanji (
        user_id,
        kanji_id
    ),
    INDEX idx_progress_due (
        user_id,
        due_at
    ),
    INDEX idx_progress_updated (
        user_id,
        updated_at
    )
);
