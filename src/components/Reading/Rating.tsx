interface RatingProps {
  /** Omitted for a book still being read. */
  value?: number;
}

export default function Rating({ value }: RatingProps) {
  if (value === undefined) {
    return (
      <span className="book-rating book-rating--unrated">
        <span aria-hidden="true">{'☆'.repeat(5)}</span>
        <span className="sr-only">Not yet rated</span>
      </span>
    );
  }

  // The stars are drawn for sighted readers
  return (
    <span className="book-rating">
      <span aria-hidden="true">{'★'.repeat(value)}</span>
      <span className="sr-only">{value} out of 5</span>
    </span>
  );
}
