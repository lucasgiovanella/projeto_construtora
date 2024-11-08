import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface User {
  id: string;
  nome: string;
  email: string;
  cargo: string;
}

interface AuthStore {
  user: User | null;
  isLoading: boolean;
  error: string | null;
  setUser: (user: User | null) => void;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  fetchUserData: () => Promise<void>;
}

export const useAuth = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      isLoading: false,
      error: null,
      setUser: (user) => set({ user }),

      login: async (email: string, password: string) => {
        set({ isLoading: true, error: null });
        try {
          const res = await fetch("http://localhost:3000/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ email, password }),
          });

          if (!res.ok) {
            const data = await res.json();
            throw new Error(data.message);
          }

          const userData = await res.json();
          set({ user: userData.user });
        } catch (error: any) {
          set({ error: error.message });
          throw error;
        } finally {
          set({ isLoading: false });
        }
      },

      logout: async () => {
        try {
          await fetch("http://localhost:3000/auth/logout", {
            method: "POST",
            credentials: "include",
          });
          Cookies.remove("connect.sid");
          set({ user: null });
        } catch (error) {
          console.error("Erro ao fazer logout:", error);
        }
      },

      fetchUserData: async () => {
        try {
          const res = await fetch("http://localhost:3000/auth/user", {
            credentials: "include",
          });

          if (!res.ok) throw new Error("Não autorizado");

          const data = await res.json();
          set({ user: data.user });
        } catch (error) {
          set({ user: null });
          throw error;
        }
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
