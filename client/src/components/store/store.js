import { create } from "zustand"; // Correct named import

// Zustand store to manage authentication state
const useAuthStore = create((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
}));

export default useAuthStore;
