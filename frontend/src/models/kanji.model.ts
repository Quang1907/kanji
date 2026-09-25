import type { Kanji } from "../../../backend/src/models/kanji.model";
export interface LocalKanji extends Kanji {
  id: number;

  synced_at?: Date;

  sync_status?: "synced" | "pending" | "error";
}
