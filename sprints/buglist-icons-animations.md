# МЕБЕЛЬ.маркет — Баглист, иконки, анимации

**Сайт:** https://mebel-flame.vercel.app  
**Дата аудита:** 02.04.2026  
**Проверено:** Desktop 1440/1280, Mobile (через viewport)

---

## 1. БАГИ И ПРОБЛЕМЫ

### 1.1 Критические (ломают демо)

| # | Страница | Баг | Что делать |
|---|----------|-----|------------|
| B01 | Главная | **Bento-категории продублированы** — секция «Каталог» с bento-сеткой рендерится два раза подряд | Удалить дубль, оставить одну секцию |
| B02 | Каталог категории | **Грамматика счётчика товаров** — «2 товаров», «1 товаров», «0 товаров». Должно быть: 1 товар, 2 товара, 5 товаров, 0 товаров | Добавить функцию склонения `pluralize(n, ['товар','товара','товаров'])` |
| B03 | Карточка товара | **Все фото в галерее одинаковые** — 4 превью ведут на одно и то же фото (photo-1555041469), разница только в w/h. Для прототипа нужны разные ракурсы | Подобрать 4-5 разных Unsplash-фото на каждый товар (интерьер, деталь, сбоку, с людьми) |
| B04 | Карточка товара | **Только 1 похожий товар** — секция «Похожие товары» показывает всего 1 карточку. Пусто и неубедительно | Показывать минимум 4 товара из той же категории |
| B05 | Бытовая техника | **0 товаров в категории** — категория существует, но пуста. На пресейле клиент кликнет и увидит пустоту | Добавить хотя бы 2-3 мока, либо скрыть категорию |
| B06 | Все страницы | **Эмоджи вместо иконок** — 🛋️🚪🛏️🍳🪑🧒🚿👞🏡⚡ в мега-меню, заголовках категорий, подкатегориях-чипсах. Выглядит дёшево | Заменить на Phosphor SVG-иконки (см. раздел 2) |
| B07 | Footer | **Битые ссылки** — «Рассрочка», «Сборка», «О нас», «Отзывы», «Вакансии» ведут на `#` | Создать страницы-заглушки или убрать из навигации |

### 1.2 Серьёзные (портят впечатление)

| # | Страница | Баг | Что делать |
|---|----------|-----|------------|
| B12 | Фильтры | **Дубль панели фильтров** — на категории видны два блока «Фильтры» (sidebar + дубль для мобильного drawer), оба отрендерены одновременно | Мобильные фильтры рендерить только при открытии drawer, не дублировать в DOM |
| B14 | Контакты | **Плейсхолдер виден пользователю** — текст «Карта магазинов (интеграция Яндекс.Карт)» показан как-есть | Вставить заглушку-изображение карты или iframe OpenStreetMap |

### 1.3 Минорные (полировка)

| # | Страница | Баг | Что делать |
|---|----------|-----|------------|
| B15 | Заголовки категорий | **Эмоджи в H1** — «🛋️ Диваны и кресла», «⚡ Бытовая техника». Эмоджи в заголовке — не профессионально | SVG-иконка рядом с текстом, либо без иконки в H1 |
| B16 | Bento-категория «Комоды» | **Текст «в наличии» без иконки** — синий текст без контекста | Добавить иконку check-circle или убрать |
| B17 | Карточка товара | **Нет табов «Характеристики» и «Отзывы»** — вкладки есть, но переключение не работает, виден только «Описание» | Реализовать переключение, наполнить табы контентом |
| B18 | Карточка товара | **Нет кнопок ♡/⇆/↗** — в ТЗ были иконки «Избранное», «Сравнить», «Поделиться» на карточке товара | Добавить ряд иконок под CTA-кнопками |
| B19 | Все страницы | **Нет анимаций** — секции появляются мгновенно, нет scroll-triggered fade-in, нет stagger на карточках, нет skeleton loading | См. раздел 3 |
| B20 | Главная | **Shoppable интерьер не кликабелен** — точки на фото интерьера не появляются или не работают | Проверить рендер пинов, добавить пульсацию |
| B21 | Footer | **Ссылки «Каталог» в footer ведут на несуществующие URL** — `/catalog/divany` вместо `/catalog/divany-i-kresla` | Привести в соответствие с реальными slug'ами |
| B22 | Мобилка | **Header не адаптивен** — на ширине <768px элементы хедера наползают друг на друга, поиск обрезается | Скрыть топлайн, свернуть поиск в иконку, убрать подписи с иконок |
| B23 | Мобилка | **Bento-сетка не адаптивна** — 5 колонок остаются при любой ширине, карточки сжимаются до нечитаемого размера | На мобилке: 2 колонки, вертикальный стек, «Кухни» — full width |
| B24 | Мобилка | **Боковые промо-карточки hero** — на мобилке правая колонка (300px) не скрывается, ломает layout | Скрыть side-promos на <1024px, оставить только слайдер full-width |
| B25 | Мобилка | **Sidebar фильтров** — 280px sidebar видим постоянно, на мобилке занимает всё пространство | Фильтры — только bottom-sheet drawer на мобилке |

---

## 2. ИКОНКИ — МИГРАЦИЯ НА PHOSPHOR

### 2.1 Почему Phosphor

Phosphor — минималистичные, гибкие (6 весов: thin/light/regular/bold/fill/duotone), 1000+ иконок, MIT-лицензия. Идеально для мебельного магазина — не слишком строгие, не слишком игривые.

### 2.2 Подключение

```bash
npm install @phosphor-icons/react
```

```jsx
import { Armchair, Heart, ShoppingBag, MagnifyingGlass, User, 
         CaretLeft, CaretRight, Truck, ShieldCheck, CreditCard, 
         Wrench, Star, X, Minus, Plus, Check, MapPin, Phone,
         Funnel, SquaresFour, List, ShareNetwork, Trash,
         ArrowLeft, House, ArrowsOutCardinal, Eye,
         Bed, Door, CookingPot, Chair, Baby, Bathtub,
         CoatHanger, PaintBrush, Lightning, Bookcase,
         Package, Tag, Clock, ChatCircleDots, Envelope,
         NavigationArrow, CaretDown, Sliders, SlidersHorizontal
} from "@phosphor-icons/react";
```

### 2.3 Стиль использования

```jsx
// Обычная иконка в интерфейсе
<Heart size={20} weight="regular" color={C.primary} />

// Активная иконка (избранное добавлено)
<Heart size={20} weight="fill" color={C.terracotta} />

// Иконка в header
<ShoppingBag size={22} weight="light" />

// Иконка категории (мега-меню, каталог)
<Armchair size={24} weight="duotone" color={C.terracotta} />

// Иконка в преимуществах
<Truck size={32} weight="duotone" color={C.terracotta} />
```

Вес `duotone` — для крупных декоративных иконок (категории, преимущества).  
Вес `light` или `regular` — для UI-элементов (хедер, кнопки, фильтры).  
Вес `fill` — для активных состояний (выбранное избранное, заполненные звёзды).

### 2.4 Маппинг замен

| Где | Было (эмоджи) | Стало (Phosphor) | Weight |
|-----|---------------|-------------------|--------|
| Меню: Диваны и кресла | 🛋️ | `<Armchair />` | duotone |
| Меню: Шкафы и стеллажи | 🚪 | `<Door />` или `<Bookcase />` | duotone |
| Меню: Кровати и матрасы | 🛏️ | `<Bed />` | duotone |
| Меню: Кухни | 🍳 | `<CookingPot />` | duotone |
| Меню: Столы и стулья | 🪑 | `<Chair />` | duotone |
| Меню: Детская | 🧒 | `<Baby />` | duotone |
| Меню: Ванная | 🚿 | `<Bathtub />` | duotone |
| Меню: Прихожая | 👞 | `<CoatHanger />` | duotone |
| Меню: Декор и текстиль | 🏡 | `<PaintBrush />` | duotone |
| Меню: Бытовая техника | ⚡ | `<Lightning />` | duotone |
| Header: Избранное | SVG heart | `<Heart />` | light / fill |
| Header: Сравнение | SVG arrows | `<ArrowsOutCardinal />` | light |
| Header: Корзина | SVG bag | `<ShoppingBag />` | light |
| Header: Профиль | SVG user | `<User />` | light |
| Header: Поиск | SVG search | `<MagnifyingGlass />` | light |
| Header: Город | 📍 | `<MapPin />` | regular |
| Слайдер: стрелки | SVG chevrons | `<CaretLeft />` `<CaretRight />` | bold |
| Преимущества: Доставка | truck SVG | `<Truck />` | duotone |
| Преимущества: Гарантия | shield SVG | `<ShieldCheck />` | duotone |
| Преимущества: Рассрочка | card SVG | `<CreditCard />` | duotone |
| Преимущества: Сборка | wrench SVG | `<Wrench />` | duotone |
| Рейтинг: звезда | star SVG | `<Star weight="fill" />` | fill (gold) / light (empty) |
| Карточка: Удалить | × | `<X />` | light |
| Карточка: Quick View | eye | `<Eye />` | light |
| Корзина: + − | SVG | `<Plus />` `<Minus />` | regular |
| Фильтры | — | `<Funnel />` `<SlidersHorizontal />` | regular |
| Вид: Сетка / Список | — | `<SquaresFour />` `<List />` | regular |
| Поделиться | — | `<ShareNetwork />` | light |
| Удалить из корзины | — | `<Trash />` | light |
| Bottom bar: Главная | — | `<House />` | regular / fill |
| Bottom bar: Каталог | — | `<SquaresFour />` | regular / fill |
| Подкатегории-чипсы | 📏📐🛏️🪑📦🧊🌊 | Убрать иконки из чипсов, оставить только текст, либо использовать Phosphor thin | — |

### 2.5 Цветовая схема иконок

```
Неактивная иконка: color={C.muted} (#8A8580)
Активная/hover: color={C.terracotta} (#C4704B)
На тёмном фоне: color={C.white}
Duotone primary: color={C.terracotta}  
Рейтинг заполненная: color={C.gold} (#B8976A)
Рейтинг пустая: color="#DDD"
Успех (в наличии): color={C.success} (#4A7C59)
```

---

## 3. АНИМАЦИИ — ЧТО ДОБАВИТЬ

### 3.1 Scroll-triggered появление секций

**Где:** Каждая секция на главной и на всех страницах  
**Что:** fadeInUp — элемент поднимается на 30px и проявляется при попадании в viewport  
**Как:**

```jsx
function AnimateOnScroll({ children, delay = 0, className }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(30px)",
        transition: `opacity 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, 
                     transform 0.6s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`,
      }}
    >
      {children}
    </div>
  );
}
```

**Применение:** обернуть каждый блок:
- Hero → без анимации (видим сразу)
- Bento-категории → `<AnimateOnScroll>`
- Каждая ProductCard → `<AnimateOnScroll delay={index * 0.06}>`
- Shoppable → `<AnimateOnScroll>`
- Advantages → каждая карточка с delay 0 / 0.1 / 0.2 / 0.3
- Promo → `<AnimateOnScroll>`

### 3.2 Stagger-появление карточек товаров

**Где:** Каталог (grid товаров), карусели на главной  
**Что:** Карточки появляются каскадом — первая сразу, каждая следующая +60ms  
**CSS:**

```css
@keyframes cardIn {
  from {
    opacity: 0;
    transform: translateY(24px) scale(0.96);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
```

```jsx
style={{
  animation: visible ? `cardIn 0.5s cubic-bezier(0.22, 1, 0.36, 1) ${index * 0.06}s both` : "none"
}}
```

### 3.3 Hero-слайдер — улучшения

**Текст на слайде:** При смене слайда текст появляется с задержкой, каскадом:
- Ценовой бейдж: delay 0.1s, fadeInUp
- Заголовок: delay 0.2s, fadeInUp (transform: translateY(20px))
- Подзаголовок: delay 0.35s, fadeInUp
- Кнопка: delay 0.5s, fadeInUp + scale(0.9 → 1)

### 3.4 Hover-микроанимации

| Элемент | Эффект | Параметры |
|---------|--------|-----------|
| ProductCard | Карточка поднимается, тень усиливается, фото зумится | `translateY(-6px)`, shadow 0→12px 36px, img `scale(1.06)`, `0.35s ease` |
| ProductCard иконки ♡/⇆ | Появляются справа-сверху | `opacity 0→1`, `translateX(8px)→0`, `0.25s` |
| ProductCard кнопка | Смена фона surface→terracotta | `background + color`, `0.3s` |
| Bento-карточка | Фото зумится, карточка слегка сжимается | img `scale(1.06)`, card `scale(0.985)`, `0.4s` |
| CTA-кнопка | Лёгкое увеличение + усиление тени | `scale(1.03)`, shadow +4px, `0.2s` |
| Ссылка в footer/меню | Цвет → terracotta | `color`, `0.15s` |
| Иконка в header | Фон появляется | `background: C.surface`, `0.2s` |
| Строка фильтра (чекбокс) | Подсветка строки | `background: C.surfaceLight`, `0.15s` |
| Табы (Хиты/Новинки) | Фон-пилюля перемещается | `background + box-shadow`, `0.25s` |

### 3.5 Добавить в корзину — wow-анимация

**Сценарий:** Нажатие «В корзину» →
1. Кнопка: ripple-эффект (круг от точки клика), текст меняется на «✓ Добавлено», фон → success на 1.5s, потом обратно
2. Бейдж корзины в header: bounce-анимация (scale 1→1.4→0.9→1), count +1
3. Toast-уведомление: slide-in справа снизу, мини-превью товара (фото 48px + название + цена), auto-dismiss через 3s с fade-out

```css
@keyframes cartBounce {
  0% { transform: scale(1); }
  30% { transform: scale(1.35); }
  60% { transform: scale(0.9); }
  100% { transform: scale(1); }
}

@keyframes toastIn {
  from { transform: translateX(120%); opacity: 0; }
  to { transform: translateX(0); opacity: 1; }
}

@keyframes toastOut {
  from { transform: translateX(0); opacity: 1; }
  to { transform: translateX(120%); opacity: 0; }
}
```

### 3.6 Skeleton loading

**Где:** Каталог при «загрузке», карточка товара при «загрузке»  
**Что:** Серые прямоугольники с shimmer-эффектом (gradient пробегает слева направо)

```css
@keyframes shimmer {
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #F0EDE8 25%, #F5F2EE 50%, #F0EDE8 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: 8px;
}
```

ProductCard skeleton: прямоугольник 100% × aspect-ratio 1 (фото) + 3 полоски разной ширины (текст) + прямоугольник (кнопка). Показывать 0.8s при маунте страницы, потом fade → реальные карточки.

### 3.7 Модалы и drawer-ы

**Quick View модал (каталог):**
- Overlay: `opacity 0→1`, `0.2s`
- Контент: `scale(0.95) opacity(0) → scale(1) opacity(1)`, `0.3s cubic-bezier(0.22, 1, 0.36, 1)`

**Мобильные фильтры (bottom sheet):**
- Overlay: `opacity 0→1`
- Sheet: `translateY(100%) → translateY(0)`, `0.35s cubic-bezier(0.22, 1, 0.36, 1)`

**Мега-меню:**
- Уже есть menuSlide — ОК, но добавить: контент подкатегорий при смене категории → crossfade `0.15s`

### 3.8 Parallax на hero (subtle)

Фоновое изображение слайдера при скролле смещается чуть медленнее:

```jsx
const [scrollY, setScrollY] = useState(0);
useEffect(() => {
  const h = () => setScrollY(window.scrollY);
  window.addEventListener("scroll", h, { passive: true });
  return () => window.removeEventListener("scroll", h);
}, []);

// На img hero:
style={{ transform: `translateY(${scrollY * 0.15}px) scale(1.1)` }}
```

Subtle, не больше 0.15 коэффициента. Только для hero, не для всего.

### 3.9 Числовой counter (секция «Цифры о нас» — НОВАЯ секция)

Добавить между Advantages и Promo на главной:

```
[   50 000+    ]  [   200+     ]  [   15 000+   ]  [   4.8 ★    ]
[   товаров    ]  [   городов  ]  [   отзывов   ]  [   рейтинг  ]
```

Числа анимируются от 0 до значения при появлении в viewport (countUp за 1.5s, easeOut). Используй `requestAnimationFrame` для плавного счёта.

### 3.10 Page transition

При переходе между страницами — fade-out текущей + fade-in новой:

```css
@keyframes pageIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
```

На `<main>`: `animation: pageIn 0.3s ease`.

---

## 4. ПРИОРИТЕТЫ ВЫПОЛНЕНИЯ

### Волна 1 — Критические баги (сразу)
B01 (дубль bento), B02 (грамматика), B03 (фото галереи), B06 (эмоджи→Phosphor), B07 (битые ссылки footer)

### Волна 2 — Контент и функционал
B04 (мало похожих товаров), B05 (пустая категория), B13 (мало товаров), B08 (поиск), B11 (фильтры)

### Волна 3 — Анимации
3.1 (scroll-triggered), 3.2 (stagger карточек), 3.4 (hover-микроанимации), 3.5 (добавить в корзину), 3.6 (skeleton)

### Волна 4 — Полировка
B09 (checkout), B14 (карта), B17 (табы товара), B22-B25 (мобильная адаптация), 3.3 (hero текст каскадом), 3.7 (модалы), 3.8 (parallax), 3.9 (counter), 3.10 (page transition)
