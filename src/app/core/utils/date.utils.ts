const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function parse(ym: string): { y: number; m: number } {
  const [y, m] = ym.split('-').map(Number);
  return { y, m };
}

/** '2022-04' -> 'Apr 2022' */
export function formatMonth(ym: string): string {
  const { y, m } = parse(ym);
  return `${MONTHS[m - 1]} ${y}`;
}

/** 'Apr 2022 – Aug 2025'  (or '… – Present') */
export function formatPeriod(from: string, to?: string): string {
  return `${formatMonth(from)} – ${to ? formatMonth(to) : 'Present'}`;
}

/** Inclusive month count (same way LinkedIn counts): Apr 2022 → Aug 2025 = 41 months. */
export function monthsBetween(from: string, to?: string): number {
  const a = parse(from);
  const now = new Date();
  const b = to ? parse(to) : { y: now.getFullYear(), m: now.getMonth() + 1 };
  return (b.y - a.y) * 12 + (b.m - a.m) + 1;
}

/** 41 -> '3 Years 5 Months' */
export function formatDuration(totalMonths: number): string {
  const years = Math.floor(totalMonths / 12);
  const months = totalMonths % 12;
  const plural = (n: number, w: string) => `${n} ${w}${n === 1 ? '' : 's'}`;
  const parts = [years ? plural(years, 'Year') : '', months ? plural(months, 'Month') : ''].filter(Boolean);
  return parts.join(' ') || '1 Month';
}
