import { describe, expect, it } from 'vitest';
import { isSidebarAnchorActive, pickActiveSectionHash } from './shell';

describe('isSidebarAnchorActive', () => {
  it('does not activate all profile anchors when there is no hash', () => {
    expect(isSidebarAnchorActive('/profile', '', 'https://example.com/profile/#founder')).toBe(false);
    expect(isSidebarAnchorActive('/profile', '', 'https://example.com/profile/#organizer')).toBe(false);
  });

  it('activates only the matching anchor when hash exists', () => {
    expect(
      isSidebarAnchorActive('/profile', '#founder', 'https://example.com/profile/#founder'),
    ).toBe(true);
    expect(
      isSidebarAnchorActive('/profile', '#founder', 'https://example.com/profile/#organizer'),
    ).toBe(false);
  });

  it('activates plain route links only when there is no active hash override', () => {
    expect(isSidebarAnchorActive('/about', '', 'https://example.com/about/')).toBe(true);
    expect(isSidebarAnchorActive('/about', '#history', 'https://example.com/about/')).toBe(false);
  });
});

describe('pickActiveSectionHash', () => {
  it('keeps the first section active near the top', () => {
    const sections = [
      { hash: '#founder', top: 120 },
      { hash: '#organizer', top: 640 },
      { hash: '#contributor', top: 1180 },
    ];
    expect(pickActiveSectionHash(sections, 350)).toBe('#founder');
  });

  it('switches to the deepest section above the trigger line', () => {
    const sections = [
      { hash: '#founder', top: -220 },
      { hash: '#organizer', top: 40 },
      { hash: '#contributor', top: 480 },
    ];
    expect(pickActiveSectionHash(sections, 350)).toBe('#organizer');
  });
});
