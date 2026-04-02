"use client";

import { useEffect, useState, useCallback } from "react";
import { Check } from "@phosphor-icons/react";
import type { Product } from "@/types";

interface CartToastItem {
  id: number;
  product: Product;
  ts: number;
}

let listeners: ((item: CartToastItem) => void)[] = [];
let counter = 0;

export function showCartToast(product: Product) {
  const item: CartToastItem = { id: ++counter, product, ts: Date.now() };
  listeners.forEach((fn) => fn(item));
}

export function CartToastContainer() {
  const [items, setItems] = useState<CartToastItem[]>([]);

  const addItem = useCallback((item: CartToastItem) => {
    setItems((prev) => [...prev, item]);
    setTimeout(() => {
      setItems((prev) => prev.filter((i) => i.id !== item.id));
    }, 3000);
  }, []);

  useEffect(() => {
    listeners.push(addItem);
    return () => {
      listeners = listeners.filter((fn) => fn !== addItem);
    };
  }, [addItem]);

  if (items.length === 0) return null;

  return (
    <div className="fixed bottom-20 right-4 z-[300] flex flex-col gap-2 md:bottom-6">
      {items.map((item) => (
        <div
          key={item.id}
          className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.12)] backdrop-blur-sm"
          style={{ animation: "toastIn 0.3s ease" }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={item.product.img}
            alt=""
            className="h-12 w-12 shrink-0 rounded-lg object-cover"
          />
          <div className="min-w-0">
            <div className="truncate text-sm font-medium text-foreground">
              {item.product.name}
            </div>
            <div className="flex items-center gap-1 text-xs text-success">
              <Check size={12} weight="bold" />
              Добавлен в корзину
            </div>
          </div>
        </div>
      ))}
      <style>{`@keyframes toastIn{from{transform:translateX(100%);opacity:0}to{transform:translateX(0);opacity:1}}`}</style>
    </div>
  );
}
