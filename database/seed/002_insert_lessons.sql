-- Seed: 002_insert_lessons.sql


-- ============================================================
-- N5 - 25 LESSONS
-- ============================================================

INSERT INTO lessons
(
    level_id,
    lesson_number,
    title,
    title_hiragana,
    description,
    objectives,
    estimated_minutes,
    is_published
)
VALUES

(@N5, 1,
 'Hajimemashite',
 'はじめまして',
 'Basic greetings and self introduction',
 'Learn basic greetings, names, occupations and nationality.',
 45, TRUE),

(@N5, 2,
 'Kore / Sore / Are',
 'これ・それ・あれ',
 'Demonstrative words',
 'Learn how to identify objects.',
 45, TRUE),

(@N5, 3,
 'Kono / Sono / Ano',
 'この・その・あの',
 'Demonstratives before nouns',
 'Learn demonstratives used with nouns.',
 45, TRUE),

(@N5, 4,
 'Koko / Soko / Asoko',
 'ここ・そこ・あそこ',
 'Places and locations',
 'Learn how to talk about locations.',
 45, TRUE),

(@N5, 5,
 'Ima Nanji Desu ka',
 'いまなんじですか',
 'Time and daily schedule',
 'Learn time, hours and minutes.',
 45, TRUE),

(@N5, 6,
 'Watashi no Ichinichi',
 'わたしのいちにち',
 'Daily routine',
 'Describe your daily activities.',
 50, TRUE),

(@N5, 7,
 'Doko e Ikimasu ka',
 'どこへいきますか',
 'Going somewhere',
 'Use へ and に with movement verbs.',
 50, TRUE),

(@N5, 8,
 'Nani o Shimasu ka',
 'なにをしますか',
 'Actions',
 'Use を with transitive verbs.',
 50, TRUE),

(@N5, 9,
 'Issho ni Shimasen ka',
 'いっしょにしませんか',
 'Invitations',
 'Learn invitations and suggestions.',
 50, TRUE),

(@N5, 10,
 'Ima Nani o Shiteimasu ka',
 'いまなにをしていますか',
 'Actions happening now',
 'Learn ています.',
 50, TRUE),

(@N5, 11,
 'Suki desu',
 'すきです',
 'Likes and dislikes',
 'Talk about preferences.',
 50, TRUE),

(@N5, 12,
 'Jouzu / Heta',
 'じょうず・へた',
 'Ability',
 'Talk about skills and abilities.',
 50, TRUE),

(@N5, 13,
 'Kaimono',
 'かいもの',
 'Shopping',
 'Learn prices, quantities and shopping expressions.',
 50, TRUE),

(@N5, 14,
 'Atode Shimasu',
 'あとでします',
 'Sequence and time',
 'Talk about actions before and after another action.',
 50, TRUE),

(@N5, 15,
 'Te-form',
 'てけい',
 'Te-form introduction',
 'Learn basic te-form conjugation.',
 60, TRUE),

(@N5, 16,
 'Te mo Ii desu',
 'てもいいです',
 'Permission',
 'Ask for and give permission.',
 50, TRUE),

(@N5, 17,
 'Te wa Ikemasen',
 'てはいけません',
 'Prohibition',
 'Express rules and prohibitions.',
 50, TRUE),

(@N5, 18,
 'Nakute mo Ii desu',
 'なくてもいいです',
 'No need to do something',
 'Express lack of necessity.',
 50, TRUE),

(@N5, 19,
 'Te Hoshii desu',
 'てほしいです',
 'Want someone to do something',
 'Express requests and wishes.',
 50, TRUE),

(@N5, 20,
 'Koto ga Dekimasu',
 'ことができます',
 'Ability',
 'Express ability to do something.',
 55, TRUE),

(@N5, 21,
 'Mae ni / Ato de',
 'まえに・あとで',
 'Before and after',
 'Talk about sequence of activities.',
 50, TRUE),

(@N5, 22,
 'Kara / Made',
 'から・まで',
 'From and until',
 'Express starting and ending points.',
 45, TRUE),

(@N5, 23,
 'Nai-form',
 'ないけい',
 'Negative form',
 'Learn basic negative short forms.',
 60, TRUE),

(@N5, 24,
 'Short Form',
 'ふつうけい',
 'Plain form',
 'Learn Japanese short/plain forms.',
 60, TRUE),

(@N5, 25,
 'Review N5',
 'N5ふくしゅう',
 'N5 comprehensive review',
 'Review grammar, vocabulary, kanji and basic conversation.',
 90, TRUE);
