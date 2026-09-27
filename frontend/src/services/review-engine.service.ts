import type { KanjiProgress } from "@/models/kanji.progress.model";

export type ReviewRating = "again" | "hard" | "good" | "easy";

export interface ReviewResult {
  status: "new" | "learning" | "review" | "relearning";

  repetitions: number;

  lapses: number;

  difficulty: number;

  stability: number;

  interval_days: number;

  due_at: string;
}

export class ReviewEngine {
  /**
   * =====================================================
   * MAIN
   * =====================================================
   */
  calculate(
    current: KanjiProgress | null,
    rating: ReviewRating,
    now = new Date(),
  ): ReviewResult {
    /**
     * Kanji chưa từng học.
     */
    if (!current) {
      return this.calculateNew(rating, now);
    }

    /**
     * Kanji đã từng học.
     */
    return this.calculateExisting(current, rating, now);
  }

  /**
   * =====================================================
   * NEW KANJI
   * =====================================================
   */
  private calculateNew(rating: ReviewRating, now: Date): ReviewResult {
    let status: "new" | "learning" | "review" | "relearning";

    let intervalDays: number;

    let stability: number;

    let difficulty: number;

    const repetitions = 1;

    const lapses = 0;

    switch (rating) {
      case "again":
        status = "learning";

        /**
         * 10 phút.
         */
        intervalDays = 10 / (60 * 24);

        stability = 0.2;

        difficulty = 6;

        break;

      case "hard":
        status = "learning";

        /**
         * 6 giờ.
         */
        intervalDays = 6 / 24;

        stability = 0.5;

        difficulty = 5.5;

        break;

      case "good":
        status = "review";

        /**
         * 1 ngày.
         */
        intervalDays = 1;

        stability = 1;

        difficulty = 5;

        break;

      case "easy":
        status = "review";

        /**
         * 4 ngày.
         */
        intervalDays = 4;

        stability = 2;

        difficulty = 4;

        break;
    }

    return {
      status,

      repetitions,

      lapses,

      difficulty,

      stability,

      interval_days: intervalDays,

      due_at: this.addDays(now, intervalDays).toISOString(),
    };
  }

  /**
   * =====================================================
   * EXISTING KANJI
   * =====================================================
   */
  private calculateExisting(
    current: KanjiProgress,
    rating: ReviewRating,
    now: Date,
  ): ReviewResult {
    let difficulty = current.difficulty;

    let stability = current.stability;

    let intervalDays = current.interval_days;

    const repetitions = current.repetitions + 1;

    let lapses = current.lapses;

    let status = current.status;

    /**
     * ===================================================
     * AGAIN
     * ===================================================
     */
    if (rating === "again") {
      lapses++;

      status = "relearning";

      /**
       * Reset một phần stability.
       */
      stability = Math.max(0.2, stability * 0.35);

      intervalDays = 10 / (60 * 24);

      difficulty = Math.min(10, difficulty + 0.8);
    } else if (rating === "hard") {
      /**
       * ===================================================
       * HARD
       * ===================================================
       */
      status = current.status === "new" ? "learning" : current.status;

      stability = Math.max(0.5, stability * 1.2);

      intervalDays = Math.max(0.25, stability * 1.2);

      difficulty = Math.min(10, difficulty + 0.3);
    } else if (rating === "good") {
      /**
       * ===================================================
       * GOOD
       * ===================================================
       */
      status = "review";

      stability = Math.max(1, stability * 2.2);

      intervalDays = Math.max(1, stability);

      difficulty = Math.max(1, difficulty - 0.2);
    } else {
      /**
       * ===================================================
       * EASY
       * ===================================================
       */
      status = "review";

      stability = Math.max(2, stability * 3.5);

      intervalDays = Math.max(2, stability);

      difficulty = Math.max(1, difficulty - 0.5);
    }

    /**
     * Giới hạn interval.
     *
     * Không cho một lần review nhảy
     * quá 365 ngày.
     */
    intervalDays = Math.min(365, intervalDays);

    return {
      status,

      repetitions,

      lapses,

      difficulty,

      stability,

      interval_days: intervalDays,

      due_at: this.addDays(now, intervalDays).toISOString(),
    };
  }

  /**
   * =====================================================
   * ADD DAYS
   * =====================================================
   */
  private addDays(date: Date, days: number): Date {
    return new Date(date.getTime() + days * 24 * 60 * 60 * 1000);
  }
}

export const reviewEngine = new ReviewEngine();
