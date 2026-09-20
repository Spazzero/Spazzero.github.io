/**
 * Conforms to https://jsonresume.org/schema/
 */
export interface Position {
  name: string;
  position: string;
  url: string;
  startDate: string;
  endDate?: string;
  summary?: string;
  highlights?: string[];
}

const work: Position[] = [
  {
    name: 'Covalent Capital',
    position: 'DCM Analyst & Data Engineer Intern',
    url: 'https://www.covacap.com/',
    startDate: '2026-09-01',
    // Left open so the role renders as "Present" and satisfies the
    // at-least-one-current-position invariant in work.test.ts. Set
    // endDate: '2026-12-31' once the internship actually ends.
    highlights: [
      'Supporting market data across the full bond primary issuance lifecycle \u2014 from origination and deal capture to bookbuilding, pricing, settlement, and post-issue reference-data maintenance.',
      'Sourced and compiled 200+ fragmented corporate bond documents across European issuers (Greece, Hungary, Germany), resolving reference-data gaps to enable database reconciliation and analysis.',
    ],
  },
  {
    name: 'Japfa',
    position: 'Analyst Intern',
    url: 'https://www.japfa.com/',
    startDate: '2026-01-01',
    endDate: '2026-04-30',
    highlights: [
      'Performed systematic validation and remediation of multi-year, multi-region pricing datasets in SQL, resolving data quality and integrity issues to produce audit-ready inputs; documented each anomaly class and the corrective action taken, creating a reusable remediation reference for the team.',
      'Engineered time-series regression models in R to forecast national and regional poultry prices; achieved 88% adjusted R\u00b2 on national forecasts and 87% accuracy across Indonesian regional markets, directly informing resource planning decisions.',
    ],
  },
  {
    name: 'SAF',
    position: 'Intelligence Officer',
    url: 'https://www.mindef.gov.sg/army',
    startDate: '2022-07-01',
    endDate: '2024-04-30',
    highlights: [
      "Delivered actionable intelligence assessments under pressure for Singapore's highest-profile national events, notably F1, Presidential Inauguration, and bilateral diplomatic summits (2023).",
      'Developed and trained 2 full-time NS cohorts in intelligence analysis and operational planning.',
    ],
  },
  {
    name: 'Singapore Aquaculture Technologies',
    position: 'Data Analyst Intern',
    url: 'https://singaporeaquaculture.com/',
    startDate: '2021-07-01',
    endDate: '2022-02-28',
    highlights: [
      'Designed and deployed an automated ETL pipeline to ingest, validate, and distribute operational KPIs across business functions, achieving 24/7 real-time data access and establishing a single source of truth for management reporting.',
      'Conducted cross-functional requirements gathering and quantitative analysis on operational datasets to identify resource allocation inefficiencies; presented structured findings and recommendations that were adopted by management.',
    ],
  },
];

export default work;
