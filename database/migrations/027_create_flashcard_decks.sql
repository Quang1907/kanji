-- Migration: 027_create_flashcard_decks.sql



-- ============================================================
-- 28. FLASHCARD DECKS
-- ============================================================

CREATE TABLE flashcard_decks (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    is_public BOOLEAN NOT NULL DEFAULT FALSE,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
        ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_flashcard_decks_user (user_id),
    INDEX idx_flashcard_decks_public (is_public),

    CONSTRAINT fk_flashcard_decks_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
