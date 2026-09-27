import { useEffect, useState } from "react";
import { kanjiService } from "../../services/kanji.service";
import { Download, CheckCircle2, AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  levelId: number;
  levelName?: string;
  onDownloaded?: () => void;
}

export default function DownloadOfflineButton({
  levelId,
  levelName = "N5",
  onDownloaded,
}: Props) {
  const [downloading, setDownloading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [downloadedCount, setDownloadedCount] = useState(0);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;

    async function load() {
      try {
        const count = await kanjiService.getOfflineJlptCount(levelId);
        if (mounted) {
          setDownloadedCount(count);
          if (count > 0) {
            setProgress(100);
          }
        }
      } catch {
        // ignore
      }
    }

    load();

    return () => {
      mounted = false;
    };
  }, [levelId]);

  async function handleDownload() {
    try {
      setError(null);
      setDownloading(true);
      setProgress(10);

      // Simulate step-by-step progress for UX if fast
      const timer = setInterval(() => {
        setProgress((prev) => (prev < 85 ? prev + 15 : prev));
      }, 200);

      const result = await kanjiService.downloadJlptForOffline(
        levelId,
        (current, total) => {
          if (total > 0) {
            setProgress(Math.round((current / total) * 100));
          }
        }
      );

      clearInterval(timer);
      setDownloadedCount(result.downloaded);
      setProgress(100);
      if (onDownloaded) onDownloaded();
    } catch (err: any) {
      setError(err?.message ?? "Download failed");
    } finally {
      setDownloading(false);
    }
  }

  const isDownloaded = downloadedCount > 0 && progress === 100 && !downloading;

  return (
    <div className="rounded-2xl border border-slate-700/60 bg-slate-800/80 p-5 shadow-lg backdrop-blur-md transition-all">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/10 text-indigo-400 font-bold border border-indigo-500/20">
            {levelName}
          </div>
          <div>
            <h3 className="font-semibold text-slate-100">{levelName} Offline Package</h3>
            <p className="text-xs text-slate-400">
              {downloadedCount > 0
                ? `${downloadedCount} Kanji sẵn sàng học offline`
                : "Chưa có dữ liệu offline"}
            </p>
          </div>
        </div>

        {isDownloaded ? (
          <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <CheckCircle2 className="h-4 w-4" />
            <span>Available Offline (100%)</span>
          </div>
        ) : downloading ? (
          <div className="flex items-center gap-2 text-xs font-medium text-indigo-400">
            <RefreshCw className="h-3.5 w-3.5 animate-spin" />
            <span>Downloading... {progress}%</span>
          </div>
        ) : error ? (
          <button
            onClick={handleDownload}
            className="flex items-center gap-1.5 rounded-lg bg-red-500/20 px-3 py-1.5 text-xs font-semibold text-red-300 hover:bg-red-500/30 border border-red-500/30 transition-all"
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            <span>Retry</span>
          </button>
        ) : (
          <button
            type="button"
            onClick={handleDownload}
            className="flex items-center gap-2 rounded-xl bg-indigo-600 px-4 py-2 text-xs font-semibold text-white shadow-md shadow-indigo-600/20 hover:bg-indigo-500 transition-all active:scale-95"
          >
            <Download className="h-4 w-4" />
            <span>Download {levelName}</span>
          </button>
        )}
      </div>

      {downloading && (
        <div className="mt-4 space-y-1.5">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Đang tải xuống...</span>
            <span className="font-semibold text-indigo-400">{progress}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-700">
            <div
              className="h-full bg-indigo-500 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      {error && (
        <div className="mt-3 flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/10 px-3 py-2 text-xs text-red-400">
          <span>{error}</span>
          <button
            onClick={handleDownload}
            className="font-bold underline hover:text-red-300 ml-2"
          >
            Retry
          </button>
        </div>
      )}
    </div>
  );
}
