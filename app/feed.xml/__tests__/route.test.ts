import { describe, expect, it } from 'vitest';
import { SITE_URL } from '@/lib/utils';
import { getWritingItems } from '@/lib/writing';

import { GET } from '../route';

describe('feed.xml route', () => {
  it('uses canonical trailing-slash links for writing pages', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/writing/`);
    expect(xml).toContain(`${SITE_URL}/writing/placeholder-post/`);
  });

  it('keeps the feed self link file-like', async () => {
    const response = await GET();
    const xml = await response.text();

    expect(xml).toContain(`${SITE_URL}/feed.xml`);
    expect(xml).not.toContain(`${SITE_URL}/feed.xml/`);
  });

  it('derives lastBuildDate from content rather than the build clock', async () => {
    const response = await GET();
    const xml = await response.text();

    // Pinned to the newest dated item rather than a literal date, so replacing
    // the content does not silently turn this into a no-op. The midday UTC
    // stamp is what proves it came from a date string: a build-clock value
    // would carry the actual time of the run.
    const newest = getWritingItems().find((item) => item.date);
    const expected = new Date(`${newest?.date}T12:00:00Z`).toUTCString();

    expect(expected).toMatch(/ 12:00:00 GMT$/);
    expect(xml).toContain(`<lastBuildDate>${expected}</lastBuildDate>`);
  });
});
