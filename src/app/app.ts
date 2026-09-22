import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ThemeService } from './core/services/theme.service';
import { MarqueeComponent } from './shared/components/marquee/marquee.component';
import { NavComponent } from './shared/components/nav/nav.component';
import { SpotlightDirective } from './shared/directives/spotlight.directive';
import { AboutComponent } from './features/portfolio/about/about.component';
import { ContactComponent } from './features/portfolio/contact/contact.component';
import { ExperienceComponent } from './features/portfolio/experience/experience.component';
import { HeroComponent } from './features/portfolio/hero/hero.component';
import { SkillsComponent } from './features/portfolio/skills/skills.component';
import { WorkComponent } from './features/portfolio/work/work.component';

@Component({
  selector: 'app-root',
  imports: [
    NavComponent,
    SpotlightDirective,
    HeroComponent,
    MarqueeComponent,
    ExperienceComponent,
    SkillsComponent,
    WorkComponent,
    AboutComponent,
    ContactComponent,
  ],
  template: `
    <app-nav />
    <main id="top" appSpotlight>
      <app-hero />
      <app-marquee />
      <app-experience />
      <app-skills />
      <app-work />
      <app-about />
      <app-contact />
    </main>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class App {
  // instantiate early so a saved light/dark choice is applied immediately
  private readonly theme = inject(ThemeService);
}
