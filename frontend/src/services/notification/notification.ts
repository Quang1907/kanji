import { toast, type ExternalToast } from "sonner";

type ToastOptions = ExternalToast;

export const notification = {
  success(message: string, options?: ToastOptions) {
    return toast.success(message, options);
  },

  error(message: string, options?: ToastOptions) {
    return toast.error(message, options);
  },

  warning(message: string, options?: ToastOptions) {
    return toast.warning(message, options);
  },

  info(message: string, options?: ToastOptions) {
    return toast.info(message, options);
  },

  loading(message: string, options?: ToastOptions) {
    return toast.loading(message, options);
  },

  promise<T>(
    promise: Promise<T>,
    messages: {
      loading: string;
      success: string;
      error: string;
    },
  ) {
    return toast.promise(promise, messages);
  },

  dismiss(id?: string | number) {
    toast.dismiss(id);
  },

  dismissAll() {
    toast.dismiss();
  },
};

// ======notification.loading()======

// Sử dụng khi bạn có thể tự quản lý việc dismiss toast thủ công.
// Rất hữu ích khi bạn cần thêm logic
// (ví dụ: gọi API, đợi API xong mới dismiss).

// const toastId = notification.loading(
//   "Đang lưu Kanji...",
// );

// try {
//   await createKanji(data);

//   notification.dismiss(toastId);

//   notification.success(
//     "Lưu Kanji thành công!",
//   );
// } catch {
//   notification.dismiss(toastId);

//   notification.error(
//     "Lưu Kanji thất bại!",
//   );

// ======notification.promise()======
// Tự quản lý trạng thái Loading → Success hoặc Error của một Promise.
// notification.promise<T>(
//   promise: Promise<T>,
//   messages: {
//     loading: string;
//     success: string;
//     error: string;
//   },
// )
// Ví dụ
// const request = apiClient("/kanji", {
//   method: "POST",
//   body: data,
// });

// notification.promise(request, {
//   loading: "Đang thêm Kanji...",
//   success: "Thêm Kanji thành công!",
//   error: "Thêm Kanji thất bại!",
// });
