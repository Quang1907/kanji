-- Seed: 007_insert_vocabulary_readings.sql


-- ============================================================
-- VOCABULARY READINGS
-- ============================================================

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'にほん', 'nihon', 1
FROM vocabulary WHERE word = '日本';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'にほんじん', 'nihonjin', 1
FROM vocabulary WHERE word = '日本人';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'にほんご', 'nihongo', 1
FROM vocabulary WHERE word = '日本語';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'がくせい', 'gakusei', 1
FROM vocabulary WHERE word = '学生';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'がっこう', 'gakkou', 1
FROM vocabulary WHERE word = '学校';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'せんせい', 'sensei', 1
FROM vocabulary WHERE word = '先生';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'だいがく', 'daigaku', 1
FROM vocabulary WHERE word = '大学';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'きょう', 'kyou', 1
FROM vocabulary WHERE word = '今日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'あした', 'ashita', 1
FROM vocabulary WHERE word = '明日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'きのう', 'kinou', 1
FROM vocabulary WHERE word = '昨日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'まいにち', 'mainichi', 1
FROM vocabulary WHERE word = '毎日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'げつようび', 'getsuyoubi', 1
FROM vocabulary WHERE word = '月曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'かようび', 'kayoubi', 1
FROM vocabulary WHERE word = '火曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'すいようび', 'suiyoubi', 1
FROM vocabulary WHERE word = '水曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'もくようび', 'mokuyoubi', 1
FROM vocabulary WHERE word = '木曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'きんようび', 'kinyoubi', 1
FROM vocabulary WHERE word = '金曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'どようび', 'doyoubi', 1
FROM vocabulary WHERE word = '土曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'にちようび', 'nichiyoubi', 1
FROM vocabulary WHERE word = '日曜日';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'じかん', 'jikan', 1
FROM vocabulary WHERE word = '時間';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'ひと', 'hito', 1
FROM vocabulary WHERE word = '人';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'おとこのひと', 'otoko no hito', 1
FROM vocabulary WHERE word = '男の人';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'おんなのひと', 'onna no hito', 1
FROM vocabulary WHERE word = '女の人';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'こども', 'kodomo', 1
FROM vocabulary WHERE word = '子ども';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'みず', 'mizu', 1
FROM vocabulary WHERE word = '水';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'やま', 'yama', 1
FROM vocabulary WHERE word = '山';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'おおきい', 'ookii', 1
FROM vocabulary WHERE word = '大きい';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'ちいさい', 'chiisai', 1
FROM vocabulary WHERE word = '小さい';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'いきます', 'ikimasu', 1
FROM vocabulary WHERE word = '行きます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'きます', 'kimasu', 1
FROM vocabulary WHERE word = '来ます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'かえります', 'kaerimasu', 1
FROM vocabulary WHERE word = '帰ります';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'たべます', 'tabemasu', 1
FROM vocabulary WHERE word = '食べます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'のみます', 'nomimasu', 1
FROM vocabulary WHERE word = '飲みます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'みます', 'mimasu', 1
FROM vocabulary WHERE word = '見ます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'ききます', 'kikimasu', 1
FROM vocabulary WHERE word = '聞きます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'よみます', 'yomimasu', 1
FROM vocabulary WHERE word = '読みます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'かきます', 'kakimasu', 1
FROM vocabulary WHERE word = '書きます';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'かいます', 'kaimasu', 1
FROM vocabulary WHERE word = '買います';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'つかいます', 'tsukaimasu', 1
FROM vocabulary WHERE word = '使います';

INSERT INTO vocabulary_readings
(vocabulary_id, reading, romaji, priority)
SELECT id, 'わかります', 'wakarimasu', 1
FROM vocabulary WHERE word = '分かります';
