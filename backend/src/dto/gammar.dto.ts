import { z } from "zod";

export const createGrammarSchema = z.object({
  pattern: z
    .string({ error: "Mẫu ngữ pháp phải là chuỗi" })
    .min(1, { error: "Mẫu ngữ pháp không được để trống" })
    .max(500, {
      error: "Mẫu ngữ pháp không được vượt quá 500 ký tự",
    }),
  title: z
    .string({ error: "Tiêu đề phải là chuỗi" })
    .max(255, {
      error: "Tiêu đề không được vượt quá 255 ký tự",
    })
    .nullable()
    .optional(),
  meaning: z.string({ error: "Ý nghĩa phải là chuỗi" }).nullable().optional(),
  explanation: z
    .string({ error: "Giải thích phải là chuỗi" })
    .nullable()
    .optional(),
  formation: z
    .string({ error: "Cấu trúc phải là chuỗi" })
    .nullable()
    .optional(),
  jlpt_level_id: z
    .number({ error: "JLPT level ID phải là số" })
    .int({ error: "JLPT level ID phải là số nguyên" })
    .positive({ error: "JLPT level ID phải lớn hơn 0" })
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

export const updateGrammarSchema = createGrammarSchema.partial();
export type CreateGrammarDTO = z.infer<typeof createGrammarSchema>;
export type UpdateGrammarDTO = z.infer<typeof updateGrammarSchema>;
