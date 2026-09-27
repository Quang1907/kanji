import { useEffect, useState } from "react";
import { syncService } from "@/services/sync.service";
import { SyncLocalRepository } from "@/repositories/sync.local.repository";
import { useAuth } from "@/stores/auth.store";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import { RefreshCw, Wifi, WifiOff, Database, Server, Check } from "lucide-react";

const syncRepository = new SyncLocalRepository();

export default function SettingsPage() {
  const { user } = useAuth();
  const userId = String(user?.id ?? "1");
  const isOnline = useOnlineStatus();

  const [syncing, setSyncing] = useState(false);
  const [pendingCount, setPendingCount] = useState(0);
  const [failedCount, setFailedCount] = useState(0);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);

  async function loadQueueStats() {
    try {
      const pending = await syncRepository.getPending(userId);
      const failed = await syncRepository.getFailed(userId);
      setPendingCount(pending.length);
      setFailedCount(failed.length);
    } catch {
      // ignore
    }
  }

  useEffect(() => {
    loadQueueStats();
  }, [userId]);

  const handleManualSync = async () => {
    if (!isOnline || syncing) return;
    setSyncing(true);
    try {
      await syncService.sync();
      setLastSyncTime(new Date().toLocaleTimeString());
      await loadQueueStats();
    } finally {
      setSyncing(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Cài đặt & Đồng bộ</h1>
          <p className="text-xs text-slate-400">
            Quản lý Offline-First, IndexedDB và kết nối Server
          </p>
        </div>

        {/* Network & Sync Status */}
        <div className="rounded-3xl border border-slate-800 bg-slate-800/80 p-6 shadow-xl backdrop-blur-xl space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className={`flex h-10 w-10 items-center justify-center rounded-xl border ${
                  isOnline
                    ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                    : "bg-red-500/10 text-red-400 border-red-500/20"
                }`}
              >
                {isOnline ? <Wifi className="h-5 w-5" /> : <WifiOff className="h-5 w-5" />}
              </span>
              <div>
                <h3 className="font-semibold text-white">Trạng thái mạng</h3>
                <p className="text-xs text-slate-400">
                  {isOnline ? "Đang kết nối Internet" : "Offline (Hoạt động hoàn toàn qua IndexedDB)"}
                </p>
              </div>
            </div>
            <span
              className={`rounded-full px-3 py-1 text-xs font-semibold uppercase ${
                isOnline
                  ? "bg-emerald-500/10 text-emerald-400"
                  : "bg-amber-500/10 text-amber-400"
              }`}
            >
              {isOnline ? "Online" : "Offline"}
            </span>
          </div>

          <div className="border-t border-slate-700/60 pt-4 space-y-3">
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Database className="h-4 w-4" />
                <span>Hàng đợi chờ đồng bộ (sync_queue)</span>
              </div>
              <span className="font-bold text-indigo-400">{pendingCount} thay đổi</span>
            </div>

            {failedCount > 0 && (
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-red-400">
                  <Server className="h-4 w-4" />
                  <span>Đồng bộ lỗi chờ retry</span>
                </div>
                <span className="font-bold text-red-400">{failedCount} mục</span>
              </div>
            )}

            {lastSyncTime && (
              <div className="flex items-center justify-between text-xs text-slate-400">
                <span>Lần đồng bộ gần nhất:</span>
                <span className="text-slate-300 font-medium">{lastSyncTime}</span>
              </div>
            )}
          </div>

          <button
            onClick={handleManualSync}
            disabled={!isOnline || syncing}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3 font-semibold text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 disabled:opacity-50 transition-all active:scale-[0.99]"
          >
            <RefreshCw className={`h-4 w-4 ${syncing ? "animate-spin" : ""}`} />
            <span>{syncing ? "Đang đồng bộ..." : "Đồng bộ ngay lên Server"}</span>
          </button>
        </div>

        {/* Offline Cache Info */}
        <div className="rounded-3xl border border-slate-800 bg-slate-800/80 p-6 space-y-4">
          <h3 className="font-bold text-white text-base">Cơ chế Offline-First</h3>
          <ul className="space-y-2 text-xs text-slate-300">
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Mọi hành động học/ôn tập được ghi vào <strong>IndexedDB</strong> cục bộ trước tiên, ngay lập tức phản hồi UI.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Thay đổi được đưa vào <strong>sync_queue</strong> và tự động đồng bộ khi có kết nối Internet trở lại.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <Check className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>
                Xử lý xung đột (conflict resolution) theo phiên bản và timestamp, bảo toàn dữ liệu học.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
