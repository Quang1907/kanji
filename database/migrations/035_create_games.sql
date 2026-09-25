-- Migration: 035_create_games.sql


-- ============================================================
-- 36. GAMES
-- ============================================================

CREATE TABLE games (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    code VARCHAR(50) NOT NULL,

    name VARCHAR(255) NOT NULL,

    description TEXT,

    game_type ENUM(
        'vocabulary_shooter',
        'grammar_running',
        'word_sorting',
        'kanji_game',
        'other'
    ) NOT NULL,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    UNIQUE KEY uk_games_code (code),
    INDEX idx_games_type (game_type)
) ENGINE=InnoDB;