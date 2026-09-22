/** One SVG path. `fill: true` fills the shape with currentColor instead of stroking only. */
export interface IconPath {
  d: string;
  fill?: boolean;
}

export interface NavLink {
  id: string;
  label: string;
}

export interface TimelineRole {
  title: string;
  focus?: string;
  promoted?: boolean;
  text: string;
}

export interface TimelineEntry {
  org: string;
  kind: 'Personal' | 'Company';
  logo: string;
  /** logos that ship with a white background sit inside a small white tile */
  tile: boolean;
  /** 'YYYY-MM' */
  from: string;
  /** 'YYYY-MM' — leave out for "Present" */
  to?: string;
  role?: string;
  text?: string;
  roles?: TimelineRole[];
}

export interface SeroTile {
  title: string;
  color: string;
  icon: IconPath[];
  bars?: boolean;
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
