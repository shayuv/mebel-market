/**
 * Склонение русских слов после числительных
 * pluralize(1, ['товар', 'товара', 'товаров']) → 'товар'
 * pluralize(2, ['товар', 'товара', 'товаров']) → 'товара'
 * pluralize(5, ['товар', 'товара', 'товаров']) → 'товаров'
 */
export function pluralize(n: number, forms: [string, string, string]): string {
  const abs = Math.abs(n) % 100;
  const last = abs % 10;
  if (abs > 10 && abs < 20) return forms[2];
  if (last > 1 && last < 5) return forms[1];
  if (last === 1) return forms[0];
  return forms[2];
}

/**
 * formatPrice(54990) → "54 990 ₽"
 */
export function formatPrice(price: number): string {
  return price.toLocaleString("ru-RU") + " \u20BD";
}
