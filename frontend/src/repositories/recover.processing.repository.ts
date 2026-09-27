import { db } from "@/database/db";

/**
 * =========================================================
 * RECOVER PROCESSING
 * =========================================================
 */
export async function recoverProcessing(): Promise<void> {
  const items = await db.sync_queue
    .where("status")
    .equals("processing")
    .toArray();

  const timeout = 5 * 60 * 1000;

  for (const item of items) {
    if (!item.processing_started_at) {
      await db.sync_queue.update(item.id, {
        status: "pending",
      });

      continue;
    }

    const processingTime =
      Date.now() - new Date(item.processing_started_at).getTime();

    if (processingTime > timeout) {
      await db.sync_queue.update(item.id, {
        status: "failed",
        last_error: "Processing timeout",
        next_retry_at: new Date().toISOString(),
      });
    }
  }
}
