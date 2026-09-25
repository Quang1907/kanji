-- Migration: 040_create_media_files.sql

CREATE TABLE media_files (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    file_name VARCHAR(255) NOT NULL,
    original_name VARCHAR(255) NULL,

    mime_type VARCHAR(100) NOT NULL,

    file_size BIGINT UNSIGNED NOT NULL,

    file_url TEXT NOT NULL,

    media_type ENUM(
        'audio',
        'image'
    ) NOT NULL,

    created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    deleted_at DATETIME NULL
);