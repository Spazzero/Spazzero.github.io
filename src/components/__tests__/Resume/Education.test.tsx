import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Education from '../../Resume/Education';
import Degree from '../../Resume/Education/Degree';

const mockDegrees = [
  {
    school: 'Singapore University of Technology and Design',
    degree: 'B.Eng. Engineering Systems Design',
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

describe('Education', () => {
  it('renders the education section with title', () => {
    render(<Education data={mockDegrees} />);

    expect(
      screen.getByRole('heading', { name: /education/i }),
    ).toBeInTheDocument();
  });

  it('renders all degrees', () => {
    render(<Education data={mockDegrees} />);

    expect(
      screen.getByText('B.Eng. Engineering Systems Design'),
    ).toBeInTheDocument();
    expect(
      screen.getByText('Diploma in Big Data & Analytics'),
    ).toBeInTheDocument();
  });

  it('renders school links', () => {
    render(<Education data={mockDegrees} />);

    const sutdLink = screen.getByRole('link', {
      name: /singapore university/i,
    });
    expect(sutdLink).toHaveAttribute('href', 'https://www.sutd.edu.sg');

    const tpLink = screen.getByRole('link', { name: /temasek/i });
    expect(tpLink).toHaveAttribute('href', 'https://www.tp.edu.sg');
  });
});

describe('Degree', () => {
  const mockDegree = {
    school: 'Singapore University of Technology and Design',
    degree: 'B.Eng. Engineering Systems Design',
    link: 'https://www.sutd.edu.sg',
    year: 2028,
  };

  it('renders degree title', () => {
    render(<Degree data={mockDegree} />);

    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(
      'B.Eng. Engineering Systems Design',
    );
  });

  it('renders school name with link', () => {
    render(<Degree data={mockDegree} />);

    const link = screen.getByRole('link', { name: /singapore university/i });
    expect(link).toHaveAttribute('href', 'https://www.sutd.edu.sg');
  });

  it('displays year', () => {
    render(<Degree data={mockDegree} />);

    expect(screen.getByText(/2028/)).toBeInTheDocument();
  });

  it('renders as article element', () => {
    render(<Degree data={mockDegree} />);

    const article = document.querySelector('article.degree-container');
    expect(article).toBeInTheDocument();
  });
});
