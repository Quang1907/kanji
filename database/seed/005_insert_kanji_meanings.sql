-- Seed: 005_insert_kanji_meanings.sql



-- ============================================================
-- KANJI MEANINGS
-- ============================================================

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'ngày', 'vi', 1 FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'mặt trời', 'vi', 2 FROM kanji WHERE kanji_character = '日';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'mặt trăng', 'vi', 1 FROM kanji WHERE kanji_character = '月';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'tháng', 'vi', 2 FROM kanji WHERE kanji_character = '月';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'lửa', 'vi', 1 FROM kanji WHERE kanji_character = '火';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'nước', 'vi', 1 FROM kanji WHERE kanji_character = '水';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'cây', 'vi', 1 FROM kanji WHERE kanji_character = '木';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'vàng; tiền', 'vi', 1 FROM kanji WHERE kanji_character = '金';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'đất', 'vi', 1 FROM kanji WHERE kanji_character = '土';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'núi', 'vi', 1 FROM kanji WHERE kanji_character = '山';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'người', 'vi', 1 FROM kanji WHERE kanji_character = '人';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'học', 'vi', 1 FROM kanji WHERE kanji_character = '学';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'trường học', 'vi', 1 FROM kanji WHERE kanji_character = '校';

INSERT INTO kanji_meanings
(kanji_id, meaning, language, priority)
SELECT id, 'trước', 'vi', 1 FROM kanji WHERE kanji_character = '先';
