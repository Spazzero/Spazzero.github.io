export interface Project {
  title: string;
  subtitle?: string;
  link?: string;
  image: string;
  date: string;
  desc: string;
  tech?: string[];
  featured?: boolean;
}

// Single placeholder entry. The archive route and its tests both require at
// least one project, and one featured project, so the page cannot simply be
// emptied while real entries are being written.
const data: Project[] = [
  {
    title: 'Gerald test title',
    subtitle: 'Gerald test subtitle',
    image: '/images/projects/placeholder.png',
    date: '2026-09-20',
    desc: 'test desc',
    tech: ['Python', 'SQL', 'Power BI'],
    featured: true,
  },
];

export default data;
