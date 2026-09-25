import { AlertCircle, X } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface ErrorAlertProps {
  message: string;
  title?: string;
  onClose?: () => void;
}

export function ErrorAlert({
  message,
  title = "Đã xảy ra lỗi",
  onClose,
}: ErrorAlertProps) {
  if (!message) return null;

  return (
    <Alert
      variant="destructive"
      className="
        relative rounded-xl
        animate-in fade-in-0 slide-in-from-top-2
        duration-300
      "
    >
      <AlertCircle className="h-4 w-4" />

      <AlertTitle>{title}</AlertTitle>

      <AlertDescription>{message}</AlertDescription>

      {onClose && (
        <button
          type="button"
          aria-label="Đóng thông báo lỗi"
          onClick={onClose}
          className="
            absolute right-3 top-3 rounded-md p-1
            text-red-500 transition
            hover:bg-red-100
            dark:hover:bg-red-900/40
          "
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </Alert>
  );
}
