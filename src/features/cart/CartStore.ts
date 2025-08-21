import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  id: string;
  name: string;
  image?: string;
  price: number;
  qty: number;
};

type CartState = {
  lines: CartLine[];
  add: (line: Omit<CartLine, "qty">, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  totalQty: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      lines: [],
      add: (line, qty = 1) =>
        set((s) => {
          const found = s.lines.find((x) => x.id === line.id);
          return {
            lines: found
              ? s.lines.map((x) =>
                  x.id === line.id ? { ...x, qty: x.qty + qty } : x
                )
              : [...s.lines, { ...line, qty }],
          };
        }),
      remove: (id) =>
        set((s) => ({ lines: s.lines.filter((x) => x.id !== id) })),
      setQty: (id, qty) =>
        set((s) => ({
          lines: s.lines.map((x) =>
            x.id === id ? { ...x, qty: Math.max(1, qty) } : x
          ),
        })),
      clear: () => set({ lines: [] }),
      totalQty: () => get().lines.reduce((acc, l) => acc + l.qty, 0),
      subtotal: () => get().lines.reduce((acc, l) => acc + l.qty * l.price, 0),
    }),
    { name: "jomi_cart" }
  )
);
