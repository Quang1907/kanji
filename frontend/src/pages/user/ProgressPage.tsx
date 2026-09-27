import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { learningService } from "@/services/learning.service";
import { kanjiService } from "@/services/kanji.service";
import { useAuth } from "@/stores/auth.store";
import DownloadOfflineButton from "@/components/ui/DownloadOfflineButton";
import type { KanjiProgress } from "@/models/kanji.progress.model";
import type { LocalKanji } from "@/models/kanji.local.model";
import { BookOpen, Award, CheckCircle, Clock, Zap } from "lucide-react";

export default function ProgressPage() {
  const { user } = useAuth();
  const userId = String(user?.id ?? "1");

  const [progressList, setProgressList] = useState<KanjiProgress[]>([]);
  const [offlineKanji, setOfflineKanji] = useState<LocalKanji[]>([]);
  const [loading, setLoading] = useState(true);

  async function loadData() {
    setLoading(true);
    try {
      const [prog, kanjis] = await Promise.all([
        learningService.getAllUserProgress(userId),
        kanjiService.getAll(),
      ]);
      setProgressList(prog);
      setOfflineKanji(kanjis);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
  }, [userId]);

  const stats = {
    total: offlineKanji.length,
    learned: progressList.length,
    review: progressList.filter((p) => p.status === "review").length,
    learning: progressList.filter(
      (p) => p.status === "learning" || p.status === "relearning"
    ).length,
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-4xl space-y-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-slate-800 pb-4">
          <div>
            <h1 className="text-2xl font-bold text-white">Tiến độ học tập</h1>
            <p className="text-xs text-slate-400">
              Dữ liệu lưu an toàn trong IndexedDB của thiết bị bạn
            </p>
          </div>
          <div className="flex gap-2">
            <Link
              to="/review"
              className="inline-flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md hover:bg-indigo-500"
            >
              <Zap className="h-4 w-4" />
              <span>Vào ôn tập ngay</span>
            </Link>
          </div>
        </div>

        {/* Offline Package Download Section */}
        <section className="space-y-3">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-400">
            Gói học Offline (IndexedDB)
          </h2>
          <DownloadOfflineButton
            levelId={1}
            levelName="JLPT N5"
            onDownloaded={loadData}
          />
        </section>

        {/* Metrics Grid */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                <BookOpen className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Tổng Kanji máy có</p>
                <p className="text-xl font-bold text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400">
                <Award className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Đã học</p>
                <p className="text-xl font-bold text-white">{stats.learned}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
                <CheckCircle className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Giai đoạn Review</p>
                <p className="text-xl font-bold text-white">{stats.review}</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-800/80 p-5 backdrop-blur-md">
            <div className="flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-orange-500/10 text-orange-400">
                <Clock className="h-5 w-5" />
              </span>
              <div>
                <p className="text-xs text-slate-400">Đang luyện</p>
                <p className="text-xl font-bold text-white">{stats.learning}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Kanji list table/grid */}
        <section className="rounded-3xl border border-slate-800 bg-slate-800/60 p-6 shadow-xl backdrop-blur-xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white">Danh sách Kanji offline</h2>
            <span className="text-xs text-slate-400">
              Nhấn vào chữ bất kỳ để học / ôn
            </span>
          </div>

          {loading ? (
            <div className="py-12 text-center text-slate-500">Đang tải...</div>
          ) : offlineKanji.length === 0 ? (
            <div className="py-12 text-center text-slate-400">
              Chưa có dữ liệu offline. Hãy bấm Tải gói N5 ở trên.
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-6 md:grid-cols-8">
              {offlineKanji.map((item) => {
                const prog = progressList.find((p) => p.kanji_id === item.id);
                return (
                  <Link
                    key={item.id}
                    to={`/learn/${item.id}`}
                    className={`group relative flex flex-col items-center justify-center rounded-2xl border p-3 transition-all hover:scale-105 ${
                      prog?.status === "review"
                        ? "border-emerald-500/40 bg-emerald-950/20"
                        : prog?.status === "learning"
                        ? "border-indigo-500/40 bg-indigo-950/20"
                        : "border-slate-800 bg-slate-900/60 hover:border-slate-700"
                    }`}
                  >
                    <span className="text-3xl font-black text-white group-hover:text-indigo-400">
                      {item.kanji_character}
                    </span>
                    <span className="mt-1 truncate text-xs text-slate-400 max-w-[80px]">
                      {item.han_viet || item.meaning}
                    </span>
                    {prog && (
                      <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-indigo-500" />
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
