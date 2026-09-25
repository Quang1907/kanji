-- Seed: 010_insert_kanji_vocab.sql



-- ============================================================
-- KANJI <-> VOCABULARY RELATION
-- ============================================================

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '日'
AND v.word IN (
    '日本',
    '日本人',
    '日本語',
    '今日',
    '明日',
    '昨日',
    '毎日',
    '月曜日',
    '火曜日',
    '水曜日',
    '木曜日',
    '金曜日',
    '土曜日',
    '日曜日'
);

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '月'
AND v.word IN ('月曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '火'
AND v.word IN ('火曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '水'
AND v.word IN ('水', '水曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '木'
AND v.word IN ('木曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '金'
AND v.word IN ('金曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '土'
AND v.word IN ('土曜日');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '人'
AND v.word IN ('人', '日本人', '男の人', '女の人');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '学'
AND v.word IN ('学生', '学校', '大学');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '校'
AND v.word IN ('学校');

INSERT INTO kanji_vocab
(kanji_id, vocabulary_id, importance)
SELECT k.id, v.id, 10
FROM kanji k
JOIN vocabulary v
WHERE k.kanji_character = '先'
AND v.word IN ('先生');