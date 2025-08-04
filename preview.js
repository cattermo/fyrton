import browserSync from 'browser-sync';

browserSync.create().init({
  server: '_site',
  files: ['_site/**/*.*'],
  port: 8080,
  open: true,
  notify: false
});
