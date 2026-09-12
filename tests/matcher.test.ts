import { describe, expect, it } from 'vitest';
import { createMatcher, matchCompanies } from '../src/core/matcher';
import { companies } from '../src/data/companies';
describe('company matching', () => {
  it('matches case-insensitively and prefers complete aliases', () => {
    const text = 'Saudi Aramco and APPLE INC. meet Siemens Energy.';
    expect(
      matchCompanies(text).map((match) => text.slice(match.start, match.end)),
    ).toEqual(['Saudi Aramco', 'APPLE INC.', 'Siemens Energy']);
  });
  it('avoids substrings, Unicode word fragments, and unrelated Siemens entities', () => {
    expect(
      matchCompanies('pineapple Appleton éApple Appleé Siemens Gamesa'),
    ).toEqual([]);
  });
  it('handles punctuation and resets regex state between calls', () => {
    expect(matchCompanies('(Apple), Aramco.')).toHaveLength(2);
    expect(matchCompanies('(Apple), Aramco.')).toHaveLength(2);
    expect(createMatcher([])('Apple')).toEqual([]);
  });
  it('escapes regex metacharacters in catalogue aliases', () => {
    const matcher = createMatcher([
      { ...companies[0], aliases: ['A+B (Group)'] },
    ]);
    expect(matcher('Meet A+B (Group) today.')).toHaveLength(1);
  });
  it('requires unique IDs and source provenance for every record', () => {
    expect(new Set(companies.map((company) => company.id)).size).toBe(
      companies.length,
    );
    for (const company of companies) {
      expect(company.source.url).toMatch(/^https:\/\//);
      expect(company.source.publisher.length).toBeGreaterThan(3);
      expect(company.source.published.length).toBeGreaterThan(3);
    }
  });
});
