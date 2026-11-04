import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';

/**
 * Angular 22 is zoneless by default — there is no zone.js and no provideZoneChangeDetection().
 * Every piece of UI state in this app lives in a signal, which is what schedules change detection.
 */
export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(
      routes,
      // route params (e.g. :slug) land straight on a matching component `input()` — no ActivatedRoute needed
      withComponentInputBinding(),
      // `routerLink="/" fragment="skills"` scrolls to #skills, and back/forward restores scroll position
      withInMemoryScrolling({ anchorScrolling: 'enabled', scrollPositionRestoration: 'enabled' }),
    ),
  ],
};
