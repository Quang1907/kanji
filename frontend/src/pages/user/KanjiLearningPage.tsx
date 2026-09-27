import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { kanjiService } from "@/services/kanji.service";
import { learningService } from "@/services/learning.service";
import { useAuth } from "@/stores/auth.store";
import type { ReviewRating } from "@/services/review-engine.service";
import type { LocalKanji } from "@/models/kanji.local.model";
import { ArrowLeft, BookOpen } from "lucide-react";

interface Props {
  userId?: string | number;
  kanjiId?: number;
}

const reviewOptions: {
  rating: ReviewRating;
  label: string;
  description: string;
  color: string;
  activeColor: string;
  icon: string;
}[] = [
  {
    rating: "again",
    label: "Again",
    description: "Quên mất",
    color:
      "border-red-200 bg-white text-red-600 hover:border-red-300 hover:bg-red-50",
    activeColor: "bg-red-50 border-red-300",
    icon: "↻",
  },
  {
    rating: "hard",
    label: "Hard",
    description: "Khó nhớ",
    color:
      "border-orange-200 bg-white text-orange-600 hover:border-orange-300 hover:bg-orange-50",
    activeColor: "bg-orange-50 border-orange-300",
    icon: "!",
  },
  {
    rating: "good",
    label: "Good",
    description: "Nhớ được",
    color:
      "border-emerald-200 bg-white text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50",
    activeColor: "bg-emerald-50 border-emerald-300",
    icon: "✓",
  },
  {
    rating: "easy",
    label: "Easy",
    description: "Rất dễ",
    color:
      "border-blue-200 bg-white text-blue-600 hover:border-blue-300 hover:bg-blue-50",
    activeColor: "bg-blue-50 border-blue-300",
    icon: "★",
  },
];

export default function KanjiLearningPage({
  userId: propUserId,
  kanjiId: propKanjiId,
}: Props) {
  const { user } = useAuth();
  const params = useParams<{ id?: string }>();

  const activeUserId = String(propUserId ?? user?.id ?? "1");
  const targetKanjiId = Number(propKanjiId ?? params.id ?? 1);

  const [kanji, setKanji] = useState<LocalKanji>();
  const [loading, setLoading] = useState(true);
  const [reviewing, setReviewing] = useState(false);
  const [completedRating, setCompletedRating] = useState<ReviewRating | null>(
    null,
  );

  useEffect(() => {
    async function load() {
      try {
        let data = await kanjiService.getById(targetKanjiId);
        if (!data) {
          const all = await kanjiService.getAll();
          if (all.length > 0) {
            data = all[0];
          }
        }
        setKanji(data);
      } finally {
        setLoading(false);
      }
    }

    load();
  }, [targetKanjiId]);

  async function handleReview(rating: ReviewRating) {
    if (reviewing || !kanji) {
      return;
    }

    setReviewing(true);
    setCompletedRating(null);

    try {
      await learningService.reviewKanji({
        userId: activeUserId,
        kanjiId: kanji.id,
        rating,
      });

      setCompletedRating(rating);
    } finally {
      setReviewing(false);
    }
  }

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#f8fafc]">
        <div className="flex flex-col items-center gap-4">
          <div className="h-11 w-11 animate-spin rounded-full border-[3px] border-slate-200 border-t-indigo-600" />
          <p className="text-sm font-medium text-slate-500">
            Đang tải Kanji...
          </p>
        </div>
      </main>
    );
  }

  if (!kanji) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
          <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-amber-50 text-2xl font-bold text-amber-600">
            漢
          </div>

          <h1 className="text-xl font-bold text-slate-900">
            Chưa có dữ liệu Kanji
          </h1>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            Bạn có thể tải gói N5 về để học hoàn toàn offline mà không cần Internet.
          </p>

          <Link
            to="/progress"
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
          >
            <BookOpen className="h-4 w-4" />
            <span>Đến trang Quản lý gói học</span>
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-slate-900 py-10 px-4 sm:px-6">
      <div className="mx-auto max-w-3xl space-y-6">
        {/* Navigation bar */}
        <div className="flex items-center justify-between">
          <Link
            to="/progress"
            className="inline-flex items-center gap-2 text-sm font-medium text-slate-400 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            <span>Quay lại</span>
          </Link>
          <span className="rounded-full bg-indigo-500/10 px-3 py-1 text-xs font-semibold text-indigo-400 border border-indigo-500/20">
            JLPT {kanji.jlpt_level_id ? `N${kanji.jlpt_level_id}` : "N5"}
          </span>
        </div>

        {/* Kanji Hero Card */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-800/80 p-8 shadow-2xl backdrop-blur-xl text-center">
          <div className="inline-block rounded-3xl bg-indigo-950/60 p-8 border border-indigo-500/20 shadow-inner">
            <span className="text-8xl sm:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white via-slate-100 to-indigo-200">
              {kanji.kanji_character}
            </span>
          </div>

          <div className="mt-6">
            <h1 className="text-2xl font-bold text-white">
              {kanji.han_viet || "Hán Việt"}
            </h1>
            <p className="mt-1 text-base font-medium text-indigo-400">
              {kanji.meaning || "Nghĩa"}
            </p>
          </div>

          <div className="mt-8 grid grid-cols-2 gap-4 sm:grid-cols-4">
            <InfoCard icon="音" label="Onyomi" value={kanji.onyomi || "—"} color="indigo" />
            <InfoCard icon="訓" label="Kunyomi" value={kanji.kunyomi || "—"} color="violet" />
            <InfoCard icon="画" label="Số nét" value={kanji.strokes ? `${kanji.strokes} nét` : "—"} color="amber" />
            <InfoCard icon="部" label="Bộ thủ" value={kanji.radical || "—"} color="rose" />
          </div>

          {kanji.mnemonic && (
            <div className="mt-6 rounded-2xl border border-indigo-500/10 bg-indigo-950/30 p-4 text-left">
              <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                Mẹo nhớ:
              </span>
              <p className="mt-1 text-sm text-slate-300">{kanji.mnemonic}</p>
            </div>
          )}
        </div>

        {/* Review rating section */}
        <section className="rounded-3xl border border-slate-800 bg-slate-800/80 p-6 shadow-xl backdrop-blur-xl">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
              Đánh giá mức độ nhớ
            </h2>
            <span className="text-xs text-slate-500">Spaced Repetition</span>
          </div>

          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {reviewOptions.map((opt) => (
              <button
                key={opt.rating}
                type="button"
                onClick={() => handleReview(opt.rating)}
                disabled={reviewing}
                className={`flex flex-col items-center justify-center rounded-2xl border p-4 text-center transition-all active:scale-95 disabled:opacity-50 ${
                  completedRating === opt.rating
                    ? "border-indigo-500 bg-indigo-600 text-white shadow-lg shadow-indigo-600/30"
                    : "border-slate-700 bg-slate-900/60 text-slate-200 hover:border-slate-600 hover:bg-slate-750"
                }`}
              >
                <span className="text-lg font-bold">{opt.icon}</span>
                <span className="mt-1 text-sm font-bold">{opt.label}</span>
                <span className="mt-0.5 text-xs text-slate-400">
                  {opt.description}
                </span>
              </button>
            ))}
          </div>

          {reviewing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-slate-400">
              <span className="h-3 w-3 animate-spin rounded-full border-2 border-indigo-500 border-t-transparent" />
              <span>Đang cập nhật lịch ôn tập cục bộ...</span>
            </div>
          )}

          {completedRating && !reviewing && (
            <div className="mt-4 flex items-center justify-center gap-2 text-xs font-semibold text-emerald-400">
              <span>✓ Đã cập nhật tiến độ (Offline & Sync Queue sẵn sàng)</span>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

interface InfoCardProps {
  icon: string;
  label: string;
  value: string;
  color: "indigo" | "violet" | "amber" | "rose";
}

function InfoCard({ icon, label, value, color }: InfoCardProps) {
  const colorStyles = {
    indigo: "text-indigo-400 bg-indigo-500/10",
    violet: "text-purple-400 bg-purple-500/10",
    amber: "text-amber-400 bg-amber-500/10",
    rose: "text-rose-400 bg-rose-500/10",
  };

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-900/40 p-4 text-left">
      <div className="flex items-center gap-3">
        <span
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-xl text-sm font-bold ${colorStyles[color]}`}
        >
          {icon}
        </span>
        <div className="min-w-0">
          <p className="text-xs font-semibold text-slate-400">{label}</p>
          <p className="mt-0.5 truncate text-sm font-bold text-white">
            {value}
          </p>
        </div>
      </div>
    </div>
  );
}
