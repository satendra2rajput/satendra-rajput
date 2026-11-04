import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { SeoService } from '../../core/services/seo.service';
import { SpotlightDirective } from '../../shared/directives/spotlight.directive';
import { MarqueeComponent } from '../../shared/components/marquee/marquee.component';
import { AboutComponent } from '../portfolio/about/about.component';
import { ContactComponent } from '../portfolio/contact/contact.component';
import { ExperienceComponent } from '../portfolio/experience/experience.component';
import { HeroComponent } from '../portfolio/hero/hero.component';
import { SkillsComponent } from '../portfolio/skills/skills.component';
import { WorkComponent } from '../portfolio/work/work.component';

@Component({
  selector: 'app-home',
  imports: [
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
export class HomeComponent {
  private readonly seo = inject(SeoService);

  constructor() {
    // resets the tab/canonical/OG tags back to the site defaults when navigating here from /blog
    this.seo.set({
      title: 'Satendra Rajput — Software Engineer (Angular + Java)',
      description:
        'Software Engineer building banking & fintech web apps with Angular, Java and Spring Boot. Currently learning AI engineering. Creator of Serotask.',
      path: '/',
    });
    this.seo.setJsonLd(null); // a blog post may have left its BlogPosting schema behind
  }
}
