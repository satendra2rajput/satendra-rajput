import { ChangeDetectionStrategy, Component, computed, effect, inject, input, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS, PROFILE, SITE_URL } from '../../../core/data/portfolio.data';
import { ClipboardService } from '../../../core/services/clipboard.service';
import { SeoService } from '../../../core/services/seo.service';
import { SpotlightDirective } from '../../../shared/directives/spotlight.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { BlogDatePipe } from '../../../shared/pipes/blog-date.pipe';

@Component({
  selector: 'app-blog-post',
  imports: [RouterLink, RevealDirective, BlogDatePipe, SpotlightDirective],
  templateUrl: './blog-post.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogPostComponent {
  /** bound straight from the ':slug' route param — see withComponentInputBinding() in app.config.ts */
  readonly slug = input('');
  protected readonly post = computed(() => BLOG_POSTS.find((p) => p.slug === this.slug()));

  /** BLOG_POSTS is newest-first, so the previous array entry is the newer post and the next one is older. */
  protected readonly newer = computed(() => {
    const i = BLOG_POSTS.findIndex((p) => p.slug === this.slug());
    return i > 0 ? BLOG_POSTS[i - 1] : undefined;
  });
  protected readonly older = computed(() => {
    const i = BLOG_POSTS.findIndex((p) => p.slug === this.slug());
    return i >= 0 && i < BLOG_POSTS.length - 1 ? BLOG_POSTS[i + 1] : undefined;
  });

  protected readonly author = PROFILE.name;
  protected readonly copied = signal(false);

  private readonly seo = inject(SeoService);
  private readonly clipboard = inject(ClipboardService);
  private copyTimer = 0;

  constructor() {
    effect(() => {
      const p = this.post();
      if (!p) {
        this.seo.set({ title: 'Post not found — Satendra Rajput', description: 'This blog post could not be found.', path: `/blog/${this.slug()}`, noindex: true });
        this.seo.setJsonLd(null);
        return;
      }
      this.seo.set({
        title: `${p.title} — Satendra Rajput`,
        description: p.excerpt,
        path: `/blog/${p.slug}`,
        type: 'article',
        publishedTime: p.date,
      });
      this.seo.setJsonLd({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: p.title,
        description: p.excerpt,
        datePublished: p.date,
        articleSection: p.tag,
        image: `${SITE_URL}/assets/images/og-image.png`,
        url: `${SITE_URL}/blog/${p.slug}`,
        mainEntityOfPage: `${SITE_URL}/blog/${p.slug}`,
        author: { '@type': 'Person', name: PROFILE.name, url: SITE_URL },
      });
    });
  }

  protected async copyLink(): Promise<void> {
    const p = this.post();
    if (!p) return;
    const ok = await this.clipboard.copy(`${SITE_URL}/blog/${p.slug}`);
    if (!ok) return;
    this.copied.set(true);
    clearTimeout(this.copyTimer);
    this.copyTimer = window.setTimeout(() => this.copied.set(false), 1800);
  }
}
