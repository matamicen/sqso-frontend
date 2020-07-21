// postbuild.js
const fs = require('fs');
const pathToEntry = './build/index.html';
const bundlesRegExp = /\/static\/\w+\/\w+.[a-z0-9]+.\w{2,3}/g;

const builtHTMLContent = fs.readFileSync(pathToEntry).toString();
const links = builtHTMLContent.match(bundlesRegExp);

const linkAs = {
  css: 'style',
  js: 'script'
}
const linkPreloads = links.map(link =>
  `<link rel="preload" as="${linkAs[link.split('.').pop()]}" href="${link}">`
).join('');

const htmlWithPreload = builtHTMLContent.replace(
  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
  '<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">' + linkPreloads
)

fs.writeFileSync(pathToEntry, htmlWithPreload);