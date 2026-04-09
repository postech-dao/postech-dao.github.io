import { describe, expect, it } from 'vitest';
import { buildProfileSearchUrl, readProfileSearch } from './profile-search';

describe('readProfileSearch', () => {
  it('returns the current search query from the url', () => {
    expect(
      readProfileSearch(new URL('https://dao.postech.ac.kr/profile/?search=Junha%20Yang')),
    ).toBe('Junha Yang');
  });

  it('falls back to an empty query when the parameter is missing', () => {
    expect(readProfileSearch(new URL('https://dao.postech.ac.kr/profile/'))).toBe('');
  });
});

describe('buildProfileSearchUrl', () => {
  it('adds the trimmed search query to the current url', () => {
    expect(
      buildProfileSearchUrl(
        new URL('https://dao.postech.ac.kr/profile/#archive'),
        '  Junha Yang  ',
      ),
    ).toBe('/profile/?search=Junha+Yang#archive');
  });

  it('removes the search query when it is empty', () => {
    expect(
      buildProfileSearchUrl(new URL('https://dao.postech.ac.kr/profile/?search=Junha+Yang'), '   '),
    ).toBe('/profile/');
  });
});
