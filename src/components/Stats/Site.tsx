import initialData from '../../data/stats/site';
import { countSourceLines } from '../../lib/loc';
import Table from './Table';

type GitHubCacheKey = 'pushed_at';

interface GitHubData {
  pushed_at: string;
}

interface GitHubStatsResult {
  data: GitHubData;
  source: 'github' | 'fallback';
}

/**
 * Last-known value, used only when the GitHub API is unreachable at build time
 * (rate limit, offline CI, or a private repository, which returns 404 to the
 * unauthenticated fetch). It goes stale by definition — refresh it when you
 * notice, and treat a build that logs the warning below as one that shipped an
 * approximate date.
 *
 * Refreshed: 2026-09-20
 */
const FALLBACK_DATA: GitHubData = {
  pushed_at: '2026-09-20T00:00:00Z',
};

/**
 * Fetch GitHub stats at build time.
 * Uses static fallback if API is unavailable (rate limit, offline, etc.)
 *
 * `revalidate: false` is required, not preferred: `output: 'export'` needs
 * every route statically renderable, and an uncached fetch forces the route
 * dynamic — which makes this fall back on every single build.
 *
 * The staleness risk that implies is handled where it actually lives: the
 * Pages workflow does not restore `.next/cache`, so each deploy refetches.
 */
async function fetchGitHubStats(): Promise<GitHubStatsResult> {
  try {
    const token = process.env.GITHUB_TOKEN;
    const response = await fetch(
      'https://api.github.com/repos/Spazzero/Spazzero.github.io',
      {
        headers: {
          Accept: 'application/vnd.github.v3+json',
          ...(token ? { Authorization: `Bearer ${token}` } : {}),
        },
        next: { revalidate: false },
      },
    );

    if (!response.ok) {
      console.warn(`GitHub API returned ${response.status}, using fallback`);
      return { data: FALLBACK_DATA, source: 'fallback' };
    }

    const data = await response.json();
    return {
      data: { pushed_at: data.pushed_at },
      source: 'github',
    };
  } catch (error) {
    console.warn('Failed to fetch GitHub stats, using fallback:', error);
    return { data: FALLBACK_DATA, source: 'fallback' };
  }
}

/**
 * Site statistics component - fetches GitHub data at build time.
 * Server component, no client-side JavaScript shipped.
 */
export default async function SiteStats() {
  // Started before the walk so the directory scan happens during the network
  // round trip rather than after it. The Pages build deliberately runs this
  // fetch uncached every time, so the two costs would otherwise stack.
  const githubStats = fetchGitHubStats();

  // Measured from the working tree rather than typed in, so the figure
  // cannot drift away from the code it describes.
  const sourceLines = countSourceLines();
  const { data: githubData, source } = await githubStats;

  // Apply formatting and resolve values - functions can't be serialized in RSC
  const data = initialData.map((field) => {
    const rawValue =
      field.key === 'source_lines'
        ? sourceLines
        : field.key && field.key in githubData
          ? (githubData[field.key as GitHubCacheKey] ?? field.value)
          : field.value;

    // Apply format function if present, otherwise use raw value
    const value = field.format ? field.format(rawValue) : rawValue;

    // Return only serializable properties (no functions)
    return {
      label: field.label,
      value,
      link: field.link,
    };
  });

  return (
    <>
      <Table data={data} />
      <p className="stats-source-note" data-source={source}>
        {source === 'github'
          ? 'Last-updated date fetched from GitHub at build time.'
          : 'Approximate last-updated date — GitHub API unavailable; fallback refreshed September 20, 2026.'}
      </p>
    </>
  );
}
