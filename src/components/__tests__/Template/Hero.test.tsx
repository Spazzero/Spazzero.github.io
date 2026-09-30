import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import Hero from '../../Template/Hero';

describe('Hero', () => {
  it('renders the hero section', () => {
    render(<Hero />);

    const heroSection = document.querySelector('.hero');
    expect(heroSection).toBeInTheDocument();
  });

  it('displays the name as heading', () => {
    render(<Hero />);

    const heading = screen.getByRole('heading', { level: 1 });
    expect(heading).toHaveTextContent('Gerald Yuen');
  });

  it('describes the current focus and links to the university', () => {
    const { container } = render(<Hero />);

    const universityLink = screen.getByRole('link', { name: 'SUTD' });
    expect(universityLink).toHaveAttribute('href', 'https://www.sutd.edu.sg');
    expect(universityLink).toHaveClass('hero-highlight');

    expect(container.querySelector('.hero-tagline')).toHaveTextContent(
      "Currently building data systems for financial markets. My background spans programming, machine learning and data analytics, and I've been investing and trading since I was 16. I study Engineering Systems Design at SUTD. Right now, I'm preparing for CFA Level I and the Claude Certified Developer exam.",
    );
  });

  it('keeps personal stats and incomplete credential lists off the homepage', () => {
    const { container } = render(<Hero />);

    expect(container.querySelector('.telemetry')).not.toBeInTheDocument();
    expect(container.querySelector('.hero-chips')).not.toBeInTheDocument();
    expect(screen.queryByText('Countries visited')).not.toBeInTheDocument();
    expect(screen.queryByText('Computing since')).not.toBeInTheDocument();
    expect(screen.queryByText('Based in')).not.toBeInTheDocument();
    // A named credential from this site's own resume data, so the check still
    // guards something. Asserting the upstream author's schools stayed absent
    // would pass no matter what the hero rendered. SUTD is named in the
    // tagline prose, so it is no longer part of this check.
    expect(screen.queryByText('Temasek Polytechnic')).not.toBeInTheDocument();
  });

  it('renders one primary CTA and one quieter resume link', () => {
    render(<Hero />);

    const aboutButton = screen.getByRole('link', { name: /about me/i });
    expect(aboutButton).toHaveAttribute('href', '/about');
    expect(aboutButton).toHaveClass('button');

    const resumeButton = screen.getByRole('link', { name: /view resume/i });
    expect(resumeButton).toHaveAttribute('href', '/resume');
    expect(resumeButton).toHaveClass('hero-resume-link');
    expect(resumeButton).not.toHaveClass('button');
  });

  it('has decorative background elements', () => {
    render(<Hero />);

    const bg = document.querySelector('.hero-bg');
    expect(bg).toBeInTheDocument();
    expect(bg).toHaveAttribute('aria-hidden', 'true');
  });
});
