import { useConfirm } from "@/components/providers/ConfirmProvider";

import { notification } from "@/services/notification";

export default function KanjiPage() {
  const { confirm } = useConfirm();

  const handleDelete = async (id: number) => {
    const confirmed = await confirm({
      title: "Xóa Kanji?",
      description: "Dữ liệu Kanji này sẽ bị xóa. Bạn có chắc chắn?",
      confirmText: "Xóa",
      cancelText: "Hủy",
      variant: "danger",
    });

    if (!confirmed) return;

    try {
      await deleteKanji(id);

      notification.success("Xóa Kanji thành công!");
    } catch {
      notification.error("Xóa Kanji thất bại!");
    }
  };

  return null;
}
function deleteKanji(id: number) {
  throw new Error("Function not implemented.");
}
