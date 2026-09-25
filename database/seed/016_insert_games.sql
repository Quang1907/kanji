-- Seed: 016_insert_games.sql
-- ============================================================
-- SAMPLE GAMES
-- ============================================================

INSERT INTO games
(
    code,
    name,
    description,
    game_type
)
VALUES
(
    'vocabulary-shooter',
    'Vocabulary Shooter',
    'Shoot the correct Japanese vocabulary.',
    'vocabulary_shooter'
),
(
    'grammar-running',
    'Grammar Running',
    'Choose the correct grammar while running.',
    'grammar_running'
),
(
    'word-sorting',
    'Word Card Sorting',
    'Sort Japanese words into the correct categories.',
    'word_sorting'
),
(
    'kanji-game',
    'Kanji Challenge',
    'Practice Japanese Kanji.',
    'kanji_game'
);
