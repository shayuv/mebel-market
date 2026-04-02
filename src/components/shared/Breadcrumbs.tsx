"use client";

import Link from "next/link";
import { CaretRight, House } from "@phosphor-icons/react";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export function Breadcrumbs({ items }: BreadcrumbsProps) {
  return (
    <nav className="mb-5 flex items-center gap-1.5 text-sm text-brand-muted">
      <Link
        href="/"
        className="flex items-center gap-1 text-brand-muted hover:text-terracotta transition-colors"
      >
        <House size={14} weight="regular" />
        <span className="hidden sm:inline">Главная</span>
      </Link>
      {items.map((item, i) => (
        <span key={i} className="flex items-center gap-1.5">
          <CaretRight size={14} weight="regular" className="text-brand-border" />
          {item.href ? (
            <Link
              href={item.href}
              className="text-brand-muted hover:text-terracotta transition-colors"
            >
              {item.label}
            </Link>
          ) : (
            <span className="text-foreground font-medium">{item.label}</span>
          )}
        </span>
      ))}
    </nav>
  );
}
