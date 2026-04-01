"use client";

import { useFavorites } from "@/lib/context/FavoritesContext";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { ProductCard } from "@/components/product/ProductCard";
import { Heart } from "lucide-react";
import Link from "next/link";

export default function FavoritesPage() {
  const { items } = useFavorites();

  if (items.length === 0) {
    return (
      <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
        <Breadcrumbs items={[{ label: "Избранное" }]} />
        <div className="flex flex-col items-center py-20 text-center">
          <Heart size={64} className="text-brand-border" />
          <h1 className="mt-6 font-heading text-2xl font-bold text-foreground">Избранное пусто</h1>
          <p className="mt-2 text-brand-muted">Добавьте товары, нажав на сердечко</p>
          <Link
            href="/catalog"
            className="mt-6 rounded-xl bg-terracotta px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-terracotta/90"
          >
            Перейти в каталог
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Избранное" }]} />
      <h1 className="font-heading text-2xl font-bold text-foreground">
        Избранное <span className="text-brand-muted">({items.length})</span>
      </h1>
      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {items.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}
