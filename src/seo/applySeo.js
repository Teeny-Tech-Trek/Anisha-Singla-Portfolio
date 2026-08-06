  // Mutates document.head to match the given route's SEO metadata. Runs on the
  // client so that (a) the visible tab title/meta stay correct across
  // client-side navigation, and (b) JS-executing crawlers see per-route tags
  // in the final DOM. Non-JS crawlers and link-unfurlers get the same data
  // baked directly into the static HTML by scripts/prerender.js instead.

  function upsertMeta(selector, attrs) {
    let el = document.head.querySelector(selector);
    if (!el) {
      el = document.createElement('meta');
      Object.entries(attrs).forEach(([key, value]) => {
        if (key !== 'content') el.setAttribute(key, value);
      });
      document.head.appendChild(el);
    }
    el.setAttribute('content', attrs.content);
  }

  function upsertCanonical(href) {
    let el = document.head.querySelector('link[rel="canonical"]');
    if (!el) {
      el = document.createElement('link');
      el.setAttribute('rel', 'canonical');
      document.head.appendChild(el);
    }
    el.setAttribute('href', href);
  }

  function replaceJsonLd(entries) {
    document.head.querySelectorAll('script[data-seo="jsonld"]').forEach(el => el.remove());
    entries.forEach(entry => {
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.setAttribute('data-seo', 'jsonld');
      script.textContent = JSON.stringify(entry);
      document.head.appendChild(script);
    });
  }

  export function applySeo(meta) {
    if (typeof document === 'undefined' || !meta) return;

    document.title = meta.title;

    upsertMeta('meta[name="description"]', { name: 'description', content: meta.description });
    upsertCanonical(meta.canonical);
    upsertMeta('meta[name="robots"]', { name: 'robots', content: meta.robots });

    upsertMeta('meta[property="og:type"]', { property: 'og:type', content: meta.og.type });
    upsertMeta('meta[property="og:url"]', { property: 'og:url', content: meta.og.url });
    upsertMeta('meta[property="og:title"]', { property: 'og:title', content: meta.og.title });
    upsertMeta('meta[property="og:description"]', { property: 'og:description', content: meta.og.description });
    upsertMeta('meta[property="og:image"]', { property: 'og:image', content: meta.og.image });

    upsertMeta('meta[name="twitter:card"]', { name: 'twitter:card', content: meta.twitter.card });
    upsertMeta('meta[name="twitter:title"]', { name: 'twitter:title', content: meta.twitter.title });
    upsertMeta('meta[name="twitter:description"]', { name: 'twitter:description', content: meta.twitter.description });
    upsertMeta('meta[name="twitter:image"]', { name: 'twitter:image', content: meta.twitter.image });

    replaceJsonLd(meta.jsonLd || []);
  }
