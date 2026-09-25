import "./App.css";

import { ConfirmProvider } from "./components/providers/ConfirmProvider";
import NotificationProvider from "./components/providers/NotificationProvider";

import { Alert, AlertDescription, AlertTitle } from "./components/ui/alert";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogTrigger,
} from "./components/ui/dialog";

import { useEffect } from "react";
import { KanjiSyncService } from "./services/kanji-sync.service";

function App() {
  const kanjiSyncService = new KanjiSyncService();
  useEffect(() => {
    kanjiSyncService.initialSync().catch(console.error);

    const handleOnline = () => {
      kanjiSyncService.incrementalSync().catch(console.error);
    };

    window.addEventListener("online", handleOnline);

    return () => {
      window.removeEventListener("online", handleOnline);
    };
  }, []);

  return (
    <>
      <NotificationProvider />

      <ConfirmProvider>
        <Alert variant="destructive">
          <AlertTitle>Lỗi</AlertTitle>

          <AlertDescription>Không thể tải dữ liệu.</AlertDescription>
        </Alert>

        <Dialog>
          <DialogTrigger
            render={
              <button className="rounded-lg bg-blue-500 px-4 py-2 text-white">
                Mở Dialog
              </button>
            }
          />

          <DialogContent>
            <DialogHeader>
              <DialogTitle>Tiêu đề</DialogTitle>

              <DialogDescription>Mô tả nội dung</DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </ConfirmProvider>
    </>
  );
}

export default App;
