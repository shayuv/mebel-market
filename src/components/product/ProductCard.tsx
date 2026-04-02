"use client";

import Link from "next/link";
import { Heart, ArrowLeftRight, ShoppingCart } from "lucide-react";
import { Stars } from "@/components/shared/Stars";
import { Badge } from "@/components/shared/Badge";
import { formatPrice } from "@/lib/formatters";
import { useCart } from "@/lib/context/CartContext";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useCompare } from "@/lib/context/CompareContext";
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
      {/* Image */}
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
        {/* Hover action icons */}
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
            <Heart size={16} fill={isFavorite(product.id) ? "currentColor" : "none"} />
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
            <ArrowLeftRight size={16} />
          </button>
        </div>
      </Link>

      {/* Info */}
      <div className="px-3.5 pb-3.5 pt-3">
        <div className="mb-0.5 text-[11px] uppercase tracking-wide text-brand-muted">
          {product.cat}
        </div>
        <Link
          href={`/catalog/${product.catSlug}/${product.slug}`}
          className="mb-1.5 line-clamp-2 block h-9 text-[13px] font-medium leading-snug text-foreground hover:text-terracotta"
        >
          {product.name}
        </Link>
        <Stars rating={product.rating} reviews={product.reviews} />
        <div className="mt-2 flex items-baseline gap-1.5">
          <span className="text-lg font-bold text-foreground">
            {formatPrice(product.price)}
          </span>
          {product.oldPrice && (
            <span className="text-[13px] text-brand-muted line-through">
              {formatPrice(product.oldPrice)}
            </span>
          )}
        </div>
        <button
          onClick={() => addItem(product)}
          className="mt-2.5 flex w-full cursor-pointer items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-colors duration-300"
          style={{
            background: hovered ? "#C4704B" : "#F0EDE8",
            color: hovered ? "#FFFFFF" : "#2D2926",
          }}
        >
          <ShoppingCart size={14} />
          В корзину
        </button>
      </div>
    </div>
  );
}
