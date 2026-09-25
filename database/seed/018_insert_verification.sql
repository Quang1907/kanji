-- Seed: 018_insert_verification.sql

-- ============================================================
-- FINISH
-- ============================================================

SET FOREIGN_KEY_CHECKS = 1;

-- ============================================================
-- VERIFICATION
-- ============================================================

SELECT
    'levels' AS table_name,
    COUNT(*) AS records
FROM levels

UNION ALL

SELECT
    'lessons',
    COUNT(*)
FROM lessons

UNION ALL

SELECT
    'kanji',
    COUNT(*)
FROM kanji

UNION ALL

SELECT
    'vocabulary',
    COUNT(*)
FROM vocabulary

UNION ALL

SELECT
    'grammar_patterns',
    COUNT(*)
FROM grammar_patterns

UNION ALL

SELECT
    'games',
    COUNT(*)
FROM games;

-- ============================================================
-- EXPECTED:
--
-- levels             = 5
-- lessons            = 25
-- kanji              = 25
-- vocabulary         = 39
-- grammar_patterns   = 18
-- games              = 4
--
-- ============================================================