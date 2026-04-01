"use client";

import { Heart, ArrowLeftRight, ShoppingCart } from "lucide-react";
import { Stars } from "@/components/shared/Stars";
import { Badge } from "@/components/shared/Badge";
import { formatPrice } from "@/lib/formatters";
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

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group min-w-[228px] max-w-[260px] shrink-0 cursor-pointer overflow-hidden rounded-2xl bg-white transition-all duration-300"
      style={{
        transform: hovered ? "translateY(-4px)" : "none",
        boxShadow: hovered
          ? "0 12px 36px rgba(0,0,0,0.1)"
          : "0 1px 4px rgba(0,0,0,0.04)",
      }}
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface-light">
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
        >
          <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground">
            <Heart size={16} />
          </button>
          <button className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white/90 backdrop-blur-sm text-foreground">
            <ArrowLeftRight size={16} />
          </button>
        </div>
      </div>

      {/* Info */}
      <div className="px-3.5 pb-3.5 pt-3">
        <div className="mb-0.5 text-[11px] uppercase tracking-wide text-brand-muted">
          {product.cat}
        </div>
        <div className="mb-1.5 line-clamp-2 h-9 text-[13px] font-medium leading-snug text-foreground">
          {product.name}
        </div>
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
          className="mt-2.5 flex w-full items-center justify-center gap-2 rounded-xl py-2.5 text-[13px] font-semibold transition-colors duration-300"
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
