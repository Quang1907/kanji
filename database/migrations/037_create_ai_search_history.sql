-- Migration: 037_create_ai_search_history.sql



-- ============================================================
-- 38. AI SEARCH HISTORY
-- ============================================================

CREATE TABLE ai_search_history (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED,

    query_text TEXT NOT NULL,

    search_type ENUM(
        'kanji',
        'vocabulary',
        'grammar',
        'general'
    ) NOT NULL DEFAULT 'general',

    result JSON,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_ai_search_user (
        user_id,
        created_at
    ),

    INDEX idx_ai_search_type (
        search_type,
        created_at
    ),

    CONSTRAINT fk_ai_search_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
