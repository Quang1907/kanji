import type { KanjiProgress } from "@/models/kanji.progress.model";
import type { ReviewQueueItem } from "@/models/review.queue.model";
import { ProgressLocalRepository } from "@/repositories/progress.local.repository";
import { ReviewLocalRepository } from "@/repositories/review.local.repository";
import { SyncLocalRepository } from "@/repositories/sync.local.repository";
import { reviewEngine, type ReviewRating } from "./review-engine.service";

const progressRepository = new ProgressLocalRepository();
const reviewRepository = new ReviewLocalRepository();
const syncRepository = new SyncLocalRepository();

export class LearningService {
  /**
   * =====================================================
   * GET PROGRESS
   * =====================================================
   */
  async getProgress(userId: string, kanjiId: number) {
    return progressRepository.get(userId, kanjiId);
  }

  /**
   * =====================================================
   * GET ALL PROGRESS FOR USER
   * =====================================================
   */
  async getAllUserProgress(userId: string) {
    return progressRepository.getByUser(userId);
  }

  /**
   * =====================================================
   * REVIEW KANJI
   * =====================================================
   *
   * Đây là hàm được gọi khi user:
   * Again | Hard | Good | Easy
   */
  async reviewKanji(params: {
    userId: string;
    kanjiId: number;
    rating: ReviewRating;
  }) {
    const { userId, kanjiId, rating } = params;

    const now = new Date();

    /**
     * 1. Lấy progress hiện tại.
     */
    const current = await progressRepository.get(userId, kanjiId);

    /**
     * 2. ReviewEngine tính kết quả.
     */
    const result = reviewEngine.calculate(current ?? null, rating, now);

    /**
     * 3. Tạo progress mới.
     */
    const progress: KanjiProgress = {
      id: current?.id ?? Number(kanjiId),
      user_id: userId,
      kanji_id: kanjiId,
      status: result.status,
      repetitions: result.repetitions,
      lapses: result.lapses,
      difficulty: result.difficulty,
      stability: result.stability,
      interval_days: result.interval_days,
      due_at: result.due_at,
      last_reviewed_at: now.toISOString(),
      created_at: current?.created_at ?? now.toISOString(),
      updated_at: now.toISOString(),
      version: (current?.version ?? 0) + 1,
    };

    /**
     * 4. Lưu progress LOCAL trước (Offline-first).
     */
    await progressRepository.save(progress);

    /**
     * 5. Cập nhật review queue.
     */
    const queueItem: ReviewQueueItem = {
      id: current?.id ?? Number(kanjiId),
      user_id: userId,
      kanji_id: kanjiId,
      due_at: progress.due_at,
      priority: this.calculatePriority(progress),
      state: "scheduled",
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    await reviewRepository.save(queueItem);

    /**
     * 6. Đưa event vào sync_queue với unique ID và user_id.
     */
    const syncEventId = Date.now() + Math.floor(Math.random() * 1000);

    await syncRepository.add({
      id: syncEventId,
      user_id: userId,
      type: "progress_update",
      entity_id: progress.id,
      payload: {
        progress,
        rating,
      },
      created_at: now.toISOString(),
      retry_count: 0,
      status: "pending",
      updated_at: now.toISOString(),
    });

    return {
      progress,
      queueItem,
      rating,
    };
  }

  /**
   * =====================================================
   * GET TODAY REVIEWS
   * =====================================================
   */
  async getTodayReviews(userId: string) {
    return reviewRepository.getDue(userId);
  }

  /**
   * =====================================================
   * PRIORITY
   * =====================================================
   */
  private calculatePriority(progress: KanjiProgress): number {
    const now = Date.now();
    const due = new Date(progress.due_at).getTime();
    const overdueDays = Math.max(0, (now - due) / (1000 * 60 * 60 * 24));
    return Math.round(overdueDays * 10 + progress.difficulty);
  }
}

export const learningService = new LearningService();
