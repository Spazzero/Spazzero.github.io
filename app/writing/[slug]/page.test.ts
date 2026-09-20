import { describe, expect, it } from 'vitest';

import { SITE_URL } from '@/lib/utils';

import { generateMetadata } from './page';

describe('writing post metadata', () => {
  it('uses a trailing-slash canonical URL for posts', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'placeholder-post' }),
    });

    expect(metadata.openGraph?.url).toBe(
      `${SITE_URL}/writing/placeholder-post/`,
    );
  });

  it('uses an explicitly selected article image for social metadata', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'placeholder-post-with-image' }),
    });

    expect(metadata.openGraph?.images).toEqual([
      {
        url: `${SITE_URL}/images/writing/placeholder.png`,
        width: 1200,
        height: 630,
        alt: 'A neutral placeholder graphic standing in for an article image',
      },
    ]);
    expect(metadata.twitter?.images).toEqual(metadata.openGraph?.images);
  });
});
