import { useNavigate } from "react-router-dom";
import { useAuth } from "@/stores/auth.store";
import { User, Mail, Shield, LogOut, CheckCircle } from "lucide-react";

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-slate-900 px-4 py-8 text-slate-100">
      <div className="mx-auto max-w-xl space-y-6">
        <div className="border-b border-slate-800 pb-4">
          <h1 className="text-2xl font-bold text-white">Hồ sơ cá nhân</h1>
          <p className="text-xs text-slate-400">
            Thông tin tài khoản và bảo mật dữ liệu học tập
          </p>
        </div>

        <div className="rounded-3xl border border-slate-800 bg-slate-800/80 p-8 shadow-xl backdrop-blur-xl space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
              <User className="h-8 w-8" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">
                {user?.name || "Người học"}
              </h2>
              <p className="text-sm text-slate-400">ID: {user?.id}</p>
            </div>
          </div>

          <div className="space-y-3 border-t border-slate-700/60 pt-4">
            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Mail className="h-4 w-4" />
                <span>Email</span>
              </div>
              <span className="font-semibold text-white">{user?.email}</span>
            </div>

            <div className="flex items-center justify-between py-2 text-sm">
              <div className="flex items-center gap-2 text-slate-400">
                <Shield className="h-4 w-4" />
                <span>Vai trò</span>
              </div>
              <span className="rounded-md bg-indigo-500/10 px-2.5 py-0.5 text-xs font-semibold text-indigo-400 border border-indigo-500/20 uppercase">
                {user?.role || "user"}
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-xs text-emerald-400">
            <div className="flex items-center gap-2 font-semibold">
              <CheckCircle className="h-4 w-4" />
              <span>User Data Isolation Active</span>
            </div>
            <p className="mt-1 text-slate-300">
              Tiến độ học (kanji_progress), hàng đợi ôn tập (review_queue) và hàng đợi đồng bộ (sync_queue) đều được cô lập tuyệt đối theo User ID này.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-red-600/20 py-3 font-semibold text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-all active:scale-[0.99]"
          >
            <LogOut className="h-4 w-4" />
            <span>Đăng xuất</span>
          </button>
        </div>
      </div>
    </div>
  );
}
