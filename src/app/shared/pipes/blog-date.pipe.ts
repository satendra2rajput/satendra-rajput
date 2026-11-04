import { Pipe, PipeTransform } from '@angular/core';
import { formatFullDate } from '../../core/utils/date.utils';

/** '2026-11-05' -> '5 Nov 2026' */
@Pipe({ name: 'blogDate' })
export class BlogDatePipe implements PipeTransform {
  transform(ymd: string): string {
    return formatFullDate(ymd);
  }
}
