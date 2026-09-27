/**
 * =========================================================
 * KANJI
 * =========================================================
 */

export interface LocalKanji {
  id: number;
  kanji_character: string;
  han_viet?: string | null;
  meaning?: string | null;
  onyomi?: string | null;
  kunyomi?: string | null;
  strokes?: number | null;
  grade?: number | null;
  radical?: string | null;
  frequency?: number | null;
  jlpt_level_id?: number | null;
  lesson_id?: number | null;
  mnemonic?: string | null;
  stroke_paths?: string | null;
  audio_url?: string | null;
  image_url?: string | null;
  notes?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  deleted_at?: string | null;

  /**
   * Thời điểm dữ liệu được lưu xuống thiết bị.
   *
   * Đây không phải dữ liệu từ MySQL.
   */
  downloaded_at: string;
}
