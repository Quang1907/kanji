-- Migration: 028_create_flashcards.sql



-- ============================================================
-- 29. FLASHCARDS
-- ============================================================

CREATE TABLE flashcards (
    id BIGINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    deck_id BIGINT UNSIGNED NOT NULL,

    front TEXT NOT NULL,
    back TEXT NOT NULL,

    example TEXT,

    audio_url VARCHAR(500),
    image_url VARCHAR(500),

    kanji_id INT UNSIGNED,
    vocabulary_id INT UNSIGNED,
    grammar_id INT UNSIGNED,

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_flashcards_deck (deck_id),
    INDEX idx_flashcards_kanji (kanji_id),
    INDEX idx_flashcards_vocab (vocabulary_id),
    INDEX idx_flashcards_grammar (grammar_id),

    CONSTRAINT fk_flashcards_deck
        FOREIGN KEY (deck_id)
        REFERENCES flashcard_decks(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE,

    CONSTRAINT fk_flashcards_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_flashcards_vocab
        FOREIGN KEY (vocabulary_id)
        REFERENCES vocabulary(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE,

    CONSTRAINT fk_flashcards_grammar
        FOREIGN KEY (grammar_id)
        REFERENCES grammar_patterns(id)
        ON DELETE SET NULL
        ON UPDATE CASCADE
) ENGINE=InnoDB;
