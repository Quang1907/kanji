import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./stores/auth.store";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import AppLayout from "./layouts/AppLayout";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import KanjiLearningPage from "./pages/user/KanjiLearningPage";
import ReviewPage from "./pages/user/ReviewPage";
import ProgressPage from "./pages/user/ProgressPage";
import ProfilePage from "./pages/user/ProfilePage";
import SettingsPage from "./pages/user/SettingsPage";
import NotificationProvider from "./components/providers/NotificationProvider";
import { ConfirmProvider } from "./components/providers/ConfirmProvider";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <NotificationProvider />
        <ConfirmProvider>
          <Routes>
            {/* Public Auth Routes */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />

            {/* Protected Learning Routes */}
            <Route element={<ProtectedRoute />}>
              <Route element={<AppLayout />}>
                <Route path="/learn" element={<KanjiLearningPage />} />
                <Route path="/learn/:id" element={<KanjiLearningPage />} />
                <Route path="/review" element={<ReviewPage />} />
                <Route path="/progress" element={<ProgressPage />} />
                <Route path="/profile" element={<ProfilePage />} />
                <Route path="/settings" element={<SettingsPage />} />
              </Route>
            </Route>

            {/* Fallback & Redirects */}
            <Route path="/" element={<Navigate to="/progress" replace />} />
            <Route path="*" element={<Navigate to="/progress" replace />} />
          </Routes>
        </ConfirmProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
