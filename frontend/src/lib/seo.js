// Dynamic SEO helper: updates canonical + og/twitter meta tags per page.
// Fixes Soft 404 & "Alternate page with proper canonical tag" issues in Search Console
// caused by all pages inheriting the home canonical from public/index.html.

var SITE_URL = 'https://golfgatecatalunya.com';

function upsertMeta(selector, attr, value, content) {
  var el = document.head.querySelector(selector);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, value);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

function upsertLink(rel, href) {
  var el = document.head.querySelector('link[rel="' + rel + '"]');
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

export function setSEO(opts) {
  opts = opts || {};
  var path = opts.path || (typeof window !== 'undefined' ? window.location.pathname : '/');
  var canonical = SITE_URL + (path === '/' ? '' : path);
  var title = opts.title || 'GOLFGATE Catalunya';
  var description = opts.description || 'Book tee times at 20 premier golf courses in Catalunya, Spain.';
  var image = opts.image || (SITE_URL + '/golfgate-logo-transparent.png');

  document.title = title;
  upsertLink('canonical', canonical);
  upsertMeta('meta[name="description"]', 'name', 'description', description);
  upsertMeta('meta[property="og:url"]', 'property', 'og:url', canonical);
  upsertMeta('meta[property="og:title"]', 'property', 'og:title', title);
  upsertMeta('meta[property="og:description"]', 'property', 'og:description', description);
  upsertMeta('meta[property="og:image"]', 'property', 'og:image', image);
  upsertMeta('meta[name="twitter:title"]', 'name', 'twitter:title', title);
  upsertMeta('meta[name="twitter:description"]', 'name', 'twitter:description', description);
  upsertMeta('meta[name="twitter:image"]', 'name', 'twitter:image', image);
}
