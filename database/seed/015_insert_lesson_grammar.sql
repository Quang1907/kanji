-- Seed: 015_insert_lesson_grammar.sql


-- ============================================================
-- LESSON -> GRAMMAR
-- ============================================================

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 1
AND g.pattern IN (
    'Nです',
    'Nではありません',
    'Nは...'
);

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 6
AND g.pattern IN (
    'NのN'
);

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 7
AND g.pattern IN (
    'Nへ行きます',
    'Nに行きます'
);

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 8
AND g.pattern = 'NをV';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 10
AND g.pattern = 'Vて + います';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 16
AND g.pattern = 'Vてもいいです';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 17
AND g.pattern = 'Vてはいけません';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 18
AND g.pattern = 'Vなくてもいいです';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 19
AND g.pattern = 'Vてほしいです';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 20
AND g.pattern = 'Vることができます';

INSERT INTO lesson_grammar
(lesson_id, grammar_id, sort_order)
SELECT l.id, g.id, 1
FROM lessons l
JOIN grammar_patterns g
WHERE l.lesson_number = 21
AND g.pattern IN (
    'Vるまえに',
    'Vたあとで'
);