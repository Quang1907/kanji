export interface Lesson {
  id?: number;
  level_id: number;
  level_code?: string | null;
  lesson_number: number;
  title: string;
  title_hiragana?: string | null;
  description?: string | null;
  objectives?: string | null;
  content?: string | null;
  thumbnail_url?: string | null;
  estimated_minutes?: number | null;
  is_published?: boolean;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
