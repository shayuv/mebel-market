"use client";

import { CartProvider } from "@/lib/context/CartContext";
import { FavoritesProvider } from "@/lib/context/FavoritesContext";
import { CompareProvider } from "@/lib/context/CompareContext";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <FavoritesProvider>
        <CompareProvider>
          {children}
        </CompareProvider>
      </FavoritesProvider>
    </CartProvider>
  );
}
