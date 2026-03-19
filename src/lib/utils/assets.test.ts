import { describe, expect, it, vi } from 'vitest';

vi.mock('$app/paths', () => ({ base: '/v2' }));

const { withBase } = await import('./assets');

describe('withBase', () => {
  it('prefixes root-relative paths with base', () => {
    expect(withBase('/images/logo.png')).toBe('/v2/images/logo.png');
  });

  it('normalizes relative paths', () => {
    expect(withBase('images/logo.png')).toBe('/v2/images/logo.png');
  });
});
