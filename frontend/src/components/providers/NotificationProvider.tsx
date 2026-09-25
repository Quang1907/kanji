import { Toaster } from "sonner";
import { useTheme } from "@/hooks/useTheme";

export default function NotificationProvider() {
  const { theme } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={theme}
      richColors
      closeButton
      expand={false}
      duration={4000}
      visibleToasts={4}
      toastOptions={{
        classNames: {
          toast: "group toast rounded-xl shadow-lg",
          title: "font-semibold",
          description: "text-sm",
        },
      }}
    />
  );
}
