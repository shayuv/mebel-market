"use client";

import { Star } from "lucide-react";

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
          className={
            i <= rounded ? "fill-gold text-gold" : "fill-gray-300 text-gray-300"
          }
        />
      ))}
      <span className="ml-0.5 text-xs text-brand-muted">{rating}</span>
      {reviews !== undefined && (
        <span className="text-xs text-brand-muted">({reviews})</span>
      )}
    </div>
  );
}
