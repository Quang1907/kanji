export interface Vocabulary {
  id?: number;
  word: string;
  reading?: string | null;
  romaji?: string | null;
  meaning?: string | null;
  han_viet?: string | null;
  word_type?: string | null;
  jlpt_level_id?: number | null;
  jlpt_level_code?: string | null;
  frequency?: number | null;
  pitch_accent?: string | null;
  audio_url?: string | null;
  image_url?: string | null;
  notes?: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
