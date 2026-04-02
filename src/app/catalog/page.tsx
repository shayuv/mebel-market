import Link from "next/link";
import { categoryPages } from "@/data/products";
import { products } from "@/data/products";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";

export default function CatalogPage() {
  return (
    <div className="mx-auto max-w-[1280px] px-6 pb-20 md:pb-8">
      <Breadcrumbs items={[{ label: "Каталог" }]} />
      <h1 className="font-heading text-3xl font-bold text-foreground">
        Каталог мебели
      </h1>
      <p className="mt-2 text-base text-brand-muted">
        Выберите категорию и найдите идеальную мебель для вашего дома
      </p>
      <div className="mt-8 grid gap-5 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {categoryPages.map((cat) => {
          const count = products.filter((p) => p.catSlug === cat.slug).length;
          return (
            <Link
              key={cat.slug}
              href={`/catalog/${cat.slug}`}
              className="group relative block cursor-pointer overflow-hidden rounded-2xl"
            >
              <div className="aspect-[4/3] overflow-hidden">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <h2 className="mt-1 text-lg font-bold text-white">{cat.name}</h2>
                <p className="mt-1 text-xs text-white/70 line-clamp-2">
                  {cat.description}
                </p>
                <span className="mt-2 inline-block text-xs text-white/50">
                  {count} товаров
                </span>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
