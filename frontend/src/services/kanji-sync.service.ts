import { db } from "../database/db";

import { KanjiApiRepository } from "../repositories/kanji-api.repository";

import { SyncMetadataRepository } from "../repositories/sync-metadata.repository";

export class KanjiSyncService {
  private api = new KanjiApiRepository();

  private metadata = new SyncMetadataRepository();

  async initialSync() {
    if (!navigator.onLine) {
      return;
    }

    const kanji = await this.api.findAll();

    await db.transaction("rw", db.kanji, db.syncMetadata, async () => {
      await db.kanji.bulkPut(
        kanji.map((item) => ({
          ...item,

          id: item.id!,

          sync_status: "synced" as const,

          synced_at: new Date(),
        })),
      );

      await this.metadata.set("kanji_last_sync", new Date().toISOString());
    });
  }

  async incrementalSync() {
    if (!navigator.onLine) {
      return;
    }

    const lastSync = await this.metadata.get("kanji_last_sync");

    if (!lastSync) {
      return this.initialSync();
    }

    const changed = await this.api.sync(lastSync);

    await db.transaction("rw", db.kanji, db.syncMetadata, async () => {
      for (const item of changed) {
        if (item.deleted_at) {
          await db.kanji.delete(item.id!);
        } else {
          await db.kanji.put({
            ...item,

            id: item.id!,

            sync_status: "synced",

            synced_at: new Date(),
          });
        }
      }

      await this.metadata.set("kanji_last_sync", new Date().toISOString());
    });
  }
}
