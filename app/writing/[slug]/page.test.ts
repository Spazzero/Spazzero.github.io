import { afterEach, describe, expect, it, vi } from 'vitest';

import { getPostSlugs } from '@/lib/posts';
import { SITE_URL } from '@/lib/utils';

import { generateMetadata } from './page';

afterEach(() => {
  vi.unstubAllEnvs();
});

describe('writing post metadata', () => {
  it('uses a trailing-slash canonical URL for posts', async () => {
    // Any published post: pinning a filename turns this into a test of the
    // current content rather than of the URL shape.
    const [slug] = getPostSlugs();
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: slug! }),
    });

    expect(metadata.openGraph?.url).toBe(`${SITE_URL}/writing/${slug}/`);
  });

  it('does not describe a draft outside development', async () => {
    const metadata = await generateMetadata({
      params: Promise.resolve({ slug: 'placeholder-post' }),
    });

    expect(metadata.title).toBe('Post Not Found');
    expect(metadata.openGraph).toBeUndefined();
  });

  it('uses an explicitly selected article image for social metadata', async () => {
    // The only post carrying an `image` is a draft fixture, which is visible
    // under `next dev`.
    vi.stubEnv('NODE_ENV', 'development');

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
