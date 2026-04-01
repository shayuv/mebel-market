"use client";

import { createContext, useContext, useState, useCallback, type ReactNode } from "react";
import type { Product } from "@/types";

interface CompareContextType {
  items: Product[];
  toggle: (product: Product) => void;
  isInCompare: (productId: number) => boolean;
  clear: () => void;
  count: number;
}

const CompareContext = createContext<CompareContextType | null>(null);

export function CompareProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<Product[]>([]);

  const toggle = useCallback((product: Product) => {
    setItems((prev) => {
      const exists = prev.find((p) => p.id === product.id);
      if (exists) return prev.filter((p) => p.id !== product.id);
      if (prev.length >= 4) return prev;
      return [...prev, product];
    });
  }, []);

  const isInCompare = useCallback(
    (productId: number) => items.some((p) => p.id === productId),
    [items]
  );

  const clear = useCallback(() => setItems([]), []);

  return (
    <CompareContext.Provider value={{ items, toggle, isInCompare, clear, count: items.length }}>
      {children}
    </CompareContext.Provider>
  );
}

export function useCompare() {
  const ctx = useContext(CompareContext);
  if (!ctx) throw new Error("useCompare must be used within CompareProvider");
  return ctx;
}
