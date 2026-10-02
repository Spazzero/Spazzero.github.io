import Link from 'next/link';

import profile from '@/data/profile.json';

import ThemePortrait from './ThemePortrait';

export default function Hero() {
  return (
    <section className="hero">
      <div className="hero-grid">
        <div className="hero-primary">
          <h1 className="hero-title">
            <span className="hero-name">{profile.name}</span>
          </h1>

          <p className="hero-tagline">
            I've been into markets since 16, and now I build data systems for them using machine
            learning, analytics and engineering. I'm studying Systems Engineering at{' '}
            <a href="https://www.sutd.edu.sg" className="hero-highlight">
              SUTD
            </a>{' '}
            and preparing for CFA Level 1 and the{' '}
            <a
              href="https://anthropic-partners.skilljar.com/claude-certified-developer-foundations-certification"
              className="hero-highlight"
            >
              Claude Certified Developer
            </a>{' '}
            exam.
          </p>

          <div className="hero-cta">
            <Link href="/about" className="button">
              About Me
            </Link>
            <Link href="/resume" className="hero-resume-link">
              View Resume
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>

        <div className="hero-portrait">
          <ThemePortrait width={320} height={320} priority />
        </div>
      </div>

      <div className="hero-bg" aria-hidden="true" />
    </section>
  );
}
