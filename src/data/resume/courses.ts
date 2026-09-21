export interface Course {
  title: string;
  university: string;
  /**
   * Course code, where the institution publishes one. Optional: relevant
   * coursework is often listed by name only, and inventing a code to satisfy
   * the type would put a false identifier on the resume.
   */
  number?: string;
  /** Course page, where one exists publicly. */
  link?: string;
}

const courses: Course[] = [
  // Singapore University of Technology and Design
  {
    title: 'Probability and Statistics',
    number: '40.017',
    link: 'https://www.sutd.edu.sg/course/40-017-probability-and-statistics',
    university: 'SUTD',
  },
  {
    title: 'Optimisation',
    number: '40.002',
    link: 'https://www.sutd.edu.sg/course/40-002-optimisation',
    university: 'SUTD',
  },
  {
    title: 'Data and Business Analytics',
    number: '40.011',
    link: 'https://www.sutd.edu.sg/course/40-011-data-and-business-analytics-for-esd-students-only',
    university: 'SUTD',
  },
  {
    title: 'Artificial Intelligence and Ethics',
    number: '02.143',
    link: 'https://www.sutd.edu.sg/course/02-143-artificial-intelligence-and-ethics/',
    university: 'SUTD',
  },

  // Temasek Polytechnic
  {
    title: 'Data Analytics',
    number: 'CIA1C10',
    link: 'https://www.tp.edu.sg/schools-and-courses/students/schools/iit/big-data-analytics.html',
    university: 'Temasek Polytechnic',
  },
  {
    title: 'Data Mining & Business Analytics',
    number: 'CDA2C02',
    link: 'https://www.tp.edu.sg/schools-and-courses/students/schools/iit/big-data-analytics.html',
    university: 'Temasek Polytechnic',
  },
  {
    title: 'Database App Development',
    number: 'CIA1C06',
    link: 'https://www.tp.edu.sg/schools-and-courses/students/schools/iit/big-data-analytics.html',
    university: 'Temasek Polytechnic',
  },
  {
    title: 'Data Structures & Algorithms',
    number: 'CIT1C14',
    link: 'https://www.tp.edu.sg/schools-and-courses/students/schools/iit/big-data-analytics.html',
    university: 'Temasek Polytechnic',
  },
];

export default courses;
