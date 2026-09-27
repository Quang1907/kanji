import { ResultSetHeader } from "mysql2";
import { connect } from "../../../database/config/database";
import { KanjiProgress } from "../models/learning.model";

export class LearningRepository {
  /**
   * =====================================================
   * SAVE PROGRESS
   * =====================================================
   */
  async upsertProgress(progress: KanjiProgress): Promise<void> {
    await connect.execute<ResultSetHeader>(
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
        repetitions =
          VALUES(repetitions),
        lapses =
          VALUES(lapses),
        difficulty =
          VALUES(difficulty),
        stability =
          VALUES(stability),
        interval_days =
          VALUES(interval_days),
        due_at =
          VALUES(due_at),
        last_reviewed_at =
          VALUES(last_reviewed_at),
        version =
          VALUES(version),
        updated_at =
          VALUES(updated_at)
      `,
      [
        progress.id,
        progress.user_id,
        progress.kanji_id,
        progress.status,
        progress.repetitions,
        progress.lapses,
        progress.difficulty,
        progress.stability,
        progress.interval_days,
        progress.due_at,
        progress.last_reviewed_at ?? null,
        progress.version,
        progress.created_at,
        progress.updated_at,
      ],
    );
  }

  /**
   * =====================================================
   * SAVE REVIEW QUEUE
   * =====================================================
   */
  async upsertReviewQueue(data: {
    id: number;
    user_id: number;
    kanji_id: number;
    due_at: Date;
    priority: number;
    state: string;
    created_at: Date;
    updated_at: Date;
  }): Promise<void> {
    await connect.execute<ResultSetHeader>(
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
        due_at =
          VALUES(due_at),
        priority =
          VALUES(priority),
        state =
          VALUES(state),
        updated_at =
          VALUES(updated_at)
      `,
      [
        data.id,
        data.user_id,
        data.kanji_id,
        data.due_at,
        data.priority,
        data.state,
        data.created_at,
        data.updated_at,
      ],
    );
  }
}
