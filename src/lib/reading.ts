import data, { type Book } from '@/data/reading';

/**
 * Books sorted by newest first, with any still being read ahead of all of
 * them.
 */
export function getBooks(books: Book[] = data): Book[] {
  return [...books].sort((a, b) => {
    if (a.finished === undefined || b.finished === undefined) {
      return (
        Number(a.finished !== undefined) - Number(b.finished !== undefined)
      );
    }
    return b.finished.localeCompare(a.finished);
  });
}

/**
 * "Aug 14, 2026". Parsed at midday, as `formatDate` does, so no timezone
 * shifts the day.
 */
export function formatFinished(dateStr: string): string {
  return new Date(`${dateStr}T12:00:00`).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
}
