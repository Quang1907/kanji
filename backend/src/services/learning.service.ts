import { connect } from "../../../database/config/database";
import { LearningRepository } from "../repositories/learning.repository";
import { LearningSyncDTO } from "../dto/learning.dto";

export interface SyncResult {
  duplicated: boolean;
  synced: boolean;
  conflict?: boolean;
  message?: string;
  kanji_id?: number;
  version?: number;
  server_data?: unknown;
}

export class LearningService {
  private repository = new LearningRepository();

  async sync(userId: number, data: LearningSyncDTO): Promise<SyncResult> {
    const connection = await connect.getConnection();

    try {
      await connection.beginTransaction();

      /**
       * =================================================
       * 1. CHECK EVENT (Idempotency)
       * =================================================
       */
      const [existingEvents] = await connection.execute<any[]>(
        `
        SELECT event_id
        FROM sync_events
        WHERE event_id = ? AND user_id = ?
        LIMIT 1
        `,
        [data.event_id, userId],
      );

      if (existingEvents.length > 0) {
        await connection.commit();
        return {
          duplicated: true,
          synced: true,
          conflict: false,
          kanji_id: data.payload.progress.kanji_id,
          version: data.payload.progress.version,
        };
      }

      /**
       * =================================================
       * 2. CHECK CONFLICT WITH EXISTING PROGRESS
       * =================================================
       */
      const progress = data.payload.progress;
      progress.user_id = userId;

      const [existingProgressRows] = await connection.execute<any[]>(
        `
        SELECT id, version, updated_at, status, repetitions, lapses, difficulty, stability, interval_days, due_at, last_reviewed_at
        FROM kanji_progress
        WHERE user_id = ? AND kanji_id = ?
        LIMIT 1
        `,
        [userId, progress.kanji_id],
      );

      if (existingProgressRows.length > 0) {
        const existing = existingProgressRows[0];
        const serverUpdatedAt = new Date(existing.updated_at).getTime();
        const clientUpdatedAt = new Date(progress.updated_at).getTime();

        /**
         * Conflict resolution strategy:
         * If server has a strictly newer timestamp, do NOT silently overwrite.
         * Return conflict: true with server state so client can update local state.
         */
        if (serverUpdatedAt > clientUpdatedAt) {
          // Log sync event as processed to prevent infinite loops
          await connection.execute(
            `
            INSERT INTO sync_events (
              event_id,
              user_id,
              event_type,
              created_at,
              processed_at
            )
            VALUES (?, ?, ?, ?, NOW())
            `,
            [data.event_id, userId, data.type, new Date(data.created_at)],
          );

          await connection.commit();

          return {
            duplicated: false,
            synced: false,
            conflict: true,
            message: "Server has more recent progress for this Kanji",
            kanji_id: progress.kanji_id,
            version: existing.version,
            server_data: existing,
          };
        }
      }

      /**
       * =================================================
       * 3. GHI SYNC EVENT
       * =================================================
       */
      await connection.execute(
        `
        INSERT INTO sync_events (
          event_id,
          user_id,
          event_type,
          created_at,
          processed_at
        )
        VALUES (?, ?, ?, ?, NOW())
        `,
        [data.event_id, userId, data.type, new Date(data.created_at)],
      );

      /**
       * =================================================
       * 4. UPSERT PROGRESS
       * =================================================
       */
      await connection.execute(
        `
        INSERT INTO kanji_progress (
          id,
          user_id,
          kanji_id,
          status,
          repetitions,
          lapses,
          difficulty,
          stability,
          interval_days,
          due_at,
          last_reviewed_at,
          version,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          status = VALUES(status),
          repetitions = VALUES(repetitions),
          lapses = VALUES(lapses),
          difficulty = VALUES(difficulty),
          stability = VALUES(stability),
          interval_days = VALUES(interval_days),
          due_at = VALUES(due_at),
          last_reviewed_at = VALUES(last_reviewed_at),
          version = VALUES(version),
          updated_at = VALUES(updated_at)
        `,
        [
          progress.id,
          userId,
          progress.kanji_id,
          progress.status,
          progress.repetitions,
          progress.lapses,
          progress.difficulty,
          progress.stability,
          progress.interval_days,
          new Date(progress.due_at),
          progress.last_reviewed_at ? new Date(progress.last_reviewed_at) : null,
          progress.version,
          new Date(progress.created_at),
          new Date(progress.updated_at),
        ],
      );

      /**
       * =================================================
       * 5. REVIEW QUEUE
       * =================================================
       */
      await connection.execute(
        `
        INSERT INTO review_queue (
          id,
          user_id,
          kanji_id,
          due_at,
          priority,
          state,
          created_at,
          updated_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
          due_at = VALUES(due_at),
          state = VALUES(state),
          updated_at = VALUES(updated_at)
        `,
        [
          progress.id,
          userId,
          progress.kanji_id,
          new Date(progress.due_at),
          0,
          "scheduled",
          new Date(progress.created_at),
          new Date(progress.updated_at),
        ],
      );

      /**
       * =================================================
       * 6. COMMIT
       * =================================================
       */
      await connection.commit();

      return {
        duplicated: false,
        synced: true,
        conflict: false,
        kanji_id: progress.kanji_id,
        version: progress.version,
      };
    } catch (error) {
      await connection.rollback();
      throw error;
    } finally {
      connection.release();
    }
  }
}
