"use client";

import { Star } from "@phosphor-icons/react";

interface StarsProps {
  rating: number;
  reviews?: number;
}

export function Stars({ rating, reviews }: StarsProps) {
  const rounded = Math.round(rating);

  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star
          key={i}
          size={13}
          weight={i <= rounded ? "fill" : "regular"}
          color={i <= rounded ? "#B8976A" : "#D1D5DB"}
        />
      ))}
      <span className="ml-0.5 text-xs text-brand-muted">{rating}</span>
      {reviews !== undefined && (
        <span className="text-xs text-brand-muted">({reviews})</span>
      )}
    </div>
  );
}
