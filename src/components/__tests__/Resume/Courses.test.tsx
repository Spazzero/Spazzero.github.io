import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Courses from '../../Resume/Courses';
import Course from '../../Resume/Courses/Course';

// The third entry deliberately carries neither a number nor a link: coursework
// is often published by name only, and both fields are optional.
const mockCourses = [
  {
    title: 'Optimisation',
    number: '40.002',
    link: 'https://www.sutd.edu.sg/course/40-002-optimisation',
    university: 'SUTD',
  },
  {
    title: 'Probability and Statistics',
    number: '40.017',
    link: 'https://www.sutd.edu.sg/course/40-017-probability-and-statistics',
    university: 'SUTD',
  },
  {
    title: 'Data Analytics',
    university: 'Temasek Polytechnic',
  },
];

describe('Courses', () => {
  it('renders the courses section with title', () => {
    render(<Courses data={mockCourses} />);

    expect(
      screen.getByRole('heading', { name: /selected courses/i }),
    ).toBeInTheDocument();
  });

  it('renders all courses', () => {
    render(<Courses data={mockCourses} />);

    expect(screen.getByText('Optimisation')).toBeInTheDocument();
    expect(screen.getByText('Probability and Statistics')).toBeInTheDocument();
    expect(screen.getByText('Data Analytics')).toBeInTheDocument();
  });

  it('renders course numbers where a course declares one', () => {
    render(<Courses data={mockCourses} />);

    expect(screen.getByText(/40\.002/)).toBeInTheDocument();
    expect(screen.getByText(/40\.017/)).toBeInTheDocument();
  });

  it('renders a course with no number as a plain, unlinked entry', () => {
    render(<Courses data={mockCourses} />);

    const entry = screen.getByText('Data Analytics');

    // A bare ":" and an anchor pointing nowhere is what the optional fields
    // exist to avoid.
    expect(entry.textContent).not.toContain(':');
    expect(entry.closest('a')).toBeNull();
  });

  it('renders courses as list items', () => {
    render(<Courses data={mockCourses} />);

    const list = screen.getByRole('list');
    expect(list).toBeInTheDocument();

    const items = screen.getAllByRole('listitem');
    expect(items.length).toBe(mockCourses.length);
  });

  it('sorts courses by university then number', () => {
    const unsortedCourses = [mockCourses[2], mockCourses[1], mockCourses[0]];

    render(<Courses data={unsortedCourses} />);

    const items = screen.getAllByRole('listitem');
    expect(items.map((item) => item.textContent)).toEqual([
      'Data Analytics',
      '40.002:Optimisation',
      '40.017:Probability and Statistics',
    ]);
  });

  it('does not mutate the source array while sorting', () => {
    const unsortedCourses = [
      { ...mockCourses[2] },
      { ...mockCourses[1] },
      { ...mockCourses[0] },
    ];
    const originalOrder = unsortedCourses.map((course) => course.title);

    render(<Courses data={unsortedCourses} />);

    expect(unsortedCourses.map((course) => course.title)).toEqual(
      originalOrder,
    );
  });
});

describe('Course', () => {
  const mockCourse = {
    title: 'Optimisation',
    number: '40.002',
    link: 'https://www.sutd.edu.sg/course/40-002-optimisation',
    university: 'SUTD',
  };

  it('renders course number and title', () => {
    render(<Course data={mockCourse} />);

    expect(screen.getByText(/40\.002/)).toBeInTheDocument();
    expect(screen.getByText('Optimisation')).toBeInTheDocument();
  });

  it('renders course as link', () => {
    render(<Course data={mockCourse} />);

    const link = screen.getByRole('link');
    expect(link).toHaveAttribute('href', mockCourse.link);
  });

  it('renders as list item', () => {
    render(<Course data={mockCourse} />);

    const item = screen.getByRole('listitem');
    expect(item).toBeInTheDocument();
  });

  it('does not create a phantom heading for the course code', () => {
    render(<Course data={mockCourse} />);

    expect(screen.queryByRole('heading')).not.toBeInTheDocument();
  });
});
