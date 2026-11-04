import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { NavComponent } from './shared/components/nav/nav.component';

/**
 * Shell: the nav stays mounted across every route (it owns its own scroll-shadow
 * and theme toggle); each page — home, blog list, a single post — renders into
 * the outlet below it. See app.routes.ts for what lives where.
 */
@Component({
  selector: 'app-root',
  imports: [NavComponent, RouterOutlet],
  template: `
    <app-nav />
    <router-outlet />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // instantiate early so a saved light/dark choice is applied immediately
  private readonly theme = inject(ThemeService);
}
