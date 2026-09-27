import { z } from "zod";

export const learningSyncSchema = z.object({
  event_id: z.number(),
  type: z.enum(["progress_update", "review_result"]),
  entity_id: z.number(),
  payload: z.object({
    progress: z.object({
      id: z.number(),
      user_id: z.number(),
      kanji_id: z.number(),
      status: z.enum(["new", "learning", "review", "relearning"]),
      repetitions: z.number(),
      lapses: z.number(),
      difficulty: z.number(),
      stability: z.number(),
      interval_days: z.number(),
      due_at: z.string(),
      last_reviewed_at: z.string().nullable().optional(),
      created_at: z.string(),
      updated_at: z.string(),
      version: z.number(),
    }),
    rating: z.enum(["again", "hard", "good", "easy"]),
  }),
  created_at: z.string(),
});

export type LearningSyncDTO = z.infer<typeof learningSyncSchema>;
