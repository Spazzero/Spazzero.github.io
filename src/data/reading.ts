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
    title: 'Kafka on the Shore',
    author: 'Haruki Murakami',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'The Paper Menagerie and Other Stories',
    author: 'Ken Liu',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title: 'Off Centre',
    author: 'Haresh Sharma',
    finished: '2022-01-04',
    rating: 3,
    note: 'Watched the play live',
  },
  {
    title: 'The Joy Luck Club',
    author: 'Amy Tan',
    finished: '2022-01-04',
    rating: 4,
  },
  {
    title: 'The Art of Thinking Clearly',
    author: 'Rolf Dobelli',
    finished: '2022-01-04',
    rating: 5,
  },
  {
    title:
      'Atomic Habits: An Easy & Proven Way to Build Good Habits & Break Bad Ones',
    author: 'James Clear',
    finished: '2022-01-04',
    rating: 4,
  },
];

export default data;
