import Dexie, { type Table } from "dexie";

import type { LocalKanji } from "../models/kanji.model";

export interface SyncQueueItem {
  id?: number;

  entity: "kanji" | "kanji_progress" | "vocabulary_progress";

  entityId: number;

  operation: "create" | "update" | "delete";

  payload?: unknown;

  createdAt: Date;

  retryCount: number;

  status: "pending" | "syncing" | "failed";
}

export interface SyncMetadata {
  key: string;

  value: string;
}

export class AppDatabase extends Dexie {
  kanji!: Table<LocalKanji, number>;

  syncQueue!: Table<SyncQueueItem, number>;

  syncMetadata!: Table<SyncMetadata, string>;

  constructor() {
    super("JapaneseLearningDB");

    this.version(1).stores({
      kanji:
        "id, kanji_character, jlpt_level_id, lesson_id, updated_at, deleted_at",

      syncQueue: "++id, entity, entityId, operation, status, createdAt",

      syncMetadata: "key",
    });
  }
}

export const db = new AppDatabase();
