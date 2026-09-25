-- Seed: 011_insert_grammar_patterns.sql



-- ============================================================
-- SAMPLE N5 GRAMMAR
-- ============================================================

INSERT INTO grammar_patterns
(
    title,
    pattern,
    pattern_short,
    meaning,
    explanation,
    usage_notes,
    formation,
    level_id,
    difficulty
)
VALUES

(
    'です',
    'Nです',
    'Nです',
    'là N',
    'Dùng để xác định hoặc giới thiệu danh tính, nghề nghiệp hoặc đặc điểm.',
    'Dùng ở cuối câu danh từ.',
    'N + です',
    @N5,
    1
),

(
    'ではありません',
    'Nではありません',
    'Nではありません',
    'không phải là N',
    'Dạng phủ định lịch sự của です.',
    'Dùng để phủ định danh từ.',
    'N + ではありません',
    @N5,
    1
),

(
    'は',
    'Nは...',
    'Nは',
    'thì; về...',
    'Đánh dấu chủ đề của câu.',
    'Đặt sau danh từ làm chủ đề.',
    'N + は + ...',
    @N5,
    1
),

(
    'の',
    'N1のN2',
    'N1のN2',
    'của; thuộc về',
    'Nối hai danh từ để biểu thị quan hệ.',
    'N1 + の + N2',
    'N1のN2',
    @N5,
    1
),

(
    'も',
    'Nも...',
    'Nも',
    'cũng',
    'Biểu thị đối tượng có cùng đặc điểm.',
    'Thay は bằng も.',
    'N + も + ...',
    @N5,
    1
),

(
    'を',
    'NをV',
    'NをV',
    'tân ngữ',
    'Đánh dấu đối tượng trực tiếp của động từ.',
    'Danh từ + を + động từ.',
    'N + を + V',
    @N5,
    1
),

(
    'へ',
    'Nへ行きます',
    'NへV',
    'đến; hướng tới',
    'Dùng với động từ di chuyển.',
    'N + へ + 行きます / 来ます / 帰ります',
    'NへV',
    @N5,
    1
),

(
    'に',
    'Nに行きます',
    'NにV',
    'đến; vào; tại',
    'Có nhiều cách sử dụng, trong đó có địa điểm đến.',
    'N + に + 行きます',
    'NにV',
    @N5,
    1
),

(
    'ています',
    'Vて + います',
    'Vています',
    'đang làm',
    'Biểu thị hành động đang diễn ra.',
    'Động từ thể て + います.',
    'Vて + います',
    @N5,
    2
),

(
    'てもいいです',
    'Vてもいいです',
    'Vてもいい',
    'được phép làm',
    'Xin phép hoặc cho phép ai đó làm gì.',
    'Động từ thể て + もいいです.',
    'Vて + もいいです',
    @N5,
    2
),

(
    'てはいけません',
    'Vてはいけません',
    'Vてはいけない',
    'không được làm',
    'Biểu thị cấm hoặc không được phép.',
    'Động từ thể て + はいけません.',
    'Vて + はいけません',
    @N5,
    2
),

(
    'なくてもいいです',
    'Vなくてもいいです',
    'Vなくてもいい',
    'không cần làm',
    'Biểu thị không cần thiết phải làm.',
    'Động từ thể ない, bỏ い + くてもいいです.',
    'Vない → Vなくてもいいです',
    @N5,
    2
),

(
    'てほしいです',
    'Vてほしいです',
    'Vてほしい',
    'muốn ai đó làm',
    'Biểu thị mong muốn người khác làm gì.',
    'Động từ thể て + ほしいです.',
    'Vて + ほしいです',
    @N5,
    2
),

(
    'のが好きです',
    'Vのが好きです',
    'Vのが好き',
    'thích làm gì',
    'Danh từ hóa động từ bằng の.',
    'Động từ thể ngắn + のが好きです.',
    'V + のが好きです',
    @N5,
    2
),

(
    'のを知っています',
    'Vのを知っています',
    'Vのを知っている',
    'biết việc...',
    'Dùng の để biến một mệnh đề thành danh từ.',
    'V thể ngắn + のを知っています.',
    'V + のを知っています',
    @N5,
    2
),

(
    'ことができます',
    'Vることができます',
    'Vことができる',
    'có thể làm',
    'Biểu thị khả năng thực hiện hành động.',
    'Động từ thể từ điển + ことができます.',
    'Vる + ことができます',
    @N5,
    2
),

(
    'まえに',
    'Vるまえに',
    'Vる前に',
    'trước khi',
    'Biểu thị hành động xảy ra trước một hành động khác.',
    'Động từ thể từ điển + 前に.',
    'Vる + 前に',
    @N5,
    2
),

(
    'あとで',
    'Vたあとで',
    'Vた後で',
    'sau khi',
    'Biểu thị hành động xảy ra sau.',
    'Động từ thể た + 後で.',
    'Vた + 後で',
    @N5,
    2
);
