export interface Grammar {
  id?: number;
  pattern: string;
  title?: string | null;
  meaning?: string | null;
  explanation?: string | null;
  formation?: string | null;
  jlpt_level_id?: number | null;
  example_sentence?: string | null;
  example_reading?: string | null;
  example_meaning?: string | null;
  lesson_id?: number | null;
  deleted_at?: Date | null;
}
