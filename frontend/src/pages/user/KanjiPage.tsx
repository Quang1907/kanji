import { useKanji } from "../../hooks/use-kanji";

export default function KanjiPage() {
  const kanji = useKanji();

  return (
    <div>
      <h1>Kanji</h1>

      <div>Tổng số: {kanji.length}</div>

      <div>
        {kanji.map((item) => (
          <div
            key={item.id}
            style={{
              border: "1px solid #ddd",

              padding: 16,

              marginBottom: 8,
            }}
          >
            <div
              style={{
                fontSize: 48,
              }}
            >
              {item.kanji_character}
            </div>

            <div>Hán Việt: {item.han_viet}</div>

            <div>Nghĩa: {item.meaning}</div>

            <div>Onyomi: {item.onyomi}</div>

            <div>Kunyomi: {item.kunyomi}</div>

            <div>Số nét: {item.strokes}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
