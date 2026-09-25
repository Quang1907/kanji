
-- ============================================================
-- 30. FLASHCARD REVIEWS
-- ============================================================

CREATE TABLE flashcard_reviews (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    flashcard_id BIGINT UNSIGNED NOT NULL,

    rating TINYINT UNSIGNED NOT NULL,

    response_time_ms INT UNSIGNED,

    reviewed_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_flashcard_reviews_user (
        user_id,
        reviewed_at
    ),

    INDEX idx_flashcard_reviews_card (
        flashcard_id,
        reviewed_at
    ),

    CONSTRAINT fk_flashcard_reviews_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_flashcard_reviews_card
        FOREIGN KEY (flashcard_id)
        REFERENCES flashcards(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
