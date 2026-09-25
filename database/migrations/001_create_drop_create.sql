-- -- Migration: 001_create_drop_create.sql


-- -- ============================================================
-- -- 1. DATABASE
-- -- ============================================================

-- DROP DATABASE IF EXISTS japanese_learning;

-- CREATE DATABASE japanese_learning
--     CHARACTER SET utf8mb4
--     COLLATE utf8mb4_0900_ai_ci;

-- USE japanese_learning;

-- SET NAMES utf8mb4;
-- SET FOREIGN_KEY_CHECKS = 0;

-- -- ============================================================
-- -- 2. DROP TABLES
-- -- ============================================================

-- DROP TABLE IF EXISTS ai_messages;
-- DROP TABLE IF EXISTS ai_conversations;
-- DROP TABLE IF EXISTS ai_search_history;

-- DROP TABLE IF EXISTS game_scores;
-- DROP TABLE IF EXISTS games;

-- DROP TABLE IF EXISTS quiz_answers;
-- DROP TABLE IF EXISTS quiz_attempts;
-- DROP TABLE IF EXISTS quiz_choices;
-- DROP TABLE IF EXISTS quiz_questions;
-- DROP TABLE IF EXISTS quizzes;

-- DROP TABLE IF EXISTS flashcard_reviews;
-- DROP TABLE IF EXISTS flashcards;
-- DROP TABLE IF EXISTS flashcard_decks;

-- DROP TABLE IF EXISTS user_grammar_progress;
-- DROP TABLE IF EXISTS user_vocab_progress;
-- DROP TABLE IF EXISTS user_kanji_progress;
-- DROP TABLE IF EXISTS user_lesson_progress;
-- DROP TABLE IF EXISTS user_progress;
-- DROP TABLE IF EXISTS user_settings;
-- DROP TABLE IF EXISTS users;

-- DROP TABLE IF EXISTS lesson_grammar;
-- DROP TABLE IF EXISTS grammar_related;
-- DROP TABLE IF EXISTS grammar_examples;
-- DROP TABLE IF EXISTS grammar_patterns;

-- DROP TABLE IF EXISTS lesson_vocab;
-- DROP TABLE IF EXISTS lesson_kanji;
-- DROP TABLE IF EXISTS lessons;

-- DROP TABLE IF EXISTS kanji_vocab;
-- DROP TABLE IF EXISTS vocabulary_examples;
-- DROP TABLE IF EXISTS vocabulary_meanings;
-- DROP TABLE IF EXISTS vocabulary_readings;
-- DROP TABLE IF EXISTS vocabulary;

-- DROP TABLE IF EXISTS kanji_strokes;
-- DROP TABLE IF EXISTS kanji_components;
-- DROP TABLE IF EXISTS kanji_meanings;
-- DROP TABLE IF EXISTS kanji_readings;
-- DROP TABLE IF EXISTS kanji;

-- DROP TABLE IF EXISTS levels;
