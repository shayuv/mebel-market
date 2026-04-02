# Sprint 3 — Bugfix: ревью #2

**Цель:** Исправить верифицированные баги из `review-2-buglist.md`
**Агент:** Build
**Приоритет:** P0 (блокирует пресейл)
**Оценка:** ~6–8 часов

---

## Источник

Файл: `/home/shevket/Загрузки/review-2-buglist.md`
Верификация Architect: 11 багов подтверждены, 7 уже починены.

---

## Волна 1 — Критические (делать первыми)

### B02. Hero — обрезка на мобилке

**Файл:** `src/components/home/HeroSlider.tsx`

**Что сделать:**
- Высота контейнера: `max-sm:h-[240px]` → `max-sm:h-[300px]`
- Ценовой бейдж (div с `slide.price`): добавить `max-sm:hidden`
- Кнопки ← → (обе `<button>` с `CaretLeft`/`CaretRight`): добавить `max-sm:hidden`
- Counter `01 / 03` (span с `text-[13px]`): добавить `max-sm:hidden`
- Отступы текстового блока: `max-sm:bottom-6` → `max-sm:bottom-4`, `max-sm:left-6` → `max-sm:left-4`

---

### B03. AnimateOnScroll — зависает при быстром скролле

**Файл:** `src/components/shared/AnimateOnScroll.tsx`

**Что сделать:**
Изменить параметры IntersectionObserver:
```
threshold: 0.1  →  threshold: 0.01
rootMargin: "0px 0px -50px 0px"  →  rootMargin: "200px 0px -40px 0px"
```

`rootMargin: "200px"` сверху = триггер за 200px до viewport, ловит быстрый скролл.
`threshold: 0.01` = срабатывает при 1% видимости.

---

### B04. Слайдер — наложение текста при смене слайда

**Файл:** `src/components/home/HeroSlider.tsx`

**Что сделать:**
Разделить transition фона и текста. Сейчас один div с `opacity` делает всё. Нужно:

1. Фоновое изображение (img + gradient): transition `opacity 0.7s ease`
2. Текстовый блок (div с `bottom-12 left-12`): **отдельный transition**:
   - Входящий (i === cur): `opacity 0.5s ease 0.3s, transform 0.5s ease 0.3s` (появляется С задержкой 0.3s)
   - Уходящий (i !== cur): `opacity 0.25s ease, transform 0.25s ease` (исчезает БЫСТРО)
   - Добавить `transform: translateY(12px)` для неактивного, `translateY(0)` для активного
   - Добавить `pointerEvents: i === cur ? 'auto' : 'none'`

Это даёт каскадный эффект: фон сменился → текст плавно появляется.

---

### B04b. Bento — текст нечитаем на фото

**Файл:** `src/components/home/BentoCategories.tsx`

**Что сделать в `BentoCard`:**
Заменить текущий gradient overlay на более сильную подложку под текстом:

1. В блоке `<div className="absolute bottom-0 left-0 right-0 p-[18px]">` — добавить фон:
   ```
   background: linear-gradient(to top, rgba(0,0,0,0.55) 0%, rgba(0,0,0,0.3) 60%, transparent 100%)
   ```
   Применить через `style={{}}` на этот div.
   Убрать старый gradient overlay (div с `absolute inset-0 bg-gradient-to-b ...`) для lifestyle карточек.

2. Добавить `drop-shadow-[0_1px_3px_rgba(0,0,0,0.5)]` к тексту названия.

3. **То же самое** для `MobileCard` — аналогичная подложка.

---

### B04c. ProductCard — мелкий текст

**Файл:** `src/components/product/ProductCard.tsx`

**Что сделать (только размеры шрифтов):**
```
Категория:  text-[11px] → text-xs       (12px)
Название:   text-[13px] h-9 → text-sm h-10  (14px)
Кнопка:     text-[13px] → text-sm       (14px)
```

Найти строки:
- `text-[11px] uppercase` → заменить на `text-xs uppercase`
- `text-[13px] font-medium leading-snug` (ссылка названия) → `text-sm font-medium leading-snug`, `h-9` → `h-10`
- `text-[13px] font-semibold` (кнопка «В корзину») → `text-sm font-semibold`

---

### B05. Поиск — не подставляет query из URL

**Файл:** `src/app/search/page.tsx`

**Что сделать:**
1. Добавить `import { useSearchParams } from "next/navigation";`
2. Получить query: `const searchParams = useSearchParams();` + `const initialQuery = searchParams.get('q') || "";`
3. Инициализировать state: `const [query, setQuery] = useState(initialQuery);`
4. Добавить `useEffect` для синхронизации при изменении URL:
   ```tsx
   useEffect(() => {
     const q = searchParams.get('q') || '';
     if (q && q !== query) setQuery(q);
   }, [searchParams]);
   ```
5. Обернуть весь контент в `<Suspense fallback={...}>` — `useSearchParams` в App Router требует Suspense boundary. Вынести содержимое в отдельный клиентский компонент `SearchContent`, а `SearchPage` оставить как обёртку с `<Suspense>`.

---

### B08. Footer — битые slug'и каталога

**Файл:** `src/components/layout/Footer.tsx`

**Что сделать:**
Заменить href'ы в колонке «Каталог»:
```
"/catalog/divany"   → "/catalog/divany-i-kresla"
"/catalog/shkafy"   → "/catalog/shkafy-i-stellazhi"
"/catalog/krovati"  → "/catalog/krovati-i-matrace"
"/catalog/kuhni"    → "/catalog/kuhni"  (этот OK)
"/catalog/stoly"    → "/catalog/stoly-i-stulya"
"/catalog/detskaya" → "/catalog/detskaya"  (этот OK)
"/catalog/dekor"    → "/catalog/dekor-i-tekstil"
```

---

### B09. Галерея товара — все фото одинаковые

**Файл:** `src/app/catalog/[category]/[slug]/page.tsx`

**Что сделать:**
Заменить `galleryImages` (сейчас один URL с разными w/h) на массив разных Unsplash ID:

```ts
const galleryImages = [
  product.img,
  `https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=800&h=800&fit=crop`,
  `https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=800&h=800&fit=crop`,
  `https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=800&h=800&fit=crop`,
];
```

Это моковые фото — не идеально совпадают с товаром, но визуально разные. Для продакшена нужны реальные фото каждого товара.

---

## Волна 2 — Серьёзные (после волны 1)

### B12. MobileBottomBar — «Профиль» → `#`

**Файл:** `src/components/layout/MobileBottomBar.tsx`

**Что сделать:**
- `href: "#"` → `href: "/profile"`
- Создать заглушку `src/app/profile/page.tsx` — заголовок «Личный кабинет» + текст «Скоро здесь появится личный кабинет» + CTA на каталог

---

### B18. Бытовая техника — 0 товаров

**Файл:** `src/data/products.ts`

**Что сделать (на выбор — одно из двух):**

**Вариант A (рекомендую):** Добавить 2 мок-товара:
```ts
{
  id: 13,
  name: "Холодильник Нордик двухкамерный",
  slug: "holodilnik-nordic",
  price: 42990,
  oldPrice: 54990,
  rating: 4.5,
  reviews: 34,
  img: "https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?w=500&h=500&fit=crop",
  badge: "-22%",
  cat: "Бытовая техника",
  catSlug: "bytovaya-tehnika",
  inStock: true,
  brand: "HomeStyle",
  material: "Нержавеющая сталь",
  description: "Двухкамерный холодильник с системой No Frost...",
  specs: { ... }
},
{
  id: 14,
  name: "Стиральная машина Аква 8 кг",
  slug: "stiralnaya-mashina-aqua",
  price: 28990,
  ...
}
```

**Вариант B:** Скрыть категорию — убрать из `categoryPages` и `menuData` запись с `slug: "bytovaya-tehnika"`.

---

### B20. Похожие товары — мало

**Файл:** `src/app/catalog/[category]/[slug]/page.tsx`

**Что сделать:**
Расширить выборку: если в текущей категории < 4 товаров, добрать из других:

```ts
let relatedProducts = products
  .filter((p) => p.catSlug === product.catSlug && p.id !== product.id)
  .slice(0, 4);

if (relatedProducts.length < 4) {
  const extra = products
    .filter((p) => p.id !== product.id && !relatedProducts.some(r => r.id === p.id))
    .slice(0, 4 - relatedProducts.length);
  relatedProducts = [...relatedProducts, ...extra];
}
```

---

## Чеклист перед «Готово»

- [ ] `npm run build` — без ошибок
- [ ] Проверить мобилку 375px: Hero, header, bento, ProductCard
- [ ] Быстрый скролл главной — все секции появляются
- [ ] Слайдер: текст не наслаивается при смене
- [ ] `/search?q=диван` — инпут заполнен, результаты отфильтрованы
- [ ] Footer ссылки → реальные страницы каталога (не 404)
- [ ] Страница товара: 4 разных фото в галерее
- [ ] Bento: текст читаем на всех карточках

---

## НЕ трогать (уже работает)

Эти баги из баглиста **уже починены** — не тратить время:
- B01 (bento responsive), B10 (табы), B11 (checkout), B14 (ProductCard width), B15 (карта OSM), B16 (пульсация пинов), B19 (кнопки ♡/⇆ на товаре)
