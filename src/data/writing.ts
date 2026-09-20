export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
}

/**
 * Writing published elsewhere. These appear on `/writing/` alongside the local
 * Markdown posts and in the RSS feed, sorted newest first.
 *
 * A single placeholder entry stands in until there is real external writing to
 * list. Replace it, or empty the array entirely: unlike `content/writing/`,
 * nothing here is required for the production build.
 */
const data: WritingItem[] = [
  {
    title: 'Placeholder External Article',
    url: 'https://example.com/',
    date: '2026-01-20',
    description:
      'A placeholder for writing published on another site. Replace the title, url, date, and description with a real article.',
  },
  {
    // An external item with no date renders under "Guides" rather than
    // "Selected writing elsewhere", and is left out of the RSS feed.
    title: 'Placeholder Guide',
    url: 'https://example.com/guide/',
    date: '',
    description:
      'A placeholder for an undated, evergreen piece such as a guide or reference.',
  },
];

export default data;
