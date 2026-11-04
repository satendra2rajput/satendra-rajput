import { Routes } from '@angular/router';

/** Page titles, meta tags and canonical URLs are set per page by SeoService (see core/services/seo.service.ts). */
export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'blog',
    loadComponent: () => import('./features/blog/blog-list/blog-list.component').then((m) => m.BlogListComponent),
  },
  {
    path: 'blog/:slug',
    loadComponent: () => import('./features/blog/blog-post/blog-post.component').then((m) => m.BlogPostComponent),
  },
  { path: '**', redirectTo: '' },
];
