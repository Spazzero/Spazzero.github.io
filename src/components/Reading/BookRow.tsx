import type { Book } from '@/data/reading';
import { formatFinished } from '@/lib/reading';

import Rating from './Rating';

interface BookRowProps {
  book: Book;
}

function BookFields({ book }: BookRowProps) {
  return (
    <>
      <span className="book-title">{book.title}</span>
      <span className="book-author">{book.author}</span>
      <time className="book-date" dateTime={book.finished}>
        {formatFinished(book.finished)}
      </time>
      <Rating value={book.rating} />
    </>
  );
}

export default function BookRow({ book }: BookRowProps) {
  if (!book.note) {
    return (
      <li className="book-item">
        <div className="book-row">
          <BookFields book={book} />
        </div>
      </li>
    );
  }

  // A native disclosure keeps the note keyboard-accessible without shipping
  // any client JavaScript.
  return (
    <li className="book-item">
      <details className="book-details">
        <summary className="book-row book-row--toggle">
          <BookFields book={book} />
          <span className="book-toggle" aria-hidden="true" />
        </summary>
        <p className="book-note">{book.note}</p>
      </details>
    </li>
  );
}
