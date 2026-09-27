export interface Grammar {
  id?: number;
  title: string;
  pattern: string;
  pattern_short?: string | null;
  meaning: string;
  explanation?: string | null;
  usage_notes?: string | null;
  formation?: string | null;
  level_id?: number | null;
  jlpt_level_code?: string | null;
  difficulty?: number;
  mnemonic?: string | null;
  notes?: string | null;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}
