import { ChangeDetectionStrategy, Component } from '@angular/core';
import { EXPERIENCE_CHIPS, SERO_SINCE, SERO_TILES, TIMELINE } from '../../../core/data/portfolio.data';
import { TimelineEntry, TimelineRole } from '../../../core/models/portfolio.models';
import { spanRoles } from '../../../core/utils/date.utils';
import { CountUpDirective } from '../../../shared/directives/count-up.directive';
import { RevealDirective } from '../../../shared/directives/reveal.directive';
import { DurationPipe } from '../../../shared/pipes/duration.pipe';
import { PeriodPipe } from '../../../shared/pipes/period.pipe';

/** What the template renders — one shape for both a multi-role company and a single position. */
interface TimelineRow {
  org: string;
  kind: 'Personal' | 'Company';
  logo: string;
  tile: boolean;
  /** company total: earliest role start (or the entry's own start) */
  from: string;
  /** `undefined` = Present */
  to?: string;
  /** empty for a single-position entry */
  roles: TimelineRole[];
  role?: string;
  text?: string;
}

function toRow(entry: TimelineEntry): TimelineRow {
  const { org, kind, logo, tile } = entry;
  if ('roles' in entry) {
    // LinkedIn-style company total: earliest role start → latest end, or "Present" while a role is open
    const { from, to } = spanRoles(entry.roles);
    return { org, kind, logo, tile, from, to, roles: entry.roles };
  }
  return { org, kind, logo, tile, from: entry.from, to: entry.to, roles: [], role: entry.role, text: entry.text };
}

@Component({
  selector: 'app-experience',
  imports: [RevealDirective, CountUpDirective, PeriodPipe, DurationPipe],
  templateUrl: './experience.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ExperienceComponent {
  protected readonly rows = TIMELINE.map(toRow);
  protected readonly currentCount = this.rows.filter((row) => !row.to).length;
  protected readonly chips = EXPERIENCE_CHIPS;
  protected readonly tiles = SERO_TILES;
  protected readonly seroSince = SERO_SINCE;
}
