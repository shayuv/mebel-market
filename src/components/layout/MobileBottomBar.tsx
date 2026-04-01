"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Grid3X3, ShoppingBag, Heart, User } from "lucide-react";

const navItems = [
  { icon: Home, label: "Главная", href: "/" },
  { icon: Grid3X3, label: "Каталог", href: "/catalog" },
  { icon: ShoppingBag, label: "Корзина", href: "/cart" },
  { icon: Heart, label: "Избранное", href: "/favorites" },
  { icon: User, label: "Профиль", href: "#" },
];

export function MobileBottomBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-brand-border bg-white/95 backdrop-blur-md md:hidden">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive =
            item.href !== "#" && pathname.startsWith(item.href);
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center gap-0.5 px-3 py-1 transition-colors ${
                isActive
                  ? "text-terracotta"
                  : "text-brand-muted"
              }`}
            >
              <item.icon size={22} strokeWidth={isActive ? 2.2 : 1.8} />
              <span className={`text-[10px] ${isActive ? "font-semibold" : ""}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
