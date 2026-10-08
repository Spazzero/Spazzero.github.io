export interface Skill {
  title: string;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

/**
 * Display order for the groups. Deliberately not alphabetical: groups are
 * ordered for the roles being targeted, and every skill category must appear
 * here (the data tests enforce it).
 */
const CATEGORY_ORDER = ['Programming', 'Analytics & BI', 'Markets'] as const;

/**
 * Within a group, skills render in the order listed here — strongest and most
 * relevant first.
 */
const skills: Skill[] = [
  // Programming
  { title: 'Python', category: ['Programming'] },
  { title: 'SQL', category: ['Programming'] },
  { title: 'R', category: ['Programming'] },

  // Analytics & BI
  { title: 'Excel (Advanced)', category: ['Analytics & BI'] },
  { title: 'Power Query', category: ['Analytics & BI'] },
  { title: 'Power BI', category: ['Analytics & BI'] },
  { title: 'Tableau', category: ['Analytics & BI'] },
  { title: 'MS PowerPoint', category: ['Analytics & BI'] },

  // Markets
  {
    title: 'Bloomberg Market Concepts',
    category: ['Markets'],
  },
  { title: 'Cash Equities', category: ['Markets'] },
  { title: 'Fixed Income', category: ['Markets'] },
  { title: 'FX', category: ['Markets'] },
  { title: 'Derivatives', category: ['Markets'] },
];

const categories: Category[] = CATEGORY_ORDER.map((name) => ({
  name,
  color: 'var(--color-accent)',
}));

export { categories, skills };
