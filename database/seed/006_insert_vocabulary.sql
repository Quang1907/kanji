-- Seed: 006_insert_vocabulary.sql


-- ============================================================
-- SAMPLE VOCABULARY
-- ============================================================

INSERT INTO vocabulary
(
    word,
    word_type,
    han_viet,
    meaning,
    jlpt_level_id
)
VALUES

('日本', 'noun', 'NHẬT BẢN', 'Nhật Bản', @N5),
('日本人', 'noun', 'NHẬT BẢN NHÂN', 'người Nhật', @N5),
('日本語', 'noun', 'NHẬT BẢN NGỮ', 'tiếng Nhật', @N5),
('学生', 'noun', 'HỌC SINH', 'học sinh; sinh viên', @N5),
('学校', 'noun', 'HỌC HIỆU', 'trường học', @N5),
('先生', 'noun', 'TIÊN SINH', 'giáo viên', @N5),
('大学', 'noun', 'ĐẠI HỌC', 'đại học', @N5),
('今日', 'noun', 'KIM NHẬT', 'hôm nay', @N5),
('明日', 'noun', 'MINH NHẬT', 'ngày mai', @N5),
('昨日', 'noun', 'TẠC NHẬT', 'hôm qua', @N5),
('毎日', 'noun', 'MAI NHẬT', 'mỗi ngày', @N5),
('月曜日', 'noun', 'NGUYỆT DIỆU NHẬT', 'thứ Hai', @N5),
('火曜日', 'noun', 'HỎA DIỆU NHẬT', 'thứ Ba', @N5),
('水曜日', 'noun', 'THỦY DIỆU NHẬT', 'thứ Tư', @N5),
('木曜日', 'noun', 'MỘC DIỆU NHẬT', 'thứ Năm', @N5),
('金曜日', 'noun', 'KIM DIỆU NHẬT', 'thứ Sáu', @N5),
('土曜日', 'noun', 'THỔ DIỆU NHẬT', 'thứ Bảy', @N5),
('日曜日', 'noun', 'NHẬT DIỆU NHẬT', 'Chủ Nhật', @N5),
('時間', 'noun', 'THỜI GIAN', 'thời gian', @N5),
('人', 'noun', 'NHÂN', 'người', @N5),
('男の人', 'noun', 'NAM NHÂN', 'người đàn ông', @N5),
('女の人', 'noun', 'NỮ NHÂN', 'người phụ nữ', @N5),
('子ども', 'noun', 'TỬ', 'trẻ em', @N5),
('水', 'noun', 'THỦY', 'nước', @N5),
('山', 'noun', 'SƠN', 'núi', @N5),
('大きい', 'i-adjective', 'ĐẠI', 'to; lớn', @N5),
('小さい', 'i-adjective', 'TIỂU', 'nhỏ', @N5),
('行きます', 'verb', 'HÀNH', 'đi', @N5),
('来ます', 'verb', 'LAI', 'đến', @N5),
('帰ります', 'verb', 'QUY', 'về', @N5),
('食べます', 'verb', 'THỰC', 'ăn', @N5),
('飲みます', 'verb', 'ẨM', 'uống', @N5),
('見ます', 'verb', 'KIẾN', 'xem; nhìn', @N5),
('聞きます', 'verb', 'VĂN', 'nghe; hỏi', @N5),
('読みます', 'verb', 'ĐỘC', 'đọc', @N5),
('書きます', 'verb', 'THƯ', 'viết', @N5),
('買います', 'verb', 'MÃI', 'mua', @N5),
('使います', 'verb', 'SỬ', 'sử dụng', @N5),
('分かります', 'verb', 'PHÂN', 'hiểu', @N5);