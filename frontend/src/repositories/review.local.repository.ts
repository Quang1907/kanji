import { db } from "@/database/db";
import { type ReviewQueueItem } from "@/models/review.queue.model";

export class ReviewLocalRepository {
  /**
   * =======================================================
   * SAVE / UPDATE
   * =======================================================
   */
  async save(item: ReviewQueueItem): Promise<void> {
    await db.review_queue.put(item);
  }

  /**
   * =======================================================
   * GET ONE
   * =======================================================
   */
  async get(
    userId: string,
    kanjiId: number,
  ): Promise<ReviewQueueItem | undefined> {
    return db.review_queue
      .where("[user_id+kanji_id]")
      .equals([userId, kanjiId])
      .first();
  }

  /**
   * =======================================================
   * GET DUE REVIEWS
   * =======================================================
   */
  async getDue(userId: string, now = new Date()): Promise<ReviewQueueItem[]> {
    const nowIso = now.toISOString();

    const items = await db.review_queue
      .where("user_id")
      .equals(userId)
      .filter((item) => {
        return item.state === "due" || item.due_at <= nowIso;
      })
      .toArray();

    /**
     * Ưu tiên:
     *
     * 1. due_at gần nhất
     * 2. priority cao
     */
    return items.sort((a, b) => {
      const timeA = new Date(a.due_at).getTime();

      const timeB = new Date(b.due_at).getTime();

      if (timeA !== timeB) {
        return timeA - timeB;
      }

      return b.priority - a.priority;
    });
  }

  /**
   * =======================================================
   * DELETE
   * =======================================================
   */
  async delete(userId: string, kanjiId: number): Promise<void> {
    const item = await this.get(userId, kanjiId);

    if (!item) {
      return;
    }

    await db.review_queue.delete(item.id);
  }

  /**
   * =======================================================
   * CLEAR
   * =======================================================
   */
  async clear(): Promise<void> {
    await db.review_queue.clear();
  }
}
