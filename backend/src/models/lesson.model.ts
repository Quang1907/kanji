export interface Lesson {
  id?: number;
  level: string;
  lesson_number: number;
  title: string;
  title_japanese?: string | null;
  description?: string | null;
  objectives?: string | null;
  image_url?: string | null;
  audio_url?: string | null;
  deleted_at?: Date | null;
}
