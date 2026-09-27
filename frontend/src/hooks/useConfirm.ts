import { useContext } from "react";
import {
  ConfirmContext,
  type ConfirmContextValue,
} from "@/components/providers/ConfirmProvider";

export function useConfirm(): ConfirmContextValue {
  const context = useContext(ConfirmContext);

  if (!context) {
    throw new Error("useConfirm must be used inside ConfirmProvider");
  }

  return context;
}

export default useConfirm;
