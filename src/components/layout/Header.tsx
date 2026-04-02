"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  Heart,
  ArrowLeftRight,
  ShoppingBag,
  User,
  MapPin,
  Phone,
  X,
} from "lucide-react";
import { MegaMenu } from "@/components/layout/MegaMenu";
import { useCart } from "@/lib/context/CartContext";
import { useFavorites } from "@/lib/context/FavoritesContext";
import { useCompare } from "@/lib/context/CompareContext";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [menuIdx, setMenuIdx] = useState(0);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { totalCount: cartCount } = useCart();
  const { count: favCount } = useFavorites();
  const { count: compareCount } = useCompare();
  const router = useRouter();
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [searchOpen]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchOpen(false);
    }
  };

  return (
    <header
      className={`sticky top-0 z-[100] transition-all duration-300 ${
        scrolled
          ? "border-b border-brand-border bg-[rgba(250,248,245,0.97)] backdrop-blur-[20px]"
          : "border-b border-transparent bg-background"
      }`}
    >
      <div className="mx-auto max-w-[1280px] px-4 sm:px-6">
        {/* Topline — desktop only */}
        <div className="hidden items-center justify-between border-b border-brand-border py-1.5 text-[13px] text-brand-muted md:flex">
          <div className="flex gap-5">
            <span className="flex items-center gap-1 text-brand-muted">
              <MapPin size={14} />
              Москва
            </span>
            <Link href="/delivery" className="text-brand-muted transition-colors hover:text-terracotta">
              Доставка
            </Link>
            <Link href="/contacts" className="text-brand-muted transition-colors hover:text-terracotta">
              Магазины
            </Link>
            <Link href="/payment" className="text-brand-muted transition-colors hover:text-terracotta">
              Для бизнеса
            </Link>
          </div>
          <div className="flex items-center gap-4">
            <span>Ежедневно 9:00–22:00</span>
            <span className="flex items-center gap-1 text-sm font-semibold text-foreground">
              <Phone size={14} />
              +7 (800) 555-35-35
            </span>
          </div>
        </div>

        {/* Main row */}
        <div className="relative flex items-center gap-2 py-2.5 sm:gap-4 sm:py-3">
          {/* Logo */}
          <Link href="/" className="font-heading shrink-0 text-[20px] font-extrabold tracking-tight text-foreground sm:text-[26px]">
            МЕБЕЛЬ<span className="text-terracotta">.маркет</span>
          </Link>

          {/* Catalog button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="flex shrink-0 items-center gap-2 rounded-xl px-3 py-2 text-sm font-semibold text-white transition-colors duration-200 sm:px-5 sm:py-2.5"
            style={{
              background: menuOpen ? "#C4704B" : "#2D2926",
            }}
          >
            <div className="flex w-4 flex-col gap-[3px]">
              <span
                className="block h-0.5 rounded-sm bg-white transition-all duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(45deg) translate(3.5px, 3.5px)"
                    : "none",
                }}
              />
              <span
                className="block h-0.5 rounded-sm bg-white transition-opacity duration-200"
                style={{ opacity: menuOpen ? 0 : 1 }}
              />
              <span
                className="block h-0.5 rounded-sm bg-white transition-all duration-300"
                style={{
                  transform: menuOpen
                    ? "rotate(-45deg) translate(3.5px, -3.5px)"
                    : "none",
                }}
              />
            </div>
            <span className="hidden sm:inline">Каталог</span>
          </button>

          {/* Desktop search — always visible */}
          <form
            onSubmit={handleSearch}
            className="hidden flex-1 items-center gap-2 rounded-xl bg-surface px-4 py-0 md:flex"
          >
            <Search size={18} className="text-brand-muted" />
            <input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Найти мебель, декор и товары для дома"
              className="flex-1 border-none bg-transparent py-[11px] text-sm text-foreground outline-none placeholder:text-brand-muted"
            />
            <button
              type="submit"
              className="cursor-pointer rounded-[10px] border-none bg-terracotta px-[18px] py-2 text-[13px] font-semibold text-white"
            >
              Найти
            </button>
          </form>

          {/* Mobile search icon */}
          <button
            onClick={() => setSearchOpen(true)}
            className="ml-auto flex h-10 w-10 items-center justify-center rounded-xl bg-surface text-foreground md:hidden"
          >
            <Search size={20} />
          </button>

          {/* Action icons — desktop */}
          <div className="hidden items-center gap-1 lg:flex">
            {[
              { icon: Heart, label: "Избранное", count: favCount, href: "/favorites" },
              { icon: ArrowLeftRight, label: "Сравнение", count: compareCount, href: "/compare" },
              { icon: ShoppingBag, label: "Корзина", count: cartCount, href: "/cart" },
            ].map((item, i) => (
              <Link
                key={i}
                href={item.href}
                className="relative flex cursor-pointer flex-col items-center rounded-xl px-2.5 py-1.5 text-foreground transition-colors hover:text-terracotta"
              >
                <item.icon size={20} strokeWidth={1.8} />
                <span className="mt-0.5 text-[10px] text-brand-muted">{item.label}</span>
                {item.count > 0 && (
                  <span className="absolute right-1 top-0.5 flex min-w-[16px] items-center justify-center rounded-full bg-terracotta px-1 text-[10px] font-bold text-white">
                    {item.count}
                  </span>
                )}
              </Link>
            ))}
          </div>

          {/* Profile — desktop */}
          <div className="hidden cursor-pointer flex-col items-center rounded-xl px-2.5 py-1.5 lg:flex">
            <User size={20} strokeWidth={1.8} className="text-foreground" />
            <span className="mt-0.5 text-[10px] text-brand-muted">Войти</span>
          </div>

          {/* MegaMenu */}
          <MegaMenu
            open={menuOpen}
            onClose={() => setMenuOpen(false)}
            activeIdx={menuIdx}
            setActiveIdx={setMenuIdx}
          />
        </div>
      </div>

      {/* Mobile search overlay */}
      {searchOpen && (
        <div className="fixed inset-0 z-[200] bg-background md:hidden">
          <div className="flex items-center gap-3 border-b border-brand-border px-4 py-3">
            <form onSubmit={handleSearch} className="flex flex-1 items-center gap-2 rounded-xl bg-surface px-3">
              <Search size={18} className="shrink-0 text-brand-muted" />
              <input
                ref={searchInputRef}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Поиск..."
                className="flex-1 border-none bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-brand-muted"
              />
            </form>
            <button
              onClick={() => setSearchOpen(false)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-foreground"
            >
              <X size={20} />
            </button>
          </div>
          <div className="px-4 py-6 text-center text-sm text-brand-muted">
            Введите запрос и нажмите Enter
          </div>
        </div>
      )}
    </header>
  );
}
