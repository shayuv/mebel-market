# Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (fonts, metadata)
│   ├── page.tsx                # Главная
│   ├── catalog/
│   │   ├── page.tsx            # Каталог (верхний уровень)
│   │   └── [category]/
│   │       ├── page.tsx        # Подкатегория с фильтрами
│   │       └── [slug]/
│   │           └── page.tsx    # Карточка товара
│   ├── cart/
│   │   └── page.tsx            # Корзина
│   ├── checkout/
│   │   └── page.tsx            # Оформление заказа
│   ├── search/
│   │   └── page.tsx            # Результаты поиска
│   ├── favorites/
│   │   └── page.tsx            # Избранное
│   └── compare/
│       └── page.tsx            # Сравнение
├── components/
│   ├── ui/                     # shadcn/ui components
│   ├── layout/
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── MobileBottomBar.tsx
│   │   └── MegaMenu.tsx
│   ├── product/
│   │   ├── ProductCard.tsx
│   │   ├── ProductGallery.tsx
│   │   └── ProductTabs.tsx
│   ├── catalog/
│   │   ├── FilterDrawer.tsx
│   │   ├── FilterSidebar.tsx
│   │   └── SortBar.tsx
│   ├── home/
│   │   ├── HeroSlider.tsx
│   │   ├── CategoryGrid.tsx
│   │   ├── ProductCarousel.tsx
│   │   ├── ShoppableInterior.tsx
│   │   ├── Advantages.tsx
│   │   └── PromoBlock.tsx
│   ├── cart/
│   │   ├── CartItem.tsx
│   │   └── CartSummary.tsx
│   └── shared/
│       ├── Stars.tsx
│       ├── Badge.tsx
│       ├── QuantityInput.tsx
│       ├── ColorSwatch.tsx
│       ├── RangeSlider.tsx
│       ├── CitySelector.tsx
│       └── Breadcrumbs.tsx
├── data/
│   ├── products.ts             # Моковые товары
│   ├── categories.ts           # Категории + подкатегории
│   └── reviews.ts              # Отзывы
├── types/
│   └── index.ts                # Все типы
└── lib/
    ├── utils.ts                # shadcn cn() + helpers
    └── formatters.ts           # Форматирование цен и т.д.
```
