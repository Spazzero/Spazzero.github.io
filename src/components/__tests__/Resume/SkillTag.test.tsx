import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

import SkillTag from '../../Resume/Skills/SkillTag';

const mockCategories = [
  { name: 'Languages', color: '#6968b3' },
  { name: 'ML Engineering', color: '#37b1f5' },
];

describe('SkillTag', () => {
  it('renders the skill title', () => {
    const skill = { title: 'Python', category: ['Languages'] };

    render(<SkillTag data={skill} categories={mockCategories} />);

    expect(screen.getByText('Python')).toBeInTheDocument();
  });

  /**
   * Tags used to be sized by a 1-5 competency rating. That was a self-assessed
   * number rendered as visual weight, so every skill now carries the same
   * emphasis and the rating is gone from the data entirely.
   */
  it('renders every tag at the same weight', () => {
    const skill = { title: 'Python', category: ['Languages'] };

    render(<SkillTag data={skill} categories={mockCategories} />);

    const tag = document.querySelector('.skill-tag') as HTMLElement;
    expect(tag.className).toBe('skill-tag');
  });

  it('does not advertise a proficiency level', () => {
    const skill = { title: 'Python', category: ['Languages'] };

    render(<SkillTag data={skill} categories={mockCategories} />);

    const tag = document.querySelector('.skill-tag') as HTMLElement;
    expect(tag).not.toHaveAttribute('title');
    expect(tag).not.toHaveAttribute('aria-label');
  });

  it('sets category color as CSS variable', () => {
    const skill = { title: 'Python', category: ['Languages'] };

    render(<SkillTag data={skill} categories={mockCategories} />);

    const tag = document.querySelector('.skill-tag') as HTMLElement;
    expect(tag.style.getPropertyValue('--tag-color')).toBe('#6968b3');
  });

  it('uses first matching category color for multi-category skills', () => {
    const skill = {
      title: 'Python',
      category: ['Languages', 'ML Engineering'],
    };

    render(<SkillTag data={skill} categories={mockCategories} />);

    const tag = document.querySelector('.skill-tag') as HTMLElement;
    // Should use Languages color since it's first in categories list
    expect(tag.style.getPropertyValue('--tag-color')).toBe('#6968b3');
  });
});
