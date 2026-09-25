import type { Metadata } from 'next';

import BookRow from '@/components/Reading/BookRow';
import { SchemaGraph } from '@/components/Schema';
import PageWrapper from '@/components/Template/PageWrapper';
import { createPageMetadata } from '@/lib/metadata';
import { getBooks } from '@/lib/reading';
import {
  breadcrumbNode,
  collectionPageNode,
  HOME_URL,
  SITE_URL,
} from '@/lib/schema';
import { AUTHOR_NAME } from '@/lib/utils';

const READING_URL = `${SITE_URL}/reading/`;

const READING_DESCRIPTION = `Books ${AUTHOR_NAME} has read, with a short note on each.`;

export const metadata: Metadata = createPageMetadata({
  title: 'Reading',
  description: READING_DESCRIPTION,
  path: '/reading/',
});

export default function ReadingPage() {
  const books = getBooks();

  return (
    <PageWrapper>
      <SchemaGraph
        nodes={[
          collectionPageNode({
            url: READING_URL,
            name: 'Reading',
            description: READING_DESCRIPTION,
            hasBreadcrumb: true,
          }),
          breadcrumbNode(READING_URL, [
            { name: 'Home', url: HOME_URL },
            { name: 'Reading', url: READING_URL },
          ]),
        ]}
      />
      <article className="reading-page">
        <header className="reading-header">
          <h1 className="page-title">Reading</h1>
          <p className="page-subtitle">
            Books I&apos;ve read, my GoodReads backup.
          </p>
        </header>

        <ul className="reading-list" aria-label="Books read">
          {books.map((book) => (
            <BookRow key={`${book.finished}-${book.title}`} book={book} />
          ))}
        </ul>
      </article>
    </PageWrapper>
  );
}
