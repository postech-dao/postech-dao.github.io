import adapter from '@sveltejs/adapter-static';

function normalizeBase(value = '') {
  if (!value || value === '/') return '';
  return `/${value.replace(/^\/+|\/+$/g, '')}`;
}

const base = normalizeBase(process.env.PUBLIC_BASE_PATH ?? '');

const config = {
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      precompress: false,
    }),
    paths: {
      base,
    },
  },
};

export default config;
