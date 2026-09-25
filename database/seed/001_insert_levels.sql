-- Seed: 001_insert_levels.sql


-- ============================================================
-- JLPT LEVELS
-- ============================================================

INSERT INTO levels
(code, name, description, sort_order)
VALUES
('N5', 'JLPT N5', 'Beginner Japanese', 1),
('N4', 'JLPT N4', 'Elementary Japanese', 2),
('N3', 'JLPT N3', 'Intermediate Japanese', 3),
('N2', 'JLPT N2', 'Upper Intermediate Japanese', 4),
('N1', 'JLPT N1', 'Advanced Japanese', 5);

-- ============================================================
-- N5 LEVEL ID
-- ============================================================

SET @N5 = (
    SELECT id
    FROM levels
    WHERE code = 'N5'
    LIMIT 1
);