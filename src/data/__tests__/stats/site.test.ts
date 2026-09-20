import { describe, expect, it } from 'vitest';

import data from '../../stats/site';

describe('site stats data', () => {
  it('exports an array of stats', () => {
    expect(Array.isArray(data)).toBe(true);
    expect(data.length).toBeGreaterThan(0);
  });

  it('each stat has a label', () => {
    for (const stat of data) {
      expect(stat).toHaveProperty('label');
      expect(typeof stat.label).toBe('string');
      expect(stat.label.trim().length).toBeGreaterThan(0);
    }
  });

  /**
   * The repository-popularity rows (stars, watchers, forks, open issues) and
   * the two joke rows were removed, so `pushed_at` is the only key still read
   * from the GitHub API and `source_lines` is measured from the working tree.
   */
  it('reads only the last-push date from the GitHub API', () => {
    const apiKeys = data
      .map((s) => s.key)
      .filter((key): key is string => Boolean(key) && key !== 'source_lines');

    expect(apiKeys).toEqual(['pushed_at']);
  });

  it('measures the line count rather than hardcoding it', () => {
    const lines = data.find((s) => s.key === 'source_lines');

    expect(lines).toBeDefined();
    expect(lines?.value).toBeUndefined();
  });

  it('stats with links have valid URLs', () => {
    const statsWithLinks = data.filter((s) => s.link);

    for (const stat of statsWithLinks) {
      expect(stat.link).toMatch(/^https:\/\//);
    }
  });

  it('pushed_at stat has a format function', () => {
    const pushedAt = data.find((s) => s.key === 'pushed_at');

    expect(pushedAt).toBeDefined();
    expect(pushedAt!.format).toBeDefined();
    expect(typeof pushedAt!.format).toBe('function');
  });

  it('format function returns formatted date', () => {
    const pushedAt = data.find((s) => s.key === 'pushed_at');
    const formatted = pushedAt!.format!('2024-01-15T12:00:00Z');

    expect(formatted).toBe('January 15, 2024');
  });

  it('declares the lines-of-code stat without hardcoding a count', () => {
    const locStat = data.find((s) => s.label.includes('Lines of TypeScript'));

    expect(locStat).toBeDefined();
    expect(locStat!.link).toContain('github.com');
    // Resolved at build time from the working tree by Site.tsx. A literal
    // here is what let the old figure drift by nearly 2,000 lines.
    expect(locStat!.key).toBe('source_lines');
    expect(locStat!.value).toBeUndefined();
  });
});
