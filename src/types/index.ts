export interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  oldPrice: number | null;
  rating: number;
  reviews: number;
  img: string;
  badge: string | null;
  cat: string;
  catSlug: string;
  description?: string;
  colors?: ProductColor[];
  sizes?: string[];
  inStock?: boolean;
  material?: string;
  brand?: string;
  specs?: Record<string, string>;
}

export interface ProductColor {
  name: string;
  hex: string;
}

export interface CategoryPage {
  slug: string;
  name: string;
  icon: string;
  description: string;
  image: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  slug: string;
  name: string;
  icon: string;
}

export interface Category {
  name: string;
  img: string;
  style: "lifestyle" | "product";
  sub?: string;
  cta?: string;
  size?: "wide" | "tall";
  badge?: string;
}

export interface MenuCategory {
  icon: string;
  name: string;
  slug: string;
  subs: string[];
}

export interface HeroSlide {
  title: string;
  sub: string;
  cta: string;
  price: string;
  img: string;
}

export interface SidePromo {
  title: string;
  sub: string;
  color: string;
  accent: string;
  img: string;
}

export interface ShoppablePin {
  x: number;
  y: number;
  name: string;
  price: string;
}

export interface Advantage {
  icon: string;
  title: string;
  subtitle: string;
}

export interface Review {
  id: number;
  author: string;
  rating: number;
  text: string;
  date: string;
  photos?: string[];
  pros?: string;
  cons?: string;
}

export interface FilterState {
  priceMin: number;
  priceMax: number;
  brands: string[];
  materials: string[];
  colors: string[];
  inStock: boolean;
  onSale: boolean;
}

export type SortOption =
  | "popular"
  | "price-asc"
  | "price-desc"
  | "new"
  | "rating";

export type GridView = "grid-2" | "grid-3" | "grid-4";
