import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { learningService } from "@/services/learning.service";
import { kanjiService } from "@/services/kanji.service";
import { useAuth } from "@/stores/auth.store";
import type { ReviewQueueItem } from "@/models/review.queue.model";
import type { LocalKanji } from "@/models/kanji.local.model";
import type { ReviewRating } from "@/services/review-engine.service";
import { Calendar, CheckCircle2, RotateCcw, ArrowRight } from "lucide-react";

export default function ReviewPage() {
  const { user } = useAuth();
  const userId = String(user?.id ?? "1");

  const [queue, setQueue] = useState<ReviewQueueItem[]>([]);
  const [currentKanji, setCurrentKanji] = useState<LocalKanji | null>(null);
  const [loading, setLoading] = useState(true);
  const [showAnswer, setShowAnswer] = useState(false);
  const [reviewing, setReviewing] = useState(false);

  async function loadDueReviews() {
    setLoading(true);
    try {
      const dueItems = await learningService.getTodayReviews(userId);
      setQueue(dueItems);

      if (dueItems.length > 0) {
        const kanjiData = await kanjiService.getById(dueItems[0].kanji_id);
        setCurrentKanji(kanjiData ?? null);
      } else {
        setCurrentKanji(null);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadDueReviews();
  }, [userId]);

  async function handleRating(rating: ReviewRating) {
    if (!currentKanji || reviewing) return;
    setReviewing(true);

    try {
      await learningService.reviewKanji({
        userId,
        kanjiId: currentKanji.id,
        rating,
      });

      // Remove from current queue and pick next
      const remaining = queue.slice(1);
      setQueue(remaining);
      setShowAnswer(false);

      if (remaining.length > 0) {
        const nextKanji = await kanjiService.getById(remaining[0].kanji_id);
        setCurrentKanji(nextKanji ?? null);
      } else {
        setCurrentKanji(null);
      }
    } finally {
      setReviewing(false);
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-900">
        <div className="flex flex-col items-center gap-3">
          <div className="h-10 w-10 animate-spin rounded-full border-4 border-indigo-500 border-t-transparent" />
          <p className="text-sm text-slate-400">Đang tải danh sách cần ôn...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Ôn tập Kanji</h1>
            <p className="text-xs text-slate-400">
              Spaced Repetition System (Hoạt động Offline)
            </p>
          </div>
          <div className="flex items-center gap-2 rounded-xl bg-slate-800 px-3 py-1.5 text-xs font-semibold text-indigo-400 border border-slate-700">
            <Calendar className="h-4 w-4" />
            <span>Còn lại: {queue.length} chữ</span>
          </div>
        </div>

        {queue.length === 0 || !currentKanji ? (
          <div className="rounded-3xl border border-slate-800 bg-slate-800/60 p-12 text-center shadow-xl backdrop-blur-xl">
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <CheckCircle2 className="h-8 w-8" />
            </div>
            <h2 className="text-xl font-bold text-white">Tuyệt vời!</h2>
            <p className="mt-2 text-sm text-slate-400">
              Hôm nay bạn đã hoàn thành tất cả các mục cần ôn tập.
            </p>
            <div className="mt-6 flex justify-center gap-3">
              <Link
                to="/progress"
                className="rounded-xl bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
              >
                Xem tiến độ học tập
              </Link>
              <button
                onClick={loadDueReviews}
                className="flex items-center gap-2 rounded-xl border border-slate-700 bg-slate-800 px-4 py-2.5 text-sm font-semibold text-slate-300 hover:bg-slate-700"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Làm mới</span>
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="rounded-3xl border border-slate-800 bg-slate-800/80 p-8 text-center shadow-2xl backdrop-blur-xl">
              <div className="inline-block rounded-3xl bg-indigo-950/40 p-8 border border-indigo-500/20">
                <span className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-white to-slate-200">
                  {currentKanji.kanji_character}
                </span>
              </div>

              {showAnswer ? (
                <div className="mt-6 space-y-3 animate-in fade-in zoom-in-95 duration-200">
                  <h3 className="text-2xl font-bold text-white">
                    {currentKanji.han_viet}
                  </h3>
                  <p className="text-base font-medium text-indigo-400">
                    {currentKanji.meaning}
                  </p>
                  <div className="flex justify-center gap-4 text-sm text-slate-300 pt-2">
                    <div>
                      <span className="text-slate-500">On: </span>
                      {currentKanji.onyomi || "—"}
                    </div>
                    <div>
                      <span className="text-slate-500">Kun: </span>
                      {currentKanji.kunyomi || "—"}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="mt-8">
                  <button
                    onClick={() => setShowAnswer(true)}
                    className="inline-flex items-center gap-2 rounded-xl bg-indigo-600/20 px-6 py-3 font-semibold text-indigo-400 hover:bg-indigo-600/30 border border-indigo-500/30 transition-all"
                  >
                    <span>Hiện đáp án</span>
                    <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            {showAnswer && (
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 animate-in fade-in slide-in-from-bottom-2 duration-200">
                <button
                  onClick={() => handleRating("again")}
                  disabled={reviewing}
                  className="rounded-2xl border border-red-500/30 bg-red-500/10 p-4 text-center hover:bg-red-500/20 transition-all active:scale-95"
                >
                  <div className="font-bold text-red-400">Again</div>
                  <div className="text-xs text-red-300/80">Quên mất (10p)</div>
                </button>
                <button
                  onClick={() => handleRating("hard")}
                  disabled={reviewing}
                  className="rounded-2xl border border-orange-500/30 bg-orange-500/10 p-4 text-center hover:bg-orange-500/20 transition-all active:scale-95"
                >
                  <div className="font-bold text-orange-400">Hard</div>
                  <div className="text-xs text-orange-300/80">Khó nhớ (6h)</div>
                </button>
                <button
                  onClick={() => handleRating("good")}
                  disabled={reviewing}
                  className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-center hover:bg-emerald-500/20 transition-all active:scale-95"
                >
                  <div className="font-bold text-emerald-400">Good</div>
                  <div className="text-xs text-emerald-300/80">Nhớ tốt (1d)</div>
                </button>
                <button
                  onClick={() => handleRating("easy")}
                  disabled={reviewing}
                  className="rounded-2xl border border-blue-500/30 bg-blue-500/10 p-4 text-center hover:bg-blue-500/20 transition-all active:scale-95"
                >
                  <div className="font-bold text-blue-400">Easy</div>
                  <div className="text-xs text-blue-300/80">Rất dễ (4d)</div>
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
