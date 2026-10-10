import { render, screen, within } from '@testing-library/react';
import { afterEach, describe, expect, it, vi } from 'vitest';

import { getWritingItems } from '@/lib/writing';
import HomePage from '../page';
import WritingPage from '../writing/page';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('writing information architecture', () => {
  it('surfaces up to three of the newest dated items on the homepage', () => {
    const expected = getWritingItems()
      .filter((item) => item.date)
      .slice(0, 3);

    const { container } = render(<HomePage />);
    const section = screen.getByRole('region', { name: 'Latest writing' });
    const cards = container.querySelectorAll('.home-writing-item');

    expect(expected.length).toBeGreaterThan(0);
    expect(cards).toHaveLength(expected.length);
    expect(
      [...cards].map((card) => card.querySelector('h3')?.textContent),
    ).toEqual(expected.map((item) => item.title));
    expect(
      within(section).getByRole('link', { name: 'View all' }),
    ).toHaveAttribute('href', '/writing');
  });

  it('groups owned essays, external articles, and guides under real headings', () => {
    // Draft templates fill every group, and drafts are visible under `next dev`.
    vi.stubEnv('NODE_ENV', 'development');
    const { container } = render(<WritingPage />);

    expect(
      screen.getByRole('heading', { level: 2, name: 'Essays on this site' }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        level: 2,
        name: 'Selected writing elsewhere',
      }),
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 2, name: 'Guides' }),
    ).toBeInTheDocument();

    expect(container.querySelectorAll('.writing-item h3')).toHaveLength(
      getWritingItems().length,
    );
  });

  it('renders a group heading only when something published belongs under it', () => {
    // Derived from the data, so this holds whether or not real external writing
    // has been added yet.
    const external = getWritingItems().filter((item) => item.isExternal);
    render(<WritingPage />);

    const groups: [string, boolean][] = [
      ['Selected writing elsewhere', external.some((item) => item.date)],
      ['Guides', external.some((item) => !item.date)],
    ];
    for (const [name, hasItems] of groups) {
      expect(Boolean(screen.queryByRole('heading', { level: 2, name }))).toBe(
        hasItems,
      );
    }
  });

  it('features exactly the newest dated item, wherever it is grouped', () => {
    const newest = getWritingItems().find((item) => item.date);
    const { container } = render(<WritingPage />);
    const featured = container.querySelectorAll('.writing-item--featured');

    // Outside `next build`, next/link does not see `trailingSlash: true`, so an
    // internal post renders without the slash its canonical URL carries.
    const expectedHref = newest?.isExternal
      ? newest.url
      : newest?.url.replace(/\/$/, '');

    expect(featured).toHaveLength(1);
    expect(featured[0]).toHaveAttribute('href', expectedHref);
  });

  it('shows provenance beside every external-link arrow', () => {
    const externalItems = getWritingItems().filter((item) => item.isExternal);
    const { container } = render(<WritingPage />);
    const externalLinks = [
      ...container.querySelectorAll('a.writing-item[target="_blank"]'),
    ];

    expect(externalLinks).toHaveLength(externalItems.length);
    externalLinks.forEach((link, index) => {
      expect(link.querySelector('.writing-source')).toHaveTextContent(
        externalItems[index].source,
      );
      expect(link.querySelector('.writing-external')).toHaveTextContent('↗');
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      expect(link.querySelector('.sr-only')).toHaveTextContent(
        'opens in a new tab',
      );
    });
  });
});
