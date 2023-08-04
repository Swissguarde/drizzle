import { create } from "zustand";

interface UtilityModalState {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
}

const useUtilityModal = create<UtilityModalState>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useUtilityModal;
