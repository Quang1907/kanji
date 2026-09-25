import { z } from "zod";

export const createKanjiSchema = z.object({
  kanji_character: z
    .string({ error: "Hán tự phải là chuỗi" })
    .min(1, { error: "Hán tự không được để trống" })
    .max(10, { error: "Hán tự không được vượt quá 10 ký tự" }),

  han_viet: z
    .string({ error: "Hán Việt phải là chuỗi" })
    .max(100, { error: "Hán Việt không được vượt quá 100 ký tự" })
    .nullable()
    .optional(),

  meaning: z
    .string({ error: "Ý nghĩa phải là chuỗi" })
    .max(500, { error: "Ý nghĩa không được vượt quá 500 ký tự" })
    .nullable()
    .optional(),

  onyomi: z
    .string({ error: "Onyomi phải là chuỗi" })
    .max(200, { error: "Onyomi không được vượt quá 200 ký tự" })
    .nullable()
    .optional(),

  kunyomi: z
    .string({ error: "Kunyomi phải là chuỗi" })
    .max(200, { error: "Kunyomi không được vượt quá 200 ký tự" })
    .nullable()
    .optional(),

  strokes: z
    .number({ error: "Số nét phải là số" })
    .int({ error: "Số nét phải là số nguyên" })
    .min(1, { error: "Số nét phải lớn hơn hoặc bằng 1" })
    .max(100, { error: "Số nét không được vượt quá 100" })
    .nullable()
    .optional(),

  grade: z
    .number({ error: "Grade phải là số" })
    .int({ error: "Grade phải là số nguyên" })
    .positive({ error: "Grade phải lớn hơn 0" })
    .nullable()
    .optional(),

  radical: z
    .string({ error: "Bộ thủ phải là chuỗi" })
    .max(50, { error: "Bộ thủ không được vượt quá 50 ký tự" })
    .nullable()
    .optional(),

  frequency: z
    .number({ error: "Frequency phải là số" })
    .int({ error: "Frequency phải là số nguyên" })
    .positive({ error: "Frequency phải lớn hơn 0" })
    .nullable()
    .optional(),

  jlpt_level_id: z
    .number({ error: "JLPT level ID phải là số" })
    .int({ error: "JLPT level ID phải là số nguyên" })
    .positive({ error: "JLPT level ID phải lớn hơn 0" })
    .nullable()
    .optional(),

  lesson_id: z
    .number({ error: "Lesson ID phải là số" })
    .int({ error: "Lesson ID phải là số nguyên" })
    .positive({ error: "Lesson ID phải lớn hơn 0" })
    .nullable()
    .optional(),

  mnemonic: z
    .string({ error: "Mnemonic phải là chuỗi" })
    .max(1000, { error: "Mnemonic không được vượt quá 1000 ký tự" })
    .nullable()
    .optional(),

  stroke_paths: z
    .string({ error: "Stroke paths phải là chuỗi" })
    .nullable()
    .optional(),

  audio_url: z
    .string({ error: "Audio URL phải là chuỗi" })
    .url({ error: "Audio URL không hợp lệ" })
    .nullable()
    .optional(),

  image_url: z
    .string({ error: "Image URL phải là chuỗi" })
    .url({ error: "Image URL không hợp lệ" })
    .nullable()
    .optional(),

  notes: z
    .string({ error: "Notes phải là chuỗi" })
    .max(2000, { error: "Notes không được vượt quá 2000 ký tự" })
    .nullable()
    .optional(),
});

export const createKanjiBulkSchema = z
  .array(createKanjiSchema)
  .min(1, { error: "Danh sách Kanji không được rỗng" });

export const updateKanjiSchema = createKanjiSchema.partial();

export type CreateKanjiDTO = z.infer<typeof createKanjiSchema>;
export type UpdateKanjiDTO = z.infer<typeof updateKanjiSchema>;
export type CreateKanjiBulkDTO = z.infer<typeof createKanjiBulkSchema>;
