import { notification } from "@/services/notification";
import { normalizeApiError } from "@/services/api/apiError";

export function useNotification() {
  const handleError = async (error: unknown) => {
    const normalized = await normalizeApiError(error);

    notification.error(normalized.message);

    return normalized;
  };

  return {
    success: notification.success,
    error: notification.error,
    warning: notification.warning,
    info: notification.info,
    loading: notification.loading,
    promise: notification.promise,
    dismiss: notification.dismiss,
    handleError,
  };
}

// Sử dụng:
// const { success, handleError } = useNotification();

// try {
//   await createKanji(data);
//   success("Thêm Kanji thành công!");
// } catch (error) {
//   await handleError(error);
// }
