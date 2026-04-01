# Sprint 0 — Фундамент + Главная страница

**Цель:** Рабочий прототип главной страницы, навигация, дизайн-система.
**Приоритет:** P0
**Агент:** Build (fullstack, один спринт)

## Задачи

### 1. Дизайн-система и настройка (4ч)
- [ ] Кастомные цвета в globals.css (терракота, gold, muted, surface — из прототипа)
- [ ] Шрифты: DM Sans + DM Serif Display (через next/font)
- [ ] Базовые shadcn компоненты: Button, Badge, Input, Sheet, Dialog
- [ ] Tailwind: custom colors, breakpoints проверить

### 2. Layout: Header + Footer + MobileBar (8ч)
- [ ] Header (sticky, topline, logo, каталог-кнопка, поиск, иконки)
- [ ] MegaMenu (10 категорий, подкатегории, промо-блок внутри)
- [ ] Footer (4 колонки, соцсети, копирайт)
- [ ] MobileBottomBar (5 иконок, sticky bottom)
- [ ] Responsive: mobile / tablet / desktop

### 3. Главная страница (12ч)
- [ ] HeroSlider (3 слайда, autoplay, progress bar, стрелки)
- [ ] Side promos (2 карточки справа от слайдера)
- [ ] BentoCategories (bento grid 5-col, hover-эффекты)
- [ ] ProductCarousel (табы хиты/новинки/скидки, горизонтальный скролл)
- [ ] ShoppableInterior (интерьер с кликабельными точками)
- [ ] Advantages (4 иконки + текст)
- [ ] PromoBlock (скидка 15%, email input)

### 4. Shared компоненты (4ч)
- [ ] ProductCard (фото, бейджи, рейтинг, цена, кнопки hover)
- [ ] Stars (рейтинг звёздочками)
- [ ] Badge (хит, новинка, скидка)
- [ ] formatters.ts (цены: "54 990 ₽")

### 5. Моковые данные (2ч)
- [ ] types/index.ts (Product, Category, Review, etc.)
- [ ] data/products.ts (6+ товаров)
- [ ] data/categories.ts (10 категорий с подкатегориями)

## Критерии готовности
- Главная страница визуально соответствует прототипу из `homepage (1).jsx`
- Responsive: выглядит хорошо на 375px, 768px, 1280px
- MegaMenu открывается/закрывается
- Все hover-эффекты работают
- Tailwind classes вместо inline styles

## Исходные материалы
- `homepage (1).jsx` — готовый прототип на inline styles (переписать на Tailwind)
- `tz-prototype.md` — полное ТЗ
