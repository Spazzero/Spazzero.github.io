import dayjs from 'dayjs';

import { StatData } from '../../components/Stats/types';

/* Keys match keys returned by the github api. To see everything returned, run:
 curl https://api.github.com/repos/Spazzero/Spazzero.github.io
 */
const data: StatData[] = [
  {
    label: 'Last updated at',
    key: 'pushed_at',
    link: 'https://github.com/Spazzero/Spazzero.github.io/commits',
    format: (x: unknown) => dayjs(x as string).format('MMMM DD, YYYY'),
  },
  {
    // Counted from the working tree at build time by `Site.tsx`; see
    // `src/lib/loc.ts`. Do not hardcode a number here — the previous one
    // drifted by nearly 2,000 lines before anyone noticed.
    label: 'Lines of TypeScript powering this website',
    key: 'source_lines',
    link: 'https://github.com/Spazzero/Spazzero.github.io/graphs/contributors',
  },
];

export default data;
