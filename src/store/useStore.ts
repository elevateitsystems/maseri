import { create } from 'zustand';

interface AppState {
  cartCount: number;
  incrementCart: () => void;
  decrementCart: () => void;
  resetCart: () => void;
}

export const useStore = create<AppState>((set) => ({
  cartCount: 0,
  incrementCart: () => set((state) => ({ cartCount: state.cartCount + 1 })),
  decrementCart: () => set((state) => ({ cartCount: Math.max(0, state.cartCount - 1) })),
  resetCart: () => set({ cartCount: 0 }),
}));
