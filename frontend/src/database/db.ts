import type { LocalKanji } from "@/models/kanji.local.model";
import type { KanjiProgress } from "@/models/kanji.progress.model";
import type { SyncMetadata } from "@/models/sync.metadata.model";
import type { ReviewQueueItem } from "@/models/review.queue.model";
import type { SyncQueueItem } from "@/models/sync.queue.model";
import Dexie, { type Table } from "dexie";

/**
 * =========================================================
 * DATABASE
 * =========================================================
 */

export class JapaneseLearningDB extends Dexie {
  kanji!: Table<LocalKanji, number>;
  kanji_progress!: Table<KanjiProgress, number>;
  review_queue!: Table<ReviewQueueItem, number>;
  sync_queue!: Table<SyncQueueItem, number>;
  metadata!: Table<SyncMetadata, string>;

  constructor() {
    super("JapaneseLearningDB");

    this.version(1).stores({
      kanji: "id, kanji_character, jlpt_level_id, lesson_id, updated_at",
      kanji_progress:
        "id, [user_id+kanji_id], user_id, kanji_id, status, due_at, updated_at",
      review_queue:
        "id, [user_id+kanji_id], user_id, kanji_id, due_at, state, priority",
      sync_queue: "id, type, entity_id, status, created_at",
      metadata: "key",
    });

    this.version(2).stores({
      kanji: "id, kanji_character, jlpt_level_id, lesson_id, updated_at",
      kanji_progress:
        "id, [user_id+kanji_id], user_id, kanji_id, status, due_at, updated_at",
      review_queue:
        "id, [user_id+kanji_id], user_id, kanji_id, due_at, state, priority",
      sync_queue:
        "id, [user_id+status], user_id, type, entity_id, status, created_at",
      metadata: "key",
    });
  }
}

/**
 * Singleton database instance.
 */
export const db = new JapaneseLearningDB();
