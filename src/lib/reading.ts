import data, { type Book } from '@/data/reading';

/**
 * Books sorted by newest first.
 */
export function getBooks(books: Book[] = data): Book[] {
  return [...books].sort((a, b) => b.finished.localeCompare(a.finished));
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
