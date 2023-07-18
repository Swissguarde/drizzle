import { create } from "zustand";

interface AuthModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  view: "login" | "signup" | "resetPassword";
  changeView: (newView: AuthModalState["view"]) => void;
}

const useAuthModal = create<AuthModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
  view: "signup",
  changeView: (newView: AuthModalState["view"]) => set({ view: newView }),
}));

export default useAuthModal;
