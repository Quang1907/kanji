/**
 * =========================================================
 * KANJI PROGRESS
 * =========================================================
 */

export type KanjiLearningStatus = "new" | "learning" | "review" | "relearning";

export interface KanjiProgress {
  /**
   * Local primary key.
   *
   * Ví dụ:
   * userId:1 + kanjiId:100
   */
  id: number;
  user_id: string;
  kanji_id: number;
  status: KanjiLearningStatus;
  repetitions: number;
  lapses: number;
  difficulty: number;
  stability: number;
  interval_days: number;
  due_at: string;
  last_reviewed_at?: string | null;
  created_at: string;
  updated_at: string;

  /**
   * Dùng sau này cho sync/conflict.
   */
  version: number;
}
