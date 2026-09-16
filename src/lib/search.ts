import { catalog, CatalogItem } from '../data/catalog';

const normalize = (value: string) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const levenshtein = (a: string, b: string): number => {
  if (a === b) return 0;
  if (!a.length) return b.length;
  if (!b.length) return a.length;

  const prev = Array.from({ length: b.length + 1 }, (_, i) => i);
  for (let i = 1; i <= a.length; i++) {
    const current = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      current[j] = Math.min(prev[j] + 1, current[j - 1] + 1, prev[j - 1] + cost);
    }
    for (let j = 0; j <= b.length; j++) prev[j] = current[j];
  }
  return prev[b.length];
};

const tokens = (value: string) => normalize(value).split(' ').filter(Boolean);

const matchesToken = (queryToken: string, targetTokens: string[]) => {
  if (targetTokens.includes(queryToken)) return 3;
  if (targetTokens.some((t) => t.startsWith(queryToken) || queryToken.startsWith(t))) return 2;
  if (targetTokens.some((t) => levenshtein(queryToken, t) <= 2)) return 1;
  return 0;
};

export function searchCatalog(query: string): CatalogItem[] {
  const q = normalize(query);
  if (!q) return [];

  const queryTokens = tokens(q);
  const queryText = q.replace(/\s+/g, '');

  const scored = catalog
    .map((item) => {
      const haystack = normalize(
        [item.title, item.category, item.description, ...item.keywords].join(' ')
      );
      const haystackTokens = tokens(haystack);
      const haystackText = haystack.replace(/\s+/g, '');

      let score = 0;
      if (haystackText.includes(queryText)) score += 8;
      for (const qt of queryTokens) {
        score += matchesToken(qt, haystackTokens);
      }
      if (score > 0 && levenshtein(q, haystackText) <= 3) score += 4;

      return { item, score };
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((r) => r.item);

  return scored;
}

export function getSuggestions(query: string): string[] {
  const q = normalize(query);
  if (!q) return [];
  const suggestions = new Set<string>();
  for (const item of catalog) {
    if (normalize(item.title).includes(q) || normalize(item.category).includes(q)) {
      suggestions.add(item.title);
    }
    for (const kw of item.keywords) {
      if (normalize(kw).includes(q)) suggestions.add(kw);
    }
  }
  return Array.from(suggestions).slice(0, 5);
}
