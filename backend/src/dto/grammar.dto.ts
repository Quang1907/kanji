import { z } from "zod";

export const createGrammarSchema = z.object({
  title: z.string().min(1, "title is required"),
  pattern: z.string().min(1, "pattern is required"),
  pattern_short: z.string().optional().nullable(),
  meaning: z.string().min(1, "meaning is required"),
  explanation: z.string().optional().nullable(),
  usage_notes: z.string().optional().nullable(),
  formation: z.string().optional().nullable(),
  level_id: z.number().int().positive().optional().nullable(),
  difficulty: z.number().int().min(1).max(5).default(1),
  mnemonic: z.string().optional().nullable(),
  notes: z.string().optional().nullable(),
});

export const updateGrammarSchema = createGrammarSchema.partial();

export type CreateGrammarDTO = z.infer<typeof createGrammarSchema>;
export type UpdateGrammarDTO = z.infer<typeof updateGrammarSchema>;
