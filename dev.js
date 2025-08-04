import { createServer as createViteServer } from 'vite';
import browserSync from 'browser-sync';
import { spawn } from 'child_process';
import path from 'path';

const ELEVENTY_OUTPUT = path.resolve('_site');

async function startDevServer() {
  const vite = await createViteServer({
    root: process.cwd(),
    server: { middlewareMode: true },
    appType: 'custom' // ✅ Needed to prevent HTML rewrites
  });

  // Start Eleventy in watch mode
  const eleventy = spawn('npx', ['eleventy', '--watch'], {
    stdio: 'inherit'
  });

  // Start Browsersync server
  const bs = browserSync.create();
  bs.init({
    server: ELEVENTY_OUTPUT,
    middleware: [vite.middlewares],
    files: [`${ELEVENTY_OUTPUT}/**/*.*`],
    port: 8080,
    open: true,
    notify: false
  });

  process.on('SIGINT', () => {
    eleventy.kill();
    bs.exit();
    process.exit();
  });
}

startDevServer();
