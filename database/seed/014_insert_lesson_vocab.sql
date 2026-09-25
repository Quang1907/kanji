-- Seed: 014_insert_lesson_vocab.sql


-- ============================================================
-- LESSON -> VOCABULARY
-- ============================================================

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 1
AND v.word IN ('日本人', '学生', '先生', '人');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 3
AND v.word IN ('日本', '学校', '大学');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 5
AND v.word IN ('時間', '今日', '明日', '昨日');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 6
AND v.word IN ('毎日', '学校', '日本語');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 7
AND v.word IN ('行きます', '来ます', '帰ります');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 8
AND v.word IN ('食べます', '飲みます', '見ます', '聞きます');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 13
AND v.word IN ('買います', '金曜日');

INSERT INTO lesson_vocab
(lesson_id, vocabulary_id, sort_order)
SELECT l.id, v.id, 1
FROM lessons l
JOIN vocabulary v
WHERE l.lesson_number = 15
AND v.word IN ('読みます', '書きます', '使います');
