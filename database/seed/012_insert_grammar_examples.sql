-- Seed: 012_insert_grammar_examples.sql


-- ============================================================
-- GRAMMAR EXAMPLES
-- ============================================================

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '私は学生です。',
    'わたしは がくせいです。',
    'Tôi là học sinh/sinh viên.'
FROM grammar_patterns
WHERE pattern = 'Nです';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '私は日本人ではありません。',
    'わたしは にほんじんではありません。',
    'Tôi không phải người Nhật.'
FROM grammar_patterns
WHERE pattern = 'Nではありません';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '私は日本語を勉強します。',
    'わたしは にほんごを べんきょうします。',
    'Tôi học tiếng Nhật.'
FROM grammar_patterns
WHERE pattern = 'NをV';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '学校へ行きます。',
    'がっこうへ いきます。',
    'Tôi đi đến trường.'
FROM grammar_patterns
WHERE pattern = 'Nへ行きます';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '今、日本語を勉強しています。',
    'いま、にほんごを べんきょうしています。',
    'Bây giờ tôi đang học tiếng Nhật.'
FROM grammar_patterns
WHERE pattern = 'Vて + います';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    'ここで写真を撮ってもいいです。',
    'ここで しゃしんを とってもいいです。',
    'Chụp ảnh ở đây cũng được.'
FROM grammar_patterns
WHERE pattern = 'Vてもいいです';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    'ここで写真を撮ってはいけません。',
    'ここで しゃしんを とってはいけません。',
    'Không được chụp ảnh ở đây.'
FROM grammar_patterns
WHERE pattern = 'Vてはいけません';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '明日は来なくてもいいです。',
    'あしたは こなくてもいいです。',
    'Ngày mai không cần đến cũng được.'
FROM grammar_patterns
WHERE pattern = 'Vなくてもいいです';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '日本語を話してほしいです。',
    'にほんごを はなしてほしいです。',
    'Tôi muốn bạn nói tiếng Nhật.'
FROM grammar_patterns
WHERE pattern = 'Vてほしいです';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '日本語を勉強するのが好きです。',
    'にほんごを べんきょうするのが すきです。',
    'Tôi thích học tiếng Nhật.'
FROM grammar_patterns
WHERE pattern = 'Vのが好きです';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '日本へ行ったことを知っています。',
    'にほんへ いったことを しっています。',
    'Tôi biết việc đã đi Nhật.'
FROM grammar_patterns
WHERE pattern = 'Vのを知っています';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '日本語を話すことができます。',
    'にほんごを はなすことが できます。',
    'Tôi có thể nói tiếng Nhật.'
FROM grammar_patterns
WHERE pattern = 'Vることができます';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '寝る前に歯を磨きます。',
    'ねるまえに はを みがきます。',
    'Tôi đánh răng trước khi ngủ.'
FROM grammar_patterns
WHERE pattern = 'Vるまえに';

INSERT INTO grammar_examples
(
    grammar_id,
    sentence,
    sentence_hiragana,
    translation
)
SELECT
    id,
    '仕事が終わったあとで、買い物します。',
    'しごとが おわったあとで、かいものします。',
    'Sau khi kết thúc công việc, tôi đi mua sắm.'
FROM grammar_patterns
WHERE pattern = 'Vたあとで';
