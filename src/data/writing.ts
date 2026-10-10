export interface WritingItem {
  title: string;
  url: string;
  date: string;
  description: string;
  /** Hidden outside `next dev`, exactly like a draft post. */
  draft?: boolean;
}

/**
 * Writing published elsewhere. These appear on `/writing/` alongside the local
 * Markdown posts and in the RSS feed, sorted newest first.
 *
 * The placeholder entries are drafts: they show under `next dev` as templates
 * and are left out of every production page and the feed. Replace them, or
 * empty the array entirely: unlike `content/writing/`, nothing here is required
 * for the production build.
 */
const data: WritingItem[] = [
  {
    title: 'Placeholder External Article',
    url: 'https://example.com/',
    date: '2026-01-20',
    draft: true,
    description:
      'A placeholder for writing published on another site. Replace the title, url, date, and description with a real article.',
  },
  {
    // An external item with no date renders under "Guides" rather than
    // "Selected writing elsewhere", and is left out of the RSS feed.
    title: 'Placeholder Guide',
    url: 'https://example.com/guide/',
    date: '',
    draft: true,
    description:
      'A placeholder for an undated, evergreen piece such as a guide or reference.',
  },
];

export default data;
