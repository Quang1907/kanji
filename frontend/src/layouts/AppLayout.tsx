import { Link, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "@/stores/auth.store";
import { useOnlineStatus } from "@/hooks/useOnlineStatus";
import {
  BookOpen,
  RotateCw,
  BarChart2,
  User,
  Settings,
  Wifi,
  WifiOff,
} from "lucide-react";

export default function AppLayout() {
  const { user } = useAuth();
  const isOnline = useOnlineStatus();
  const location = useLocation();

  const navItems = [
    { path: "/learn", label: "Học", icon: BookOpen },
    { path: "/review", label: "Ôn tập", icon: RotateCw },
    { path: "/progress", label: "Tiến độ", icon: BarChart2 },
    { path: "/profile", label: "Hồ sơ", icon: User },
    { path: "/settings", label: "Cài đặt", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="sticky top-0 z-50 border-b border-slate-800 bg-slate-900/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3 sm:px-6">
          <Link to="/progress" className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-600 font-bold text-white shadow-md shadow-indigo-600/30">
              漢
            </div>
            <span className="font-extrabold text-white text-lg tracking-tight">
              Kanji<span className="text-indigo-400">Hub</span>
            </span>
          </Link>

          {/* Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname.startsWith(item.path);
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-2 rounded-xl px-3.5 py-2 text-xs font-semibold transition-all ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-md shadow-indigo-600/20"
                      : "text-slate-400 hover:bg-slate-800 hover:text-white"
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right Status */}
          <div className="flex items-center gap-3">
            <div
              className={`flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium border ${
                isOnline
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                  : "bg-amber-500/10 text-amber-400 border-amber-500/20"
              }`}
              title={isOnline ? "Đang Online" : "Đang Offline - Sử dụng IndexedDB"}
            >
              {isOnline ? (
                <>
                  <Wifi className="h-3 w-3" />
                  <span className="hidden sm:inline">Online</span>
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3" />
                  <span>Offline</span>
                </>
              )}
            </div>

            {user && (
              <Link
                to="/profile"
                className="flex items-center gap-2 rounded-xl bg-slate-800/80 p-1.5 pr-3 text-xs font-medium text-slate-300 hover:bg-slate-800 border border-slate-700/60"
              >
                <div className="flex h-6 w-6 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400 font-bold">
                  {user.name?.charAt(0) || "U"}
                </div>
                <span className="hidden sm:inline">{user.name}</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Main Outlet */}
      <main className="flex-1 pb-16 md:pb-0">
        <Outlet />
      </main>

      {/* Mobile Bottom Navigation Bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex items-center justify-around border-t border-slate-800 bg-slate-900/95 py-2 px-1 backdrop-blur-md md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname.startsWith(item.path);
          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-semibold transition-all ${
                isActive ? "text-indigo-400" : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <Icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
}
