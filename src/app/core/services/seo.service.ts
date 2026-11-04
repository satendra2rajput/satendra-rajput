import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { PROFILE, SITE_URL } from '../data/portfolio.data';
import { PageSeo } from '../models/seo.models';

const DEFAULT_IMAGE = '/assets/images/og-image.png';
const JSONLD_ID = 'seo-jsonld';

/**
 * Keeps <title>, meta description, Open Graph / Twitter tags, the canonical
 * link and one JSON-LD block in sync with whatever page is active. Angular
 * is client-rendered here, so this only helps crawlers that execute JS (which
 * covers Googlebot) and anything reading the tags after render (social-share
 * unfurlers do not run JS, so they'll only ever see index.html's static
 * defaults — fine for the home page, but it's why a server-rendered or
 * prerendered build matters most for the blog post share cards).
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  set(page: PageSeo): void {
    const url = SITE_URL + page.path;
    const image = SITE_URL + (page.image ?? DEFAULT_IMAGE);
    const type = page.type ?? 'website';

    this.title.setTitle(page.title);
    this.upsert('description', page.description);
    this.upsert('robots', page.noindex ? 'noindex, nofollow' : 'index, follow');

    this.upsertProperty('og:type', type);
    this.upsertProperty('og:url', url);
    this.upsertProperty('og:title', page.title);
    this.upsertProperty('og:description', page.description);
    this.upsertProperty('og:image', image);
    this.upsertProperty('og:site_name', PROFILE.name);

    this.upsert('twitter:card', 'summary_large_image');
    this.upsert('twitter:title', page.title);
    this.upsert('twitter:description', page.description);
    this.upsert('twitter:image', image);

    if (page.type === 'article' && page.publishedTime) {
      this.upsertProperty('article:published_time', page.publishedTime);
    } else {
      this.meta.removeTag("property='article:published_time'");
    }

    this.setCanonical(url);
  }

  /** Renders one `<script type="application/ld+json">` block; pass null to remove it. */
  setJsonLd(data: object | null): void {
    this.doc.getElementById(JSONLD_ID)?.remove();
    if (!data) return;
    const script = this.doc.createElement('script');
    script.id = JSONLD_ID;
    script.type = 'application/ld+json';
    script.text = JSON.stringify(data);
    this.doc.head.appendChild(script);
  }

  private setCanonical(url: string): void {
    let link = this.doc.querySelector<HTMLLinkElement>("link[rel='canonical']");
    if (!link) {
      link = this.doc.createElement('link');
      link.setAttribute('rel', 'canonical');
      this.doc.head.appendChild(link);
    }
    link.setAttribute('href', url);
  }

  private upsert(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private upsertProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }
}
