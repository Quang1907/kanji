-- Migration: 036_create_game_scores.sql


-- ============================================================
-- 37. GAME SCORES
-- ============================================================

CREATE TABLE game_scores (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    user_id BIGINT UNSIGNED NOT NULL,
    game_id INT UNSIGNED NOT NULL,

    score INT UNSIGNED NOT NULL DEFAULT 0,

    level INT UNSIGNED NOT NULL DEFAULT 1,

    duration_seconds INT UNSIGNED,

    played_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,

    INDEX idx_game_scores_leaderboard (
        game_id,
        score DESC
    ),

    INDEX idx_game_scores_user (
        user_id,
        played_at
    ),

    CONSTRAINT fk_game_scores_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_game_scores_game
        FOREIGN KEY (game_id)
        REFERENCES games(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;
