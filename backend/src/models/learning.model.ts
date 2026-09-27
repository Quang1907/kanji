export interface KanjiProgress {
  id: number;
  user_id: number;
  kanji_id: number;
  status: "new" | "learning" | "review" | "relearning";
  repetitions: number;
  lapses: number;
  difficulty: number;
  stability: number;
  interval_days: number;
  due_at: Date;
  last_reviewed_at?: Date | null;
  version: number;
  created_at: Date;
  updated_at: Date;
}

export interface ReviewQueue {
  id: number;
  user_id: number;
  kanji_id: number;
  due_at: Date;
  priority: number;
  state: "due" | "scheduled";
  created_at: Date;
  updated_at: Date;
}
