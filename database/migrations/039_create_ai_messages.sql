-- Migration: 039_create_ai_messages.sql


-- ============================================================
-- 40. AI MESSAGES
-- ============================================================

CREATE TABLE ai_messages (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    conversation_id BIGINT UNSIGNED NOT NULL,

    role ENUM(
        'user',
        'assistant',
        'system'
    ) NOT NULL,

    content LONGTEXT NOT NULL,

    metadata JSON,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_ai_messages_conversation (
        conversation_id,
        created_at
    ),

    CONSTRAINT fk_ai_messages_conversation
        FOREIGN KEY (conversation_id)
        REFERENCES ai_conversations(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;