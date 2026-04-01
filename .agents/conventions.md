# Conventions

## Naming
- Components: PascalCase (`ProductCard.tsx`)
- Files: kebab-case for pages/routes, PascalCase for components
- CSS: Tailwind utility classes, NO inline styles
- Variables: camelCase

## Imports
- `@/` alias for `src/`
- shadcn components: `@/components/ui/`
- App components: `@/components/`
- Data/mocks: `@/data/`
- Types: `@/types/`
- Lib/utils: `@/lib/`

## Components
- Server Components by default (Next.js App Router)
- `"use client"` only when needed (interactivity, hooks)
- shadcn/ui as base, customize via Tailwind
- Framer Motion for animations

## Styling
- Tailwind CSS 4 utility-first
- Custom colors via CSS variables in globals.css
- Mobile-first responsive (sm → md → lg → xl)
- No inline styles, no CSS modules

## Data
- Mock JSON files in `src/data/`
- Types in `src/types/`
- Images: Unsplash URLs with size params
