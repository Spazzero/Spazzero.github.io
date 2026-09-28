export interface Degree {
  school: string;
  degree: string;
  link: string;
  year: number;
}

// `year` is the completion year. SUTD is still in progress, so its entry
// carries the expected graduation year; the ordering test only requires
// most-recent-first.
const degrees: Degree[] = [
  {
    school: 'Singapore University of Technology and Design',
    degree:
      'B.Eng. Engineering Systems Design — Business Analytics & Financial Services Track',
    link: 'https://www.sutd.edu.sg',
    year: 2028,
  },
  {
    school: 'Temasek Polytechnic',
    degree: 'Diploma in Big Data & Analytics',
    link: 'https://www.tp.edu.sg',
    year: 2022,
  },
];

export default degrees;
