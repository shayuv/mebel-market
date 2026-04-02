"use client";

import Link from "next/link";
import { Heart, ArrowsLeftRight, ShoppingCart, Check } from "@phosphor-icons/react";
import { Stars } from "@/components/shared/Stars";
import { Badge } from "@/components/shared/Badge";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/context/CartContext";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useCompare } from "@/lib/context/CompareContext";
import { showCartToast } from "@/components/shared/CartToast";
import type { Product } from "@/types";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

function getBadgeVariant(
  badge: string | null
): "hit" | "new" | "sale" | "default" | null {
  if (!badge) return null;
  if (badge === "Хит") return "hit";
  if (badge === "Новинка") return "new";
  if (badge.startsWith("-")) return "sale";
  return "default";
}

export function ProductCard({ product }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);
  const [added, setAdded] = useState(false);
  const badgeVariant = getBadgeVariant(product.badge);
  const { addItem } = useCart();
  const { toggle: toggleFav, isFavorite } = useFavorites();
  const { toggle: toggleCompare, isInCompare } = useCompare();

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group w-full min-w-0 shrink-0 overflow-hidden rounded-2xl bg-white transition-all duration-300 max-md:max-w-none"
      style={{
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.1)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      <Link
        href={`/catalog/${product.catSlug}/${product.slug}`}
        className="relative block aspect-square overflow-hidden bg-surface-light"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={product.img}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        {badgeVariant && (
          <div className="absolute left-3 top-3">
            <Badge variant={badgeVariant}>{product.badge}</Badge>
          </div>
        )}
        <div
          className="absolute right-2.5 top-2.5 flex flex-col gap-1.5 transition-opacity duration-300"
          style={{ opacity: hovered ? 1 : 0 }}
          onClick={(e) => e.preventDefault()}
        >
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleFav(product);
            }}
            className={`flex h-[34px] w-[34px] items-center justify-center rounded-full backdrop-blur-sm ${
              isFavorite(product.id)
                ? "bg-terracotta text-white"
                : "bg-white/90 text-foreground"
            }`}
          >
            <Heart size={16} weight={isFavorite(product.id) ? "fill" : "regular"} />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              toggleCompare(product);
            }}
            className={`flex h-[34px] w-[34px] items-center justify-center rounded-full backdrop-blur-sm ${
              isInCompare(product.id)
                ? "bg-terracotta text-white"
                : "bg-white/90 text-foreground"
            }`}
          >
            <ArrowsLeftRight size={16} weight="regular" />
          </button>
        </div>
      </Link>

      <div className="px-3.5 pb-3.5 pt-3">
        {/* B04c: increased font size 11px → 12px (text-xs) */}
        <div className="mb-0.5 text-xs uppercase tracking-wide text-brand-muted">
          {product.cat}
        </div>
        {/* B04c: increased font size 13px → 14px (text-sm), h-9 → h-10 */}
        <Link
          href={`/catalog/${product.catSlug}/${product.slug}`}
          className="mb-1.5 line-clamp-2 block h-10 text-sm font-medium leading-snug text-foreground hover:text-terracotta"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-sm text-brand-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        {/* B04c: increased font size 13px → 14px (text-sm) */}
        <button
          onClick={() => {
            addItem(product);
            showCartToast(product);
            setAdded(true);
            setTimeout(() => setAdded(false), 1500);
          }}
          className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-semibold transition-colors duration-300"
          style={{
            background: added ? "#4A7C59" : hovered ? "#C4704B" : "#F0EDE8",
            color: added ? "#FFFFFF" : hovered ? "#FFFFFF" : "#2D2926",
          }}
        >
          {added ? <Check size={14} weight="bold" /> : <ShoppingCart size={14} weight="regular" />}
          {added ? "Добавлено" : "В корзину"}
        </button>
      </div>
    </div>
  );
}
