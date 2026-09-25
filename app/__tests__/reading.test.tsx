import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import books from '@/data/reading';
import { formatFinished, getBooks } from '@/lib/reading';
import ReadingPage from '../reading/page';

describe('reading page', () => {
  it('lists every book in one list, with no per-year headings', () => {
    const { container } = render(<ReadingPage />);

    expect(container.querySelectorAll('.reading-list')).toHaveLength(1);
    expect(screen.queryByRole('heading', { level: 2 })).not.toBeInTheDocument();
    expect(
      [...container.querySelectorAll('.book-title')].map(
        (el) => el.textContent,
      ),
    ).toEqual(getBooks().map((book) => book.title));
  });

  it('shows the full date, year included, and a spoken rating', () => {
    const { container } = render(<ReadingPage />);

    expect(
      [...container.querySelectorAll('.book-date')].map((el) => el.textContent),
    ).toEqual(getBooks().map((book) => formatFinished(book.finished)));
    expect(
      [...container.querySelectorAll('.book-rating .sr-only')].map(
        (el) => el.textContent,
      ),
    ).toEqual(getBooks().map((book) => `${book.rating} out of 5`));
  });

  it('makes only books with a note expandable', () => {
    const { container } = render(<ReadingPage />);
    const withNotes = books.filter((book) => book.note);

    expect(container.querySelectorAll('.book-details')).toHaveLength(
      withNotes.length,
    );
    for (const book of withNotes) {
      expect(screen.getByText(book.note!)).toBeInTheDocument();
    }
  });
});
