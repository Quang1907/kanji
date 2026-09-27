/**
 * =========================================================
 * SYNC QUEUE
 * =========================================================
 */

export type SyncQueueType = "progress_update" | "review_result";

export type SyncQueueStatus = "pending" | "processing" | "failed";

export interface SyncQueueItem {
  id: number;
  user_id: string;
  type: SyncQueueType;
  entity_id: number;
  payload: unknown;
  created_at: string;
  retry_count: number;
  next_retry_at?: string | null;
  last_error?: string | null;
  processing_started_at?: string | null;
  status: SyncQueueStatus;
  updated_at: string;
}
