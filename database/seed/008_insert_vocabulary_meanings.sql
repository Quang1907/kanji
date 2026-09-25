-- Seed: 008_insert_vocabulary_meanings.sql



-- ============================================================
-- VOCABULARY MEANINGS
-- ============================================================

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'Nhật Bản', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '日本';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'người Nhật', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '日本人';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'tiếng Nhật', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '日本語';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'học sinh; sinh viên', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '学生';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'trường học', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '学校';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'giáo viên', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '先生';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'đại học', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '大学';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'hôm nay', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '今日';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'ngày mai', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '明日';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'hôm qua', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '昨日';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'mỗi ngày', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '毎日';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'thời gian', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '時間';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'người', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '人';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'nước', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '水';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'núi', 'vi', 'Danh từ'
FROM vocabulary WHERE word = '山';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'to; lớn', 'vi', 'Tính từ đuôi い'
FROM vocabulary WHERE word = '大きい';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'nhỏ', 'vi', 'Tính từ đuôi い'
FROM vocabulary WHERE word = '小さい';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'đi', 'vi', 'Động từ'
FROM vocabulary WHERE word = '行きます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'đến', 'vi', 'Động từ'
FROM vocabulary WHERE word = '来ます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'về', 'vi', 'Động từ'
FROM vocabulary WHERE word = '帰ります';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'ăn', 'vi', 'Động từ'
FROM vocabulary WHERE word = '食べます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'uống', 'vi', 'Động từ'
FROM vocabulary WHERE word = '飲みます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'xem; nhìn', 'vi', 'Động từ'
FROM vocabulary WHERE word = '見ます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'nghe; hỏi', 'vi', 'Động từ'
FROM vocabulary WHERE word = '聞きます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'đọc', 'vi', 'Động từ'
FROM vocabulary WHERE word = '読みます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'viết', 'vi', 'Động từ'
FROM vocabulary WHERE word = '書きます';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'mua', 'vi', 'Động từ'
FROM vocabulary WHERE word = '買います';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'sử dụng', 'vi', 'Động từ'
FROM vocabulary WHERE word = '使います';

INSERT INTO vocabulary_meanings
(vocabulary_id, meaning, language, part_of_speech)
SELECT id, 'hiểu', 'vi', 'Động từ'
FROM vocabulary WHERE word = '分かります';
