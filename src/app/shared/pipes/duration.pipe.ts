import { Pipe, PipeTransform } from '@angular/core';
import { formatDuration, monthsBetween } from '../../core/utils/date.utils';

/** '2022-04' | duration: '2025-08'  ->  '3 Years 5 Months'   (no end date -> counts up to today) */
@Pipe({ name: 'duration' })
export class DurationPipe implements PipeTransform {
  transform(from: string, to?: string): string {
    return formatDuration(monthsBetween(from, to));
  }
}
