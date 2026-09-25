export interface Vocabulary {
  id?: number;
  word: string;
  reading: string;
  meaning?: string | null;
  han_viet?: string | null;
  part_of_speech?: string | null;
  jlpt_level_id?: number | null;
  audio_url?: string | null;
  example_sentence?: string | null;
  example_reading?: string | null;
  example_meaning?: string | null;
  lesson_id?: number | null;
  deleted_at?: Date | null;
}
