-- Migration: 045_create_sync_events.sql

CREATE TABLE sync_events (
    event_id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT NOT NULL,
    event_type VARCHAR(50) NOT NULL,
    created_at DATETIME NOT NULL,
    processed_at DATETIME NOT NULL,
    INDEX idx_sync_user (
        user_id,
        processed_at
    )
);