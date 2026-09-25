-- Seed: 013_insert_lesson_kanji.sql


-- ============================================================
-- LESSON -> KANJI
-- ============================================================

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 1
  AND k.kanji_character IN ('人', '日');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 2
  AND k.kanji_character IN ('大', '小', '中');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 3
  AND k.kanji_character IN ('日', '月');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 4
  AND k.kanji_character IN ('山', '川');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 5
  AND k.kanji_character IN ('時', '間', '今');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 6
  AND k.kanji_character IN ('日', '毎');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 7
  AND k.kanji_character IN ('行', '来', '帰');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 8
  AND k.kanji_character IN ('食', '飲', '見');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 11
  AND k.kanji_character IN ('好', '上', '手');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 13
  AND k.kanji_character IN ('金');

INSERT INTO lesson_kanji
(lesson_id, kanji_id, sort_order)
SELECT
    l.id,
    k.id,
    1
FROM lessons l
JOIN kanji k
WHERE l.level_id = @N5
  AND l.lesson_number = 15
  AND k.kanji_character IN ('学', '校');
