/** One SVG path. `fill: true` fills the shape with currentColor instead of stroking only. */
export interface IconPath {
  d: string;
  fill?: boolean;
}

export interface NavLink {
  id: string;
  label: string;
}

/** One position held at a company. Dates are 'YYYY-MM'; leave `to` out for "Present". */
export interface TimelineRole {
  title: string;
  from: string;
  to?: string;
  promoted?: boolean;
  points: string[];
}

interface TimelineBase {
  org: string;
  kind: 'Personal' | 'Company';
  logo: string;
  /** logos that ship with a white background sit inside a small white tile */
  tile: boolean;
}

/**
 * LinkedIn-style: several positions at one company, newest first.
 * The company's own period/duration is derived automatically from these.
 */
export interface TimelineCompany extends TimelineBase {
  roles: TimelineRole[];
}

/** A single position (e.g. a personal project) — no nested roles. `to` omitted = Present. */
export interface TimelineSingle extends TimelineBase {
  from: string;
  to?: string;
  role: string;
  text: string;
}

export type TimelineEntry = TimelineCompany | TimelineSingle;

export interface SeroTile {
  title: string;
  /** e.g. '40+ tools' — omit for an entry that doesn't have a count (Resume Builder) */
  count?: string;
  color: string;
  icon: IconPath[];
}

export interface SkillGroup {
  title: string;
  items: string[];
}

export interface Library {
  name: string;
  version: string;
  color: string;
  description: string;
  tags: string[];
  icon: IconPath[];
}

export interface Project {
  span: 4 | 5 | 7 | 12;
  delay?: number;
  from: string;
  to?: string;
  client?: string;
  title: string;
  text?: string;
  points?: string[];
  tags: string[];
  /** wide two-column layout (used for the last, full-width card) */
  wide?: boolean;
}

export interface StatItem {
  label: string;
  value: string;
}

export interface BlogPost {
  slug: string;
  title: string;
  /** 'YYYY-MM-DD' */
  date: string;
  readMins: number;
  tag: string;
  excerpt: string;
  /** one string per paragraph */
  body: string[];
}
