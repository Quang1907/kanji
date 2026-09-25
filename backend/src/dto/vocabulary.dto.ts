import { z } from "zod";

export const createVocabularySchema = z.object({
  word: z
    .string({ error: "Từ vựng phải là chuỗi" })
    .min(1, { error: "Từ vựng không được để trống" })
    .max(255, { error: "Từ vựng không được vượt quá 255 ký tự" }),

  reading: z
    .string({ error: "Cách đọc phải là chuỗi" })
    .min(1, { error: "Cách đọc không được để trống" })
    .max(255, { error: "Cách đọc không được vượt quá 255 ký tự" }),

  meaning: z.string({ error: "Ý nghĩa phải là chuỗi" }).nullable().optional(),

  han_viet: z
    .string({ error: "Hán Việt phải là chuỗi" })
    .max(100, {
      error: "Hán Việt không được vượt quá 100 ký tự",
    })
    .nullable()
    .optional(),

  part_of_speech: z
    .string({ error: "Từ loại phải là chuỗi" })
    .max(100, {
      error: "Từ loại không được vượt quá 100 ký tự",
    })
    .nullable()
    .optional(),

  jlpt_level_id: z
    .number({ error: "JLPT level ID phải là số" })
    .int({ error: "JLPT level ID phải là số nguyên" })
    .positive({ error: "JLPT level ID phải lớn hơn 0" })
    .nullable()
    .optional(),

  audio_url: z
    .string({ error: "Audio URL phải là chuỗi" })
    .max(500, {
      error: "Audio URL không được vượt quá 500 ký tự",
    })
    .nullable()
    .optional(),

  example_sentence: z
    .string({ error: "Câu ví dụ phải là chuỗi" })
    .nullable()
    .optional(),

  example_reading: z
    .string({ error: "Cách đọc câu ví dụ phải là chuỗi" })
    .nullable()
    .optional(),

  example_meaning: z
    .string({ error: "Nghĩa câu ví dụ phải là chuỗi" })
    .nullable()
    .optional(),

  lesson_id: z
    .number({ error: "Lesson ID phải là số" })
    .int({ error: "Lesson ID phải là số nguyên" })
    .positive({ error: "Lesson ID phải lớn hơn 0" })
    .nullable()
    .optional(),
});

export const updateVocabularySchema = createVocabularySchema.partial();
export type CreateVocabularyDTO = z.infer<typeof createVocabularySchema>;
export type UpdateVocabularyDTO = z.infer<typeof updateVocabularySchema>;
