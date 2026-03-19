import { describe, expect, it } from 'vitest';
import { isSidebarAnchorActive } from './shell';

describe('isSidebarAnchorActive', () => {
  it('does not activate all profile anchors when there is no hash', () => {
    expect(isSidebarAnchorActive('/profile', '', 'https://example.com/profile/#founder')).toBe(false);
    expect(isSidebarAnchorActive('/profile', '', 'https://example.com/profile/#organizer')).toBe(false);
  });

  it('activates only the matching anchor when hash exists', () => {
    expect(isSidebarAnchorActive('/profile', '#founder', 'https://example.com/profile/#founder')).toBe(true);
    expect(isSidebarAnchorActive('/profile', '#founder', 'https://example.com/profile/#organizer')).toBe(false);
  });

  it('activates plain route links only when there is no hash', () => {
    expect(isSidebarAnchorActive('/about', '', 'https://example.com/about/')).toBe(true);
    expect(isSidebarAnchorActive('/about', '#history', 'https://example.com/about/')).toBe(false);
  });
});
