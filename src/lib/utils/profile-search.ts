export const PROFILE_SEARCH_PARAM = 'search';
export const PROFILE_SEARCH_HASH = '#archive';

export function readProfileSearch(url: URL): string {
  return url.searchParams.get(PROFILE_SEARCH_PARAM) ?? '';
}

export function buildProfileSearchUrl(url: URL, query: string): string {
  const nextUrl = new URL(url);
  const normalizedQuery = query.trim();

  if (normalizedQuery) {
    nextUrl.searchParams.set(PROFILE_SEARCH_PARAM, normalizedQuery);
    nextUrl.hash = PROFILE_SEARCH_HASH;
  } else {
    nextUrl.searchParams.delete(PROFILE_SEARCH_PARAM);
  }

  return `${nextUrl.pathname}${nextUrl.search}${nextUrl.hash}`;
}
