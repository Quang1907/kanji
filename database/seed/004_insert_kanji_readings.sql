-- Seed: 004_insert_kanji_readings.sql


-- ============================================================
-- KANJI READINGS
-- ============================================================

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ニチ', 'on', 'nichi', 1
FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ジツ', 'on', 'jitsu', 2
FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ひ', 'kun', 'hi', 1
FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'か', 'kun', 'ka', 2
FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ゲツ', 'on', 'getsu', 1
FROM kanji WHERE kanji_character = '月';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ガツ', 'on', 'gatsu', 2
FROM kanji WHERE kanji_character = '月';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'つき', 'kun', 'tsuki', 1
FROM kanji WHERE kanji_character = '月';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'カ', 'on', 'ka', 1
FROM kanji WHERE kanji_character = '火';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ひ', 'kun', 'hi', 1
FROM kanji WHERE kanji_character = '火';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'スイ', 'on', 'sui', 1
FROM kanji WHERE kanji_character = '水';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'みず', 'kun', 'mizu', 1
FROM kanji WHERE kanji_character = '水';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'モク', 'on', 'moku', 1
FROM kanji WHERE kanji_character = '木';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'き', 'kun', 'ki', 1
FROM kanji WHERE kanji_character = '木';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'キン', 'on', 'kin', 1
FROM kanji WHERE kanji_character = '金';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'かね', 'kun', 'kane', 1
FROM kanji WHERE kanji_character = '金';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ド', 'on', 'do', 1
FROM kanji WHERE kanji_character = '土';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'つち', 'kun', 'tsuchi', 1
FROM kanji WHERE kanji_character = '土';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'サン', 'on', 'san', 1
FROM kanji WHERE kanji_character = '山';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'やま', 'kun', 'yama', 1
FROM kanji WHERE kanji_character = '山';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ジン', 'on', 'jin', 1
FROM kanji WHERE kanji_character = '人';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ひと', 'kun', 'hito', 1
FROM kanji WHERE kanji_character = '人';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'ガク', 'on', 'gaku', 1
FROM kanji WHERE kanji_character = '学';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'まなぶ', 'kun', 'manabu', 1
FROM kanji WHERE kanji_character = '学';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'コウ', 'on', 'kou', 1
FROM kanji WHERE kanji_character = '校';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'セン', 'on', 'sen', 1
FROM kanji WHERE kanji_character = '先';

INSERT INTO kanji_readings
(kanji_id, reading, reading_type, romaji, priority)
SELECT id, 'さき', 'kun', 'saki', 1
FROM kanji WHERE kanji_character = '先';