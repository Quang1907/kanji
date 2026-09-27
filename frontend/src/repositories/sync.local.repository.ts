import { db } from "@/database/db";
import type { SyncQueueItem, SyncQueueStatus } from "@/models/sync.queue.model";

export class SyncLocalRepository {
  /**
   * =======================================================
   * ADD
   * =======================================================
   */
  async add(item: SyncQueueItem): Promise<void> {
    await db.sync_queue.put(item);
  }

  /**
   * =======================================================
   * GET PENDING (Filtered by user for isolation)
   * =======================================================
   */
  async getPending(userId?: string): Promise<SyncQueueItem[]> {
    if (userId) {
      return db.sync_queue
        .where("user_id")
        .equals(userId)
        .filter((item) => item.status === "pending")
        .toArray();
    }
    return db.sync_queue.where("status").equals("pending").toArray();
  }

  /**
   * =======================================================
   * GET FAILED (Filtered by user for isolation)
   * =======================================================
   */
  async getFailed(userId?: string): Promise<SyncQueueItem[]> {
    const now = Date.now();

    let items: SyncQueueItem[];
    if (userId) {
      items = await db.sync_queue
        .where("user_id")
        .equals(userId)
        .filter((item) => item.status === "failed")
        .toArray();
    } else {
      items = await db.sync_queue
        .where("status")
        .equals("failed")
        .toArray();
    }

    return items.filter((item) => {
      if (!item.next_retry_at) {
        return true;
      }

      return new Date(item.next_retry_at).getTime() <= now;
    });
  }

  /**
   * =======================================================
   * UPDATE STATUS
   * =======================================================
   */
  async updateStatus(id: number, status: SyncQueueStatus): Promise<void> {
    await db.sync_queue.update(id, {
      status,
      updated_at: new Date().toISOString(),
    });
  }

  /**
   * =======================================================
   * RETRY
   * =======================================================
   */
  async retry(id: number): Promise<void> {
    const item = await db.sync_queue.get(id);

    if (!item) {
      return;
    }

    await db.sync_queue.update(id, {
      status: "pending",
      retry_count: item.retry_count + 1,
      updated_at: new Date().toISOString(),
    });
  }

  /**
   * =======================================================
   * MARK PROCESSING
   * =======================================================
   */
  async markProcessing(id: number): Promise<void> {
    await db.sync_queue.update(id, {
      status: "processing",
      processing_started_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  /**
   * =======================================================
   * MARK FAILED
   * =======================================================
   */
  async markFailed(id: number, error: string): Promise<void> {
    const item = await db.sync_queue.get(id);

    if (!item) {
      return;
    }

    const retryCount = item.retry_count + 1;

    await db.sync_queue.update(id, {
      status: "failed",
      retry_count: retryCount,
      last_error: error,
      next_retry_at: this.calculateNextRetry(retryCount),
      processing_started_at: null,
      updated_at: new Date().toISOString(),
    });
  }

  /**
   * =======================================================
   * CALCULATE NEXT RETRY
   * =======================================================
   */
  private calculateNextRetry(retryCount: number): string {
    const delay = Math.min(5 * 2 ** (retryCount - 1), 60 * 60);
    return new Date(Date.now() + delay * 1000).toISOString();
  }

  /**
   * =======================================================
   * DELETE
   * =======================================================
   */
  async delete(id: number): Promise<void> {
    await db.sync_queue.delete(id);
  }

  /**
   * =======================================================
   * DELETE BY USER
   * =======================================================
   */
  async deleteByUser(userId: string): Promise<void> {
    const items = await db.sync_queue.where("user_id").equals(userId).toArray();
    const ids = items.map((i) => i.id);
    if (ids.length) {
      await db.sync_queue.bulkDelete(ids);
    }
  }

  /**
   * =======================================================
   * CLEAR
   * =======================================================
   */
  async clear(): Promise<void> {
    await db.sync_queue.clear();
  }
}
