import { Pipe, PipeTransform } from '@angular/core';
import { formatPeriod } from '../../core/utils/date.utils';

/** '2022-04' | period: '2025-08'  ->  'Apr 2022 – Aug 2025'   (no end date -> 'Present') */
@Pipe({ name: 'period' })
export class PeriodPipe implements PipeTransform {
  transform(from: string, to?: string): string {
    return formatPeriod(from, to);
  }
}
