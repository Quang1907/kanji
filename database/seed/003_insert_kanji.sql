-- Seed: 003_insert_kanji.sql


-- ============================================================
-- N5 KANJI
-- ============================================================

INSERT INTO kanji
(
    kanji_character,
    han_viet,
    meaning,
    strokes,
    radical,
    jlpt_level_id,
    mnemonic
)
VALUES

('日', 'NHẬT', 'ngày; mặt trời', 4, '日', @N5,
 'Hình ảnh mặt trời, dùng để chỉ ngày và mặt trời.'),

('月', 'NGUYỆT', 'mặt trăng; tháng', 4, '月', @N5,
 'Mặt trăng đại diện cho tháng.'),

('火', 'HỎA', 'lửa', 4, '火', @N5,
 'Hình ngọn lửa đang cháy.'),

('水', 'THỦY', 'nước', 4, '水', @N5,
 'Hình dòng nước chảy.'),

('木', 'MỘC', 'cây; gỗ', 4, '木', @N5,
 'Hình một cái cây.'),

('金', 'KIM', 'vàng; tiền; kim loại', 8, '金', @N5,
 'Kim loại và vàng.'),

('土', 'THỔ', 'đất', 3, '土', @N5,
 'Hình đất trên mặt đất.'),

('山', 'SƠN', 'núi', 3, '山', @N5,
 'Ba đỉnh núi.'),

('川', 'XUYÊN', 'sông', 3, '川', @N5,
 'Các nét giống dòng nước chảy.'),

('人', 'NHÂN', 'người', 2, '人', @N5,
 'Hình người đang đứng.'),

('女', 'NỮ', 'phụ nữ', 3, '女', @N5,
 'Chữ cổ mô tả người phụ nữ.'),

('男', 'NAM', 'nam giới', 7, '田', @N5,
 'Người đàn ông làm việc trên ruộng.'),

('子', 'TỬ', 'con; trẻ em', 3, '子', @N5,
 'Hình một đứa trẻ.'),

('学', 'HỌC', 'học', 8, '子', @N5,
 'Liên quan đến việc học và học sinh.'),

('校', 'HIỆU', 'trường học', 10, '木', @N5,
 'Chữ thường xuất hiện trong 学校.'),

('先', 'TIÊN', 'trước; trước tiên', 6, '儿', @N5,
 'Ý nghĩa người đi trước.'),

('生', 'SINH', 'sống; sinh ra', 5, '生', @N5,
 'Sự sống và sinh ra.'),

('年', 'NIÊN', 'năm', 6, '干', @N5,
 'Đơn vị thời gian: năm.'),

('時', 'THỜI', 'thời gian; giờ', 10, '日', @N5,
 'Thời gian được biểu thị bằng 日.'),

('間', 'GIAN', 'khoảng; giữa', 12, '門', @N5,
 'Khoảng không gian bên trong 門.'),

('今', 'KIM', 'bây giờ', 4, '人', @N5,
 'Thời điểm hiện tại.'),

('何', 'HÀ', 'cái gì', 7, '人', @N5,
 'Dùng để hỏi cái gì.'),

('大', 'ĐẠI', 'lớn', 3, '大', @N5,
 'Hình một người dang rộng tay.'),

('小', 'TIỂU', 'nhỏ', 3, '小', @N5,
 'Ý nghĩa trái với 大.'),

('中', 'TRUNG', 'giữa; trong', 4, '丨', @N5,
 'Một đường xuyên qua trung tâm.');
