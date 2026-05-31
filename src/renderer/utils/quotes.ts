/**
 * 鸡汤语录工具
 */
import { QUOTES } from '../../shared/constants';
import type { Quote } from '../../shared/types';

/**
 * 获取随机语录
 */
export function getRandomQuote(): Quote {
  const index = Math.floor(Math.random() * QUOTES.length);
  return QUOTES[index];
}

/**
 * 根据类别获取语录
 */
export function getQuoteByCategory(category: 'focus' | 'rest' | 'growth'): Quote {
  const filtered = QUOTES.filter((q) => q.category === category);
  if (filtered.length === 0) {
    return getRandomQuote();
  }
  const index = Math.floor(Math.random() * filtered.length);
  return filtered[index];
}

/**
 * 获取今日语录（基于日期种子）
 */
export function getTodayQuote(): Quote {
  const today = new Date();
  const seed = today.getFullYear() * 10000 + (today.getMonth() + 1) * 100 + today.getDate();
  const index = seed % QUOTES.length;
  return QUOTES[index];
}
