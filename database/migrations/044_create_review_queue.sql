-- Migration: 044_create_review_queue.sql

CREATE TABLE review_queue (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    kanji_id BIGINT NOT NULL,
    due_at DATETIME NOT NULL,
    priority INT NOT NULL DEFAULT 0,
    state VARCHAR(30) NOT NULL DEFAULT 'scheduled',
    created_at DATETIME NOT NULL,
    updated_at DATETIME NOT NULL,
    UNIQUE KEY uq_review_user_kanji (
        user_id,
        kanji_id
    ),
    INDEX idx_review_due (
        user_id,
        due_at
    )
);