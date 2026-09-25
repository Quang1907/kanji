-- Migration: 006_create_kanji_components.sql


-- ============================================================
-- 7. KANJI COMPONENTS / RADICALS
-- ============================================================

CREATE TABLE kanji_components (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,

    kanji_id INT UNSIGNED NOT NULL,

    component VARCHAR(20) NOT NULL,
    component_name VARCHAR(100),
    meaning VARCHAR(255),

    strokes SMALLINT UNSIGNED,

    position VARCHAR(50),

    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    deleted_at DATETIME NULL,

    INDEX idx_kanji_components_kanji (kanji_id),
    INDEX idx_kanji_components_component (component),

    CONSTRAINT fk_kanji_components_kanji
        FOREIGN KEY (kanji_id)
        REFERENCES kanji(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;