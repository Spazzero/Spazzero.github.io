import { describe, expect, it } from 'vitest';

import { categories, skills } from '../resume/skills';

describe('skills data', () => {
  it('exports an array of skills', () => {
    expect(Array.isArray(skills)).toBe(true);
    expect(skills.length).toBeGreaterThan(0);
  });

  it('each skill has required properties', () => {
    for (const skill of skills) {
      expect(skill).toHaveProperty('title');
      expect(skill).toHaveProperty('category');

      expect(typeof skill.title).toBe('string');
      expect(Array.isArray(skill.category)).toBe(true);
    }
  });

  it('each skill has at least one category', () => {
    for (const skill of skills) {
      expect(skill.category.length).toBeGreaterThanOrEqual(1);
    }
  });

  it('skill categories reference valid category names', () => {
    const categoryNames = categories.map((c) => c.name);

    for (const skill of skills) {
      for (const cat of skill.category) {
        expect(categoryNames).toContain(cat);
      }
    }
  });

  // Data quality: categories should be sorted for consistent UI display
  it('skill categories are sorted alphabetically for UI consistency', () => {
    for (const skill of skills) {
      const sorted = [...skill.category].sort();
      expect(skill.category).toEqual(sorted);
    }
  });
});

describe('categories data', () => {
  it('exports an array of categories', () => {
    expect(Array.isArray(categories)).toBe(true);
    expect(categories.length).toBeGreaterThan(0);
  });

  it('each category has required properties', () => {
    for (const category of categories) {
      expect(category).toHaveProperty('name');
      expect(category).toHaveProperty('color');

      expect(typeof category.name).toBe('string');
      expect(typeof category.color).toBe('string');
    }
  });

  it('category colors are valid CSS colors (hex or CSS variable)', () => {
    const hexColorRegex = /^#[0-9a-fA-F]{6}$/;
    const cssVarRegex = /^var\(--[\w-]+\)$/;

    for (const category of categories) {
      const isValidColor =
        hexColorRegex.test(category.color) || cssVarRegex.test(category.color);
      expect(isValidColor).toBe(true);
    }
  });

  // Group order is chosen for the roles being targeted, not alphabetised
  it('categories follow the curated display order', () => {
    expect(categories.map((c) => c.name)).toEqual([
      'Programming',
      'Analytics & BI',
      'Markets',
    ]);
  });

  it('every category has at least one skill', () => {
    for (const { name } of categories) {
      expect(skills.some((s) => s.category.includes(name))).toBe(true);
    }
  });

  it('each skill belongs to exactly one category', () => {
    for (const skill of skills) {
      expect(skill.category).toHaveLength(1);
    }
  });

  it('all skill categories are represented', () => {
    const usedCategories = new Set(skills.flatMap((s) => s.category));
    const availableCategories = new Set(categories.map((c) => c.name));

    for (const used of usedCategories) {
      expect(availableCategories.has(used)).toBe(true);
    }
  });

  it('has unique category names', () => {
    const names = categories.map((c) => c.name);
    const uniqueNames = new Set(names);

    expect(uniqueNames.size).toBe(names.length);
  });
});
