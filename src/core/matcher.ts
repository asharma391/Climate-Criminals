import { companies, type Company } from '../data/companies';
export interface Match {
  start: number;
  end: number;
  company: Company;
}
const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
export function createMatcher(catalogue: Company[]) {
  const aliases = catalogue
    .flatMap((company) => company.aliases.map((alias) => ({ alias, company })))
    .sort((a, b) => b.alias.length - a.alias.length);
  const index = new Map(
    aliases.map((item) => [item.alias.toLowerCase(), item.company]),
  );
  const pattern = aliases.length
    ? new RegExp(
        `(?<![\\p{L}\\p{N}_])(?:${aliases.map((item) => escape(item.alias)).join('|')})(?![\\p{L}\\p{N}_])`,
        'giu',
      )
    : null;
  return (text: string): Match[] => {
    if (!pattern) return [];
    pattern.lastIndex = 0;
    return [...text.matchAll(pattern)].map((result) => ({
      start: result.index!,
      end: result.index! + result[0].length,
      company: index.get(result[0].toLowerCase())!,
    }));
  };
}
export const matchCompanies = createMatcher(companies);
