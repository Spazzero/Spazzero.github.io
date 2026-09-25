import { describe, expect, it } from 'vitest';

import type { Book } from '@/data/reading';
import { formatFinished, getBooks } from '../reading';

const book = (title: string, finished: string): Book => ({
  title,
  author: 'Author',
  finished,
  rating: 3,
});

describe('getBooks', () => {
  it('sorts newest first, whatever the input order', () => {
    const books = getBooks([
      book('Older 2025', '2025-02-01'),
      book('Early 2026', '2026-01-10'),
      book('Late 2025', '2025-12-20'),
      book('Late 2026', '2026-08-21'),
    ]);

    expect(books.map((b) => b.title)).toEqual([
      'Late 2026',
      'Early 2026',
      'Late 2025',
      'Older 2025',
    ]);
  });

  it('does not reorder the data it is given', () => {
    const books = [book('A', '2024-01-01'), book('B', '2025-01-01')];
    getBooks(books);

    expect(books.map((b) => b.title)).toEqual(['A', 'B']);
  });
});

describe('formatFinished', () => {
  it('includes the year without shifting across a day boundary', () => {
    expect(formatFinished('2026-01-01')).toBe('Jan 1, 2026');
    expect(formatFinished('2025-12-31')).toBe('Dec 31, 2025');
  });
});
