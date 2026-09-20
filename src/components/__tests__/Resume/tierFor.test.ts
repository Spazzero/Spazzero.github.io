import { describe, expect, it } from 'vitest';

import type { Position } from '@/data/resume/work';
import { tierFor } from '../../Resume/Experience';

function position(overrides: Partial<Position> = {}): Position {
  return {
    name: 'Acme Corp',
    position: 'Senior Engineer',
    url: 'https://acme.com',
    startDate: '2020-01-01',
    endDate: '2023-01-01',
    ...overrides,
  };
}

describe('tierFor', () => {
  it('leads with the newest substantive role regardless of array position', () => {
    const older = position({
      name: 'Older Corp',
      startDate: '2020-01-01',
    });
    const newest = position({
      name: 'Newest Corp',
      position: 'Co-founder & CTO',
      startDate: '2026-03-09',
    });
    const positions = [older, newest];

    expect(tierFor(newest, positions)).toBe('lead');
    expect(tierFor(older, positions)).toBe('primary');
  });

  it('reads the year from the ISO string rather than parsing to local time', () => {
    // `new Date('2013-01-01')` is UTC midnight, which getFullYear() renders
    // as 2012 anywhere west of Greenwich — moving the student-era boundary
    // with the reader's timezone.
    expect(
      tierFor(position({ position: 'Engineer', endDate: '2013-01-01' }), []),
    ).toBe('primary');
    expect(
      tierFor(position({ position: 'Engineer', endDate: '2012-12-31' }), []),
    ).toBe('early');
  });

  it('weights an internship by its dates, not its title', () => {
    // A title-based rule inverted the hierarchy on a resume whose substantive
    // roles are internships, so only the student-era cutoff steps a role down.
    const newest = position({
      position: 'Data Engineer Intern',
      startDate: '2026-09-01',
    });
    const older = position({
      position: 'Analyst Intern',
      startDate: '2026-01-01',
      endDate: '2026-04-30',
    });

    expect(tierFor(newest, [newest, older])).toBe('lead');
    expect(tierFor(older, [newest, older])).toBe('primary');
  });

  it('steps student-era roles down even when not titled intern', () => {
    expect(
      tierFor(
        position({ position: 'Program Manager', endDate: '2012-05-01' }),
        [],
      ),
    ).toBe('early');
  });

  it('keeps substantive roles at full weight', () => {
    const newer = position({ name: 'Newer', startDate: '2026-01-01' });
    const role = position({
      name: 'Acme Corp',
      position: 'Co-founder & CTO',
      startDate: '2024-01-01',
    });

    expect(tierFor(role, [newer, role])).toBe('primary');
  });

  it('treats an ongoing role as primary when it is not the newest', () => {
    expect(
      tierFor(
        position({
          name: 'Side Fund',
          position: 'Co-founder',
          startDate: '2017-01-01',
          endDate: undefined,
        }),
        [
          position({ name: 'Current Job', startDate: '2026-01-01' }),
          position({
            name: 'Side Fund',
            position: 'Co-founder',
            startDate: '2017-01-01',
            endDate: undefined,
          }),
        ],
      ),
    ).toBe('primary');
  });
});
