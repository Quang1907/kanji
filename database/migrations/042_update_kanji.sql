-- Migration: 042_update_kanji.sql

ALTER TABLE kanji
ADD UNIQUE KEY uq_kanji_character (kanji_character);