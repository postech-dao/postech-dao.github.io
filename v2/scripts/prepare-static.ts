import { cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import { join } from 'node:path';

const ROOT = join(import.meta.dirname, '..', '..');
const APP = join(import.meta.dirname, '..');
const STATIC = join(APP, 'static');

function resetDir(path: string): void {
  rmSync(path, { recursive: true, force: true });
  mkdirSync(path, { recursive: true });
}

mkdirSync(STATIC, { recursive: true });
resetDir(join(STATIC, 'images'));
resetDir(join(STATIC, 'locales'));
mkdirSync(join(STATIC, 'assets', 'data'), { recursive: true });

cpSync(join(ROOT, 'images'), join(STATIC, 'images'), { recursive: true });
cpSync(join(ROOT, 'locales'), join(STATIC, 'locales'), { recursive: true });

const banner = join(ROOT, 'banner.png');
if (existsSync(banner)) {
  cpSync(banner, join(STATIC, 'banner.png'));
}
