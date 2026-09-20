import { describe, expect, it } from 'vitest';

import { aboutMarkdown } from '../about';

describe('about data', () => {
  it('exports aboutMarkdown as a string', () => {
    expect(typeof aboutMarkdown).toBe('string');
    expect(aboutMarkdown.length).toBeGreaterThan(0);
  });

  it('contains the intro section', () => {
    expect(aboutMarkdown).toContain('# Intro');
    expect(aboutMarkdown).toContain('financial services');
    expect(aboutMarkdown).toContain('Temasek Polytechnic');
  });

  it('contains the history section', () => {
    expect(aboutMarkdown).toContain('# Some History');
    expect(aboutMarkdown).toContain('Growtopia');
  });

  it('contains valid markdown links', () => {
    // Check for markdown link format [text](url). The count used to be pinned
    // above 10, which only held for a much longer page; what matters is that
    // every link that is present is well formed.
    const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
    const links = [...aboutMarkdown.matchAll(linkRegex)];

    expect(links.length).toBeGreaterThan(0);

    for (const [, text, href] of links) {
      expect(text.trim().length).toBeGreaterThan(0);
      expect(href.trim().length).toBeGreaterThan(0);
    }
  });

  it('contains properly formatted headers', () => {
    // Check for markdown headers
    const headerRegex = /^#+ .+$/gm;
    const headers = aboutMarkdown.match(headerRegex);

    // Intro and Some History. The likes, travel, fun-facts, dreams, and
    // admired-websites sections were removed rather than rewritten.
    expect(headers).not.toBeNull();
    expect(headers!.length).toBe(2);
  });
});
