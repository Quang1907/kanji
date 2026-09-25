import { useLiveQuery } from "dexie-react-hooks";

import { db } from "../database/db";

export function useKanjiSearch(keyword: string) {
  return useLiveQuery(
    async () => {
      const value = keyword.trim().toLowerCase();

      if (!value) {
        return db.kanji.filter((item) => !item.deleted_at).toArray();
      }

      return db.kanji
        .filter((item) => {
          if (item.deleted_at) {
            return false;
          }

          return (
            item.kanji_character.includes(value) ||
            item.meaning?.toLowerCase().includes(value) ||
            item.han_viet?.toLowerCase().includes(value)
          );
        })
        .toArray();
    },

    [keyword],

    [],
  );
}
