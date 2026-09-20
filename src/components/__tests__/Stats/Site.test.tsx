import { render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';

// Mock the fetch function
const mockGitHubData = {
  pushed_at: '2024-06-01T00:00:00Z',
};

// Must mock before importing the component
vi.stubGlobal(
  'fetch',
  vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockGitHubData),
    }),
  ),
);

// Import after mocking
import Site from '../../Stats/Site';

describe('Site', () => {
  beforeEach(() => {
    vi.mocked(global.fetch).mockClear();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('renders the site stats table', async () => {
    const Component = await Site();
    render(Component);

    expect(screen.getByRole('table')).toBeInTheDocument();
  });

  /**
   * The repository-popularity rows (stars, watchers, forks, open issues) and
   * the joke rows were removed. What remains is the last-updated date and a
   * line count measured from the working tree.
   */
  it('displays the stats that are kept', async () => {
    const Component = await Site();
    render(Component);

    expect(screen.getByText('Last updated at')).toBeInTheDocument();
    expect(
      screen.getByText('Lines of TypeScript powering this website'),
    ).toBeInTheDocument();
  });

  it('does not advertise repository popularity', async () => {
    const Component = await Site();
    render(Component);

    for (const label of [
      'Stars this repository has on github',
      'Number of people watching this repository',
      'Number of forks',
      'Number of spoons',
      'Number of linter warnings',
      'Open github issues and pull requests',
    ]) {
      expect(screen.queryByText(label)).not.toBeInTheDocument();
    }
  });

  it('fetches GitHub data at build time', async () => {
    await Site();

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.github.com/repos/Spazzero/Spazzero.github.io',
      expect.objectContaining({
        headers: expect.objectContaining({
          Accept: 'application/vnd.github.v3+json',
        }),
      }),
    );
  });

  it('formats the fetched push date rather than printing the raw timestamp', async () => {
    const Component = await Site();
    render(Component);

    expect(screen.getByText('June 01, 2024')).toBeInTheDocument();
    expect(
      screen.queryByText(mockGitHubData.pushed_at),
    ).not.toBeInTheDocument();
  });

  it('has links for GitHub-sourced stats', async () => {
    const Component = await Site();
    render(Component);

    const links = document.querySelectorAll(
      'a[href="https://github.com/Spazzero/Spazzero.github.io/commits"]',
    );
    expect(links.length).toBeGreaterThan(0);
  });

  it('counts source lines from the working tree', async () => {
    const Component = await Site();
    const { container } = render(Component);

    const row = [...container.querySelectorAll('tr')].find((tr) =>
      tr.textContent?.includes('Lines of TypeScript'),
    );

    // Measured at build time, so pin the shape rather than a brittle figure.
    expect(row?.textContent).toMatch(/\d/);
  });

  it('uses fallback data when fetch fails', async () => {
    vi.mocked(global.fetch).mockRejectedValueOnce(new Error('Network error'));

    const Component = await Site();
    render(Component);

    expect(screen.getByRole('table')).toBeInTheDocument();
    expect(screen.getByText(/approximate last-updated date/i)).toHaveAttribute(
      'data-source',
      'fallback',
    );
  });

  it('labels live GitHub readings with their provenance', async () => {
    const Component = await Site();
    render(Component);

    expect(
      screen.getByText(/fetched from github at build time/i),
    ).toHaveAttribute('data-source', 'github');
  });
});
