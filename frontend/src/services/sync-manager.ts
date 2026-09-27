import { syncService } from "./sync.service";

export function startSyncManager() {
  /**
   * Khi app mở và đang online.
   */
  if (navigator.onLine) {
    syncService.sync();
  }

  /**
   * Khi Internet quay trở lại.
   */
  window.addEventListener("online", () => {
    syncService.sync();
  });

  /**
   * Khi tab được mở lại.
   */
  document.addEventListener("visibilitychange", () => {
    if (document.visibilityState === "visible") {
      if (navigator.onLine) {
        syncService.sync();
      }
    }
  });

  /**
   * Định kỳ kiểm tra.
   *
   * Ví dụ 60 giây.
   */
  window.setInterval(() => {
    if (navigator.onLine) {
      syncService.sync();
    }
  }, 60_000);
}
