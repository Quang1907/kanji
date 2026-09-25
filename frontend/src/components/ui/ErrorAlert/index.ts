export { ErrorAlert } from "./ErrorAlert";
// Sau đó có thể import rất gọn:
// import { ErrorAlert } from "@/components/ui/ErrorAlert";
// 4. Sử dụng cơ bản
// <ErrorAlert message="Không thể tải danh sách Kanji." />
// const [error, setError] = useState("");

// return (
//   <>
//     {error && (
//       <ErrorAlert
//         message={error}
//         onClose={() => setError("")}
//       />
//     )}
//   </>
// );

// Hiển thị lỗi từ backend
// const [error, setError] = useState<string | null>(null);

// {error && (
//   <ErrorAlert
//     message={error}
//     onClose={() => setError(null)}
//   />
// )}
