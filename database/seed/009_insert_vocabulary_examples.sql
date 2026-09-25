-- Seed: 009_insert_vocabulary_examples.sql


-- ============================================================
-- VOCABULARY EXAMPLES
-- ============================================================

INSERT INTO vocabulary_examples
(
    vocabulary_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '私は日本語を勉強します。',
    'わたしは にほんごを べんきょうします。',
    'Tôi học tiếng Nhật.'
FROM vocabulary
WHERE word = '日本語';

INSERT INTO vocabulary_examples
(
    vocabulary_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '私は学校へ行きます。',
    'わたしは がっこうへ いきます。',
    'Tôi đi đến trường.'
FROM vocabulary
WHERE word = '学校';

INSERT INTO vocabulary_examples
(
    vocabulary_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '今日は月曜日です。',
    'きょうは げつようびです。',
    'Hôm nay là thứ Hai.'
FROM vocabulary
WHERE word = '月曜日';

INSERT INTO vocabulary_examples
(
    vocabulary_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '水を飲みます。',
    'みずを のみます。',
    'Tôi uống nước.'
FROM vocabulary
WHERE word = '水';

INSERT INTO vocabulary_examples
(
    vocabulary_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '毎日日本語を勉強します。',
    'まいにち にほんごを べんきょうします。',
    'Tôi học tiếng Nhật mỗi ngày.'
FROM vocabulary
WHERE word = '毎日';