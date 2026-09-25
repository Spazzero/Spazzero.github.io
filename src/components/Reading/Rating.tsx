interface RatingProps {
  value: number;
}

export default function Rating({ value }: RatingProps) {
  // The stars are drawn for sighted readers; the count is what gets spoken.
  return (
    <span className="book-rating">
      <span aria-hidden="true">{'★'.repeat(value)}</span>
      <span className="sr-only">{value} out of 5</span>
    </span>
  );
}
