import { db } from "@/database/db";
import { type KanjiProgress } from "@/models/kanji.progress.model";

export class ProgressLocalRepository {
  /**
   * =======================================================
   * GET
   * =======================================================
   */
  async get(
    userId: string,
    kanjiId: number,
  ): Promise<KanjiProgress | undefined> {
    return db.kanji_progress
      .where("[user_id+kanji_id]")
      .equals([userId, kanjiId])
      .first();
  }

  /**
   * =======================================================
   * SAVE
   * =======================================================
   */
  async save(progress: KanjiProgress): Promise<void> {
    await db.kanji_progress.put(progress);
  }

  /**
   * =======================================================
   * GET ALL USER PROGRESS
   * =======================================================
   */
  async getByUser(userId: string): Promise<KanjiProgress[]> {
    return db.kanji_progress.where("user_id").equals(userId).toArray();
  }

  /**
   * =======================================================
   * GET DUE
   *
   * Những Kanji đến thời gian ôn.
   * =======================================================
   */
  async getDue(userId: string, now = new Date()): Promise<KanjiProgress[]> {
    const nowIso = now.toISOString();

    return db.kanji_progress
      .where("user_id")
      .equals(userId)
      .filter((item) => {
        return item.due_at <= nowIso;
      })
      .toArray();
  }

  /**
   * =======================================================
   * DELETE USER PROGRESS
   * =======================================================
   */
  async deleteByUser(userId: string): Promise<void> {
    const items = await this.getByUser(userId);

    const ids = items.map((item) => item.id);

    if (!ids.length) {
      return;
    }

    await db.kanji_progress.bulkDelete(ids);
  }

  /**
   * =======================================================
   * CLEAR
   * =======================================================
   */
  async clear(): Promise<void> {
    await db.kanji_progress.clear();
  }
}
