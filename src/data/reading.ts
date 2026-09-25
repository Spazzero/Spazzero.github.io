export interface Book {
  title: string;
  author: string;
  /** Date finished, as YYYY-MM-DD. */
  finished: string;
  rating: 1 | 2 | 3 | 4 | 5;
  /** A line or two of review. A book with a note becomes expandable. */
  note?: string;
}

/**
 * Books shown on `/reading/`, newest first.
 *
 * Order here does not matter: `getBooks` sorts by `finished`, so a new
 * book can be added anywhere in the array.
 */
const data: Book[] = [
  {
    title: 'Book 1 Example',
    author: 'Author Name',
    finished: '2026-08-14',
    rating: 4,
    note: 'A placeholder note. Replace it with a line or two on what the book was about and why it earned its rating.',
  },
  {
    title: 'Book 2 Example',
    author: 'Author Name',
    finished: '2025-11-02',
    rating: 5,
  },
];

export default data;
