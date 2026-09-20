export interface Skill {
  title: string;
  category: string[];
}

export interface Category {
  name: string;
  color: string;
}

const skills: Skill[] = [
  // Technical Stack
  { title: 'Python', category: ['Languages'] },
  { title: 'R', category: ['Languages'] },
  { title: 'SQL', category: ['Databases', 'Languages'] },
  { title: 'Excel (Advanced)', category: ['Analytics'] },
  { title: 'Power Query', category: ['Analytics'] },
  { title: 'Jupyter Notebook', category: ['Analytics'] },

  // Analytics & Visualisation
  { title: 'Power BI', category: ['Visualisation'] },
  { title: 'Tableau', category: ['Visualisation'] },
  { title: 'Figma', category: ['Design'] },
  { title: 'Adobe XD', category: ['Design'] },
  { title: 'MS PowerPoint', category: ['Visualisation'] },
  { title: 'MS Word', category: ['Visualisation'] },

  // Market Knowledge
  {
    title: 'Bloomberg Market Concepts (Certified)',
    category: ['Markets'],
  },
  { title: 'Cash Equities', category: ['Markets'] },
  { title: 'FX', category: ['Markets'] },
  { title: 'Derivatives', category: ['Markets'] },
  { title: 'Fixed Income', category: ['Markets'] },
];

function buildCategories(skillsList: Skill[]): Category[] {
  const uniqueCategories = Array.from(
    new Set(skillsList.flatMap(({ category }) => category)),
  ).sort();

  return uniqueCategories.map((category) => ({
    name: category,
    color: 'var(--color-accent)',
  }));
}

const categories: Category[] = buildCategories(skills);

export { categories, skills };
