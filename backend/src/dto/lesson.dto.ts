import { z } from "zod";

export const createLessonSchema = z.object({
  level: z
    .string({ error: "Level phải là chuỗi" })
    .min(1, { error: "Level không được để trống" })
    .max(20, { error: "Level không được vượt quá 20 ký tự" }),

  lesson_number: z
    .number({ error: "Lesson number phải là số" })
    .int({ error: "Lesson number phải là số nguyên" })
    .positive({ error: "Lesson number phải lớn hơn 0" }),

  title: z
    .string({ error: "Tiêu đề phải là chuỗi" })
    .min(1, { error: "Tiêu đề không được để trống" })
    .max(255, { error: "Tiêu đề không được vượt quá 255 ký tự" }),

  title_japanese: z
    .string({ error: "Tiêu đề tiếng Nhật phải là chuỗi" })
    .max(255, {
      error: "Tiêu đề tiếng Nhật không được vượt quá 255 ký tự",
    })
    .nullable()
    .optional(),

  description: z.string({ error: "Mô tả phải là chuỗi" }).nullable().optional(),

  objectives: z
    .string({ error: "Mục tiêu phải là chuỗi" })
    .nullable()
    .optional(),

  image_url: z
    .string({ error: "Image URL phải là chuỗi" })
    .max(500, {
      error: "Image URL không được vượt quá 500 ký tự",
    })
    .nullable()
    .optional(),

  audio_url: z
    .string({ error: "Audio URL phải là chuỗi" })
    .max(500, {
      error: "Audio URL không được vượt quá 500 ký tự",
    })
    .nullable()
    .optional(),
});

export const updateLessonSchema = createLessonSchema.partial();
export type CreateLessonDTO = z.infer<typeof createLessonSchema>;
export type UpdateLessonDTO = z.infer<typeof updateLessonSchema>;
