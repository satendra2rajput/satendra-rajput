import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BLOG_POSTS, SITE_URL } from '../../../core/data/portfolio.data';
import { SeoService } from '../../../core/services/seo.service';
import { SpotlightDirective } from '../../../shared/directives/spotlight.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { BlogDatePipe } from '../../../shared/pipes/blog-date.pipe';

@Component({
  selector: 'app-blog-list',
  imports: [RouterLink, RevealDirective, BlogDatePipe, SpotlightDirective],
  templateUrl: './blog-list.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BlogListComponent {
  private readonly seo = inject(SeoService);

  protected readonly posts = BLOG_POSTS;

  constructor() {
    this.seo.set({
      title: 'Blog — Satendra Rajput',
      description: 'Notes on Angular, Java and building things — Serotask, publishing npm libraries, fintech engineering and career growth.',
      path: '/blog',
      image: '/assets/images/og-blog.png',
    });
    this.seo.setJsonLd({
      '@context': 'https://schema.org',
      '@type': 'Blog',
      name: 'Satendra Rajput — Blog',
      url: `${SITE_URL}/blog`,
      blogPost: this.posts.map((p) => ({
        '@type': 'BlogPosting',
        headline: p.title,
        url: `${SITE_URL}/blog/${p.slug}`,
        datePublished: p.date,
      })),
    });
  }
}
