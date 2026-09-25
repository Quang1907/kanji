import type { ReactNode } from "react";
import { ConfirmModal } from "./ConfirmModal";
import { useConfirm } from "@/hooks/useConfirm";

interface ConfirmProviderProps {
  children: ReactNode;
}

export function ConfirmProvider({ children }: ConfirmProviderProps) {
  const { confirm, pending, handleConfirm, handleCancel } = useConfirm();

  return (
    <>
      {children}

      <ConfirmModal
        open={pending !== null}
        title={pending?.options.title ?? ""}
        description={pending?.options.description ?? ""}
        confirmText={pending?.options.confirmText}
        cancelText={pending?.options.cancelText}
        variant={pending?.options.variant}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
}
