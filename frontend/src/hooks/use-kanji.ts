import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../database/db";

export function useKanji() {
  const kanji = useLiveQuery(
    () => db.kanji.filter((item) => !item.deleted_at).toArray(),

    [],

    [],
  );

  return kanji;
}
