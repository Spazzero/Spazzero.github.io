import { afterEach, describe, expect, it, vi } from 'vitest';

import {
  compareWritingItems,
  getExternalWriting,
  getWritingItems,
  type WritingItem,
} from '../writing';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('getWritingItems', () => {
  it('merges published local posts and external writing newest first', () => {
    // The external entries are draft templates, so merge them in the mode
    // where drafts are visible.
    vi.stubEnv('NODE_ENV', 'development');
    const items = getWritingItems();

    expect(items.some((item) => !item.isExternal)).toBe(true);
    expect(items.some((item) => item.isExternal)).toBe(true);

    const dated = items.filter((item) => item.date);
    expect(
      dated.every(
        (item, index) =>
          index === 0 || dated[index - 1]!.date.localeCompare(item.date) >= 0,
      ),
    ).toBe(true);
  });

  it('hides draft external writing outside development', () => {
    expect(getExternalWriting().some((item) => item.draft)).toBe(false);
    expect(
      getWritingItems().some((item) => item.url.includes('placeholder')),
    ).toBe(false);
  });

  it('uses canonical trailing-slash URLs for local posts', () => {
    const localItems = getWritingItems().filter((item) => !item.isExternal);

    expect(localItems.length).toBeGreaterThan(0);
    expect(localItems.every((item) => item.url.endsWith('/'))).toBe(true);
    expect(localItems.every((item) => item.source === 'On this site')).toBe(
      true,
    );
  });

  it('orders equal and undated entries deterministically', () => {
    const item = (
      title: string,
      date: string,
      url = `https://example.com/${title.toLowerCase()}`,
    ): WritingItem => ({
      title,
      date,
      url,
      description: '',
      isExternal: true,
      source: 'Example',
    });

    expect(
      [item('Zulu', ''), item('Alpha', '')].sort(compareWritingItems),
    ).toEqual([item('Alpha', ''), item('Zulu', '')]);
    expect(
      [item('Zulu', '2026-01-01'), item('Alpha', '2026-01-01')].sort(
        compareWritingItems,
      ),
    ).toEqual([item('Alpha', '2026-01-01'), item('Zulu', '2026-01-01')]);
  });
});
