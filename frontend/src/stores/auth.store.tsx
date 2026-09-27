import React, {
  createContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import apiClient from "@/services/api/apiClient";
import axios from "axios";

export interface AuthUser {
  id: number | string;
  email: string;
  name: string;
  role: string;
}

export interface AuthContextType {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string,
    displayName?: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    try {
      const saved = localStorage.getItem("user");
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const logout = useCallback(async () => {
    try {
      if (navigator.onLine && localStorage.getItem("accessToken")) {
        await apiClient.post("/auth/logout");
      }
    } catch {
      // Ignore network errors on logout
    } finally {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
      setUser(null);
    }
  }, []);

  const refreshUser = useCallback(async () => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setUser(null);
      setIsLoading(false);
      return;
    }

    try {
      const response = await apiClient.get<{
        success: boolean;
        data: { user: AuthUser };
      }>("/auth/me");

      if (response.data?.success && response.data.data?.user) {
        const currentUser = response.data.data.user;
        setUser(currentUser);
        localStorage.setItem("user", JSON.stringify(currentUser));
      }
    } catch (error: unknown) {
      if (axios.isAxiosError(error) && error.response?.status === 401) {
        localStorage.removeItem("accessToken");
        localStorage.removeItem("user");
        setUser(null);
      }
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    refreshUser();

    const handleAutoLogout = () => {
      setUser(null);
    };

    window.addEventListener("auth:logout", handleAutoLogout);
    return () => {
      window.removeEventListener("auth:logout", handleAutoLogout);
    };
  }, [refreshUser]);

  const login = async (email: string, password: string) => {
    const response = await apiClient.post<{
      success: boolean;
      data: {
        user: AuthUser;
        accessToken: string;
      };
    }>("/auth/login", { email, password });

    if (response.data?.success) {
      const { user: loggedInUser, accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(loggedInUser));
      setUser(loggedInUser);
    } else {
      throw new Error("Login failed");
    }
  };

  const register = async (
    username: string,
    email: string,
    password: string,
    displayName?: string
  ) => {
    const response = await apiClient.post<{
      success: boolean;
      data: {
        user: AuthUser;
        accessToken: string;
      };
    }>("/auth/register", {
      username,
      email,
      password,
      displayName,
    });

    if (response.data?.success) {
      const { user: registeredUser, accessToken } = response.data.data;
      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("user", JSON.stringify(registeredUser));
      setUser(registeredUser);
    } else {
      throw new Error("Registration failed");
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        refreshUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export { useAuth } from "@/hooks/useAuth";
