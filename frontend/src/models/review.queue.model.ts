/**
 * =========================================================
 * REVIEW QUEUE
 * =========================================================
 */

export type ReviewQueueState = "due" | "scheduled";

export interface ReviewQueueItem {
  id: number;
  user_id: string;
  kanji_id: number;
  due_at: string;
  priority: number;
  state: ReviewQueueState;
  created_at: string;
  updated_at: string;
}
