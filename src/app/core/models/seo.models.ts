export interface PageSeo {
  title: string;
  description: string;
  /** site-relative, leading slash — e.g. '/', '/blog', '/blog/my-post' */
  path: string;
  type?: 'website' | 'article';
  /** site-relative, leading slash — defaults to the site's general share image */
  image?: string;
  /** ISO date, 'article' only */
  publishedTime?: string;
  /** hides the page from search results — used for the blog "post not found" state */
  noindex?: boolean;
}
