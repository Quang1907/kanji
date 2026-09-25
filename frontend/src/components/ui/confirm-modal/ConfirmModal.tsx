import { AlertTriangle, CheckCircle, Info, Trash2 } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";

type ConfirmVariant = "danger" | "warning" | "info" | "success";

interface ConfirmModalProps {
  open: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: ConfirmVariant;
  loading?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const variantConfig = {
  danger: {
    icon: Trash2,
    button: "bg-red-600 hover:bg-red-700 text-white",
  },
  warning: {
    icon: AlertTriangle,
    button: "bg-amber-600 hover:bg-amber-700 text-white",
  },
  info: {
    icon: Info,
    button: "bg-blue-600 hover:bg-blue-700 text-white",
  },
  success: {
    icon: CheckCircle,
    button: "bg-emerald-600 hover:bg-emerald-700 text-white",
  },
};

export function ConfirmModal({
  open,
  title,
  description,
  confirmText = "Xác nhận",
  cancelText = "Hủy",
  variant = "danger",
  loading = false,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  const config = variantConfig[variant];
  const Icon = config.icon;

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen && !loading) {
          onCancel();
        }
      }}
    >
      <DialogContent
        className="
          max-w-md rounded-2xl
          border-slate-200
          bg-white dark:border-slate-800
          dark:bg-slate-950
        "
      >
        <DialogHeader>
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 dark:bg-slate-800">
            <Icon className="h-6 w-6 text-slate-700 dark:text-slate-200" />
          </div>

          <DialogTitle className="text-xl">{title}</DialogTitle>

          <DialogDescription className="text-sm leading-6">
            {description}
          </DialogDescription>
        </DialogHeader>

        <DialogFooter className="mt-4 gap-2 sm:gap-2">
          <Button
            type="button"
            variant="outline"
            disabled={loading}
            onClick={onCancel}
          >
            {cancelText}
          </Button>

          <Button
            type="button"
            disabled={loading}
            onClick={onConfirm}
            className={config.button}
          >
            {loading ? "Đang xử lý..." : confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
