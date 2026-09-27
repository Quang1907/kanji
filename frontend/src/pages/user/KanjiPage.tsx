import { useEffect, useState } from "react";
import { kanjiService } from "@/services/kanji.service";
import type { LocalKanji } from "@/models/kanji.local.model";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";

export default function KanjiPage() {
  const [kanji, setKanji] = useState<LocalKanji[]>([]);
  const isOnline = useOnlineStatus();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadKanji() {
      try {
        const data = await kanjiService.getAll();
        setKanji(data);
      } finally {
        setLoading(false);
      }
    }
    loadKanji();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <div>{isOnline ? "🟢 Online" : "🔴 Offline"}</div>
      {kanji.map((item) => (
        <div key={item.id}>
          <strong>{item.kanji_character}</strong>
          <div>{item.meaning}</div>
          <div>Onyomi: {item.onyomi}</div>
          <div>Kunyomi: {item.kunyomi}</div>
        </div>
      ))}
    </div>
  );
}
