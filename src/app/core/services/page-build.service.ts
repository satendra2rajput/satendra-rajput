import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';

/**
 * "Build the page live" intro — runs once, on a hard load of "/".
 *
 * Several named cursors (Figma / Google-Docs style) fly around the page and build every element
 * in front of the visitor: boxes are dragged out, images are scanned in, and all text is typed
 * character by character. Content below the fold is built when it scrolls into view.
 *
 * How it stays safe with Angular:
 *  - Text is NEVER edited. Untyped characters are hidden with the CSS Custom Highlight API
 *    (`::highlight(ib-untyped)` → transparent), so layout never shifts and Angular's own text
 *    bindings (copy button state, package-manager switch, …) keep working.
 *  - Boxes / images are hidden with a clip-path class (`.ib-h`) and revealed with the Web
 *    Animations API, so their normal CSS is untouched once the intro ends.
 *
 * The page is hidden by `html.ib-gate` (set by the inline script in index.html) until this
 * service has prepared everything, so there is no flash of finished content.
 * Skipped for: other routes, reduced-motion, browsers without the Highlight API.
 */

const HL_NAME = 'ib-untyped';

const CURSORS: ReadonlyArray<{ name: string; color: string }> = [
  { name: 'Satendra', color: '#2b59ff' },
  { name: 'Angular', color: '#dd0031' },
  { name: 'Spring Boot', color: '#4f9a2a' },
  { name: 'RxJS', color: '#b7178c' },
  { name: 'TypeScript', color: '#3178c6' },
  { name: 'Java', color: '#e8830c' },
];

/** never built / never typed */
const SKIP_TAGS = new Set(['SCRIPT', 'STYLE', 'NOSCRIPT', 'LINK', 'META', 'TEMPLATE']);
const SKIP_SELECTOR = '.sr-only, .mmenu, [hidden], [data-ib-skip], .ib-layer';
/** built as one visual block (wipe-in) instead of being walked */
const ATOMIC_SELECTOR = '.slot, .marquee';
/** these always type their own text, even when `display: inline` */
const OWNER_TAGS = new Set(['A', 'BUTTON', 'LI', 'P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'DT', 'DD', 'LABEL']);

type Kind = 'box' | 'media' | 'text' | 'pop';
type Shape = 'rect' | 'circle';
type Point = { x: number; y: number };

interface Part {
  node: Text;
  text: string;
  untyped: Range;
  start: number;
  end: number;
}

interface Job {
  kind: Kind;
  el: HTMLElement;
  dep: Job | null;
  state: 'pending' | 'running' | 'done';
  shape: Shape;
  radius: string;
  parts: Part[];
  partIdx: number;
  total: number;
  flat: string;
  /** rough duration at speed 1 (ms) — only used to pace the whole build */
  work: number;
}

interface HighlightLike {
  add(range: Range): unknown;
  delete(range: Range): unknown;
}
type HighlightCtor = new (...ranges: Range[]) => HighlightLike;
interface HighlightRegistryLike {
  set(name: string, highlight: HighlightLike): unknown;
  delete(name: string): unknown;
}

const frame = (): Promise<void> => new Promise((resolve) => requestAnimationFrame(() => resolve()));
const sleep = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));
const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));
const ease = (t: number): number => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const isSpace = (ch: string | undefined): boolean => ch === undefined || /\s/.test(ch);

/* ------------------------------------------------------------------ cursor */

class Cursor {
  x = 0;
  y = 0;
  aborted = false;
  private readonly el: HTMLElement;

  constructor(doc: Document, layer: HTMLElement, cfg: { name: string; color: string }, start: Point) {
    this.el = doc.createElement('div');
    this.el.className = 'ib-cur ptr';
    this.el.style.setProperty('--c', cfg.color);
    this.el.innerHTML =
      '<span class="ib-bar"></span>' +
      '<svg class="ib-ptr" viewBox="0 0 16 20" aria-hidden="true"><path d="M1.5 1.2 14 9.4l-5.6 1.3L5.9 17z" fill="var(--c)" stroke="#fff" stroke-width="1.3" stroke-linejoin="round"/></svg>' +
      '<span class="ib-flag"></span>';
    (this.el.querySelector('.ib-flag') as HTMLElement).textContent = cfg.name;
    layer.appendChild(this.el);
    this.set(start.x, start.y);
  }

  set(x: number, y: number): void {
    this.x = x;
    this.y = y;
    this.el.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0)`;
  }

  show(on: boolean): void {
    this.el.classList.toggle('on', on);
  }

  mode(mode: 'txt' | 'ptr', height?: number): void {
    this.el.classList.toggle('txt', mode === 'txt');
    this.el.classList.toggle('ptr', mode === 'ptr');
    if (height) this.el.style.setProperty('--h', `${height.toFixed(1)}px`);
  }

  async moveTo(get: () => Point, ms: number): Promise<void> {
    const sx = this.x;
    const sy = this.y;
    const t0 = performance.now();
    for (;;) {
      const t = clamp((performance.now() - t0) / ms, 0, 1);
      const e = ease(t);
      const g = get();
      this.set(sx + (g.x - sx) * e, sy + (g.y - sy) * e);
      if (t >= 1 || this.aborted) return;
      await frame();
    }
  }

  destroy(): void {
    this.el.remove();
  }
}

/* ----------------------------------------------------------------- builder */

class PageBuilder {
  private jobs: Job[] = [];
  private pending: Job[] = [];
  private ready: Job[] = [];
  private running = 0;
  private finished = false;
  private speed = 1;
  private skipHidden = false;

  private readonly boxByEl = new Map<Element, Job>();
  private readonly textByEl = new Map<Element, Job>();
  private readonly styles = new Map<Element, CSSStyleDeclaration>();
  private readonly anims = new Set<Animation>();
  private readonly cursors: Cursor[] = [];
  private waiters: Array<() => void> = [];
  private readonly tmp: Range;
  private highlight!: HighlightLike;
  private layer!: HTMLElement;
  private skipBtn!: HTMLButtonElement;
  private pumpQueued = false;
  private watchdog = 0;

  private readonly onScroll = (): void => this.queuePump();
  private readonly onKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape') this.finish();
  };

  constructor(
    private readonly doc: Document,
    private readonly roots: HTMLElement[],
    private readonly main: HTMLElement,
    private readonly HighlightClass: HighlightCtor,
    private readonly registry: HighlightRegistryLike,
  ) {
    this.tmp = doc.createRange();
  }

  /* ----------------------------------------------------------- prepare */

  run(): void {
    this.highlight = new this.HighlightClass();
    this.settleEntrance();
    for (const root of this.roots) this.walk(root, null, root, null);

    this.jobs = this.jobs.filter((j) => j.kind !== 'text' || j.total > 0);
    this.pending = [...this.jobs];
    this.registry.set(HL_NAME, this.highlight);
    for (const j of this.jobs) if (j.kind !== 'text') j.el.classList.add('ib-h');

    this.buildOverlay();
    this.doc.documentElement.classList.remove('ib-gate'); // everything is hidden individually now

    window.addEventListener('scroll', this.onScroll, { passive: true, capture: true });
    window.addEventListener('resize', this.onScroll, { passive: true });
    window.addEventListener('keydown', this.onKey);
    this.watchdog = window.setTimeout(() => this.finish(), 90_000);

    this.pump();
    for (const cur of this.cursors) void this.worker(cur);
  }

  /** The CSS entrance animations / .rv reveals would otherwise play underneath the build. */
  private settleEntrance(): void {
    const rv = this.doc.querySelectorAll<HTMLElement>('.rv:not(.on)');
    rv.forEach((el) => {
      el.style.transition = 'none';
      el.classList.add('on');
    });
    void this.doc.body.offsetHeight;
    for (const a of this.doc.getAnimations()) {
      try {
        if (a.effect?.getComputedTiming().endTime !== Infinity) a.finish();
      } catch {
        /* an animation that cannot be finished is harmless */
      }
    }
    rv.forEach((el) => el.style.removeProperty('transition'));
  }

  private style(el: Element): CSSStyleDeclaration {
    let cs = this.styles.get(el);
    if (!cs) {
      cs = getComputedStyle(el);
      this.styles.set(el, cs);
    }
    return cs;
  }

  private addJob(init: Pick<Job, 'kind' | 'el' | 'dep'> & Partial<Job>): Job {
    const job: Job = {
      state: 'pending',
      shape: 'rect',
      radius: '0px',
      parts: [],
      partIdx: 0,
      total: 0,
      flat: '',
      work: init.kind === 'box' ? 750 : 900,
      ...init,
    };
    this.jobs.push(job);
    return job;
  }

  private walk(el: Element, parentBox: Job | null, owner: Element | null, ownerBox: Job | null): void {
    if (SKIP_TAGS.has(el.tagName) || el.matches(SKIP_SELECTOR)) return;
    const cs = this.style(el);
    if (cs.display === 'none') return;
    const he = el as HTMLElement;

    if (cs.display === 'contents') {
      this.walkChildren(el, parentBox, owner, ownerBox);
      return;
    }

    const tag = el.tagName.toLowerCase();
    if (tag === 'img' || tag === 'video' || tag === 'canvas' || tag === 'svg' || el.matches(ATOMIC_SELECTOR)) {
      this.addVisual(he, parentBox, cs);
      return;
    }

    let myBox = parentBox;
    let ownBox = false;
    if (this.hasBox(cs)) {
      const r = he.getBoundingClientRect();
      const big = r.width >= 40 && r.height >= 24;
      if (r.width >= 8 && r.height >= 8 && (big || !parentBox)) {
        const { shape, radius } = this.shapeOf(cs, r);
        myBox = this.addJob({ kind: 'box', el: he, dep: parentBox, shape, radius });
        this.boxByEl.set(el, myBox);
        ownBox = true;
      }
    }

    const ownsText = cs.display !== 'inline' || OWNER_TAGS.has(el.tagName) || ownBox;
    this.walkChildren(el, myBox, ownsText ? el : owner, ownsText ? myBox : ownerBox);
  }

  private walkChildren(el: Element, box: Job | null, owner: Element | null, ownerBox: Job | null): void {
    for (const child of Array.from(el.childNodes)) {
      if (child.nodeType === Node.ELEMENT_NODE) this.walk(child as Element, box, owner, ownerBox);
      else if (child.nodeType === Node.TEXT_NODE) this.addText(child as Text, owner, ownerBox);
    }
  }

  private addText(node: Text, owner: Element | null, ownerBox: Job | null): void {
    const text = node.data;
    if (!owner || !/\S/.test(text)) return;
    let job = this.textByEl.get(owner);
    if (!job) {
      job = this.addJob({ kind: 'text', el: owner as HTMLElement, dep: ownerBox });
      this.textByEl.set(owner, job);
    }
    const range = this.doc.createRange();
    range.setStart(node, 0);
    range.setEnd(node, text.length);
    this.highlight.add(range);
    job.parts.push({ node, text, untyped: range, start: job.total, end: job.total + text.length });
    job.total += text.length;
    job.flat += text;
    job.work = (job.flat.replace(/\s/g, '').length / 62) * 1000 + 550;
  }

  private addVisual(el: HTMLElement, parentBox: Job | null, cs: CSSStyleDeclaration): void {
    const r = el.getBoundingClientRect();
    if (r.width < 2 || r.height < 2) return;
    const small = r.width < 48 && r.height < 48;
    this.addJob({ kind: small ? 'pop' : 'media', el, dep: parentBox, radius: cs.borderTopLeftRadius || '0px' });
  }

  private hasBox(cs: CSSStyleDeclaration): boolean {
    const clear = (c: string): boolean => c === 'rgba(0, 0, 0, 0)' || c === 'transparent';
    if (!clear(cs.backgroundColor)) return true;
    if (cs.backgroundImage !== 'none') return true;
    if (cs.boxShadow !== 'none') return true;
    return parseFloat(cs.borderTopWidth) > 0 && cs.borderTopStyle !== 'none' && !clear(cs.borderTopColor);
  }

  private shapeOf(cs: CSSStyleDeclaration, r: DOMRect): { shape: Shape; radius: string } {
    const radius = cs.borderTopLeftRadius || '0px';
    const px = parseFloat(radius) || 0;
    const roundPct = radius.includes('%') && px >= 50;
    const roundPx = !radius.includes('%') && px >= Math.min(r.width, r.height) / 2 && Math.abs(r.width - r.height) < 2;
    return { shape: roundPct || roundPx ? 'circle' : 'rect', radius };
  }

  private buildOverlay(): void {
    const doc = this.doc;
    this.layer = doc.createElement('div');
    this.layer.className = 'ib-layer';
    doc.body.appendChild(this.layer);

    const count = window.innerWidth < 720 ? 3 : CURSORS.length;
    for (let i = 0; i < count; i++) {
      // each cursor flies in from a different edge
      const side = i % 4;
      const start: Point =
        side === 0
          ? { x: Math.random() * innerWidth, y: -40 }
          : side === 1
            ? { x: innerWidth + 40, y: Math.random() * innerHeight * 0.6 }
            : side === 2
              ? { x: -40, y: Math.random() * innerHeight * 0.6 }
              : { x: Math.random() * innerWidth, y: innerHeight + 40 };
      this.cursors.push(new Cursor(doc, this.layer, CURSORS[i], start));
    }

    this.skipBtn = doc.createElement('button');
    this.skipBtn.type = 'button';
    this.skipBtn.className = 'ib-skip';
    this.skipBtn.textContent = 'Skip intro';
    this.skipBtn.addEventListener('click', () => this.finish());
    this.layer.appendChild(this.skipBtn);
  }

  /* -------------------------------------------------------- scheduling */

  private queuePump(): void {
    if (this.pumpQueued || this.finished) return;
    this.pumpQueued = true;
    requestAnimationFrame(() => {
      this.pumpQueued = false;
      this.pump();
    });
  }

  /** Re-evaluates what can start now: dependencies done + element currently on screen. */
  private pump(): void {
    if (this.finished) return;
    if (!this.main.isConnected) {
      this.finish(); // navigated away mid-intro
      return;
    }
    const vw = window.innerWidth;
    const vh = window.innerHeight;
    const ready: Job[] = [];
    const remaining: Job[] = [];
    let work = 0;

    for (const j of this.pending) {
      if (j.state !== 'pending') continue;
      const r = j.el.getBoundingClientRect();
      const visible = (r.width > 0 || r.height > 0) && r.bottom > 0 && r.top < vh * 0.94 && r.right > 0 && r.left < vw;
      if (visible) work += j.work; // counts jobs that are still waiting for a parent box too
      if (!visible || (j.dep && j.dep.state !== 'done')) {
        remaining.push(j);
        continue;
      }
      if (j.kind === 'pop') {
        this.pop(j);
        continue;
      }
      ready.push(j);
      remaining.push(j);
    }

    this.pending = remaining;
    this.ready = ready;
    // a lot of visible work → everyone types / draws faster, so the first screen is built in ~3 s
    this.speed = clamp(work / (this.cursors.length * 2400), this.skipHidden ? 1 : 1.7, 4);

    if (!this.skipHidden && this.running === 0 && ready.length === 0) {
      this.skipHidden = true;
      this.skipBtn.classList.add('gone');
    }
    if (this.pending.length === 0 && this.running === 0) {
      this.finish();
      return;
    }
    this.wake();
  }

  private wake(): void {
    const w = this.waiters;
    this.waiters = [];
    for (const fn of w) fn();
  }

  /** Picks one of the first few ready jobs — the one closest to this cursor, to keep travel short. */
  private take(cur: Cursor): Job | null {
    if (!this.ready.length) return null;
    let best = 0;
    let bestScore = Infinity;
    const n = Math.min(5, this.ready.length);
    for (let i = 0; i < n; i++) {
      const r = this.ready[i].el.getBoundingClientRect();
      const score = Math.hypot(r.left - cur.x, r.top - cur.y) + i * 90; // slight bias for document order
      if (score < bestScore) {
        bestScore = score;
        best = i;
      }
    }
    const [job] = this.ready.splice(best, 1);
    job.state = 'running';
    this.running++;
    this.pending = this.pending.filter((j) => j !== job);
    return job;
  }

  private async worker(cur: Cursor): Promise<void> {
    await sleep(Math.random() * 250);
    while (!this.finished) {
      const job = this.take(cur);
      if (!job) {
        cur.show(false);
        await new Promise<void>((resolve) => this.waiters.push(resolve));
        continue;
      }
      cur.show(true);
      try {
        if (job.kind === 'text') await this.runText(cur, job);
        else if (job.kind === 'box') await this.runBox(cur, job);
        else await this.runMedia(cur, job);
      } catch {
        this.reveal(job);
      }
      job.state = 'done';
      this.running--;
      cur.mode('ptr');
      this.pump();
    }
  }

  /* ------------------------------------------------------------- jobs */

  private travel(cur: Cursor, to: Point): number {
    const dist = Math.hypot(to.x - cur.x, to.y - cur.y);
    return clamp(140 + dist * 0.4, 150, 520) / this.speed;
  }

  private pop(job: Job): void {
    job.state = 'done';
    job.el.classList.remove('ib-h');
    const a = job.el.animate(
      [
        { opacity: 0, scale: '0.55' },
        { opacity: 1, scale: '1' },
      ],
      { duration: 260, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' },
    );
    this.anims.add(a);
    void a.finished.then(() => this.anims.delete(a)).catch(() => this.anims.delete(a));
  }

  /** Drag-to-create: the box grows from its top-left corner (circles grow from the centre). */
  private async runBox(cur: Cursor, job: Job): Promise<void> {
    const el = job.el;
    const at = (p: number): Point => {
      const r = el.getBoundingClientRect();
      return job.shape === 'circle'
        ? { x: r.left + r.width * (0.5 + p * 0.34), y: r.top + r.height * (0.5 + p * 0.34) }
        : { x: r.left + r.width * p, y: r.top + r.height * p };
    };
    cur.mode('ptr');
    await cur.moveTo(() => at(0), this.travel(cur, at(0)));
    const r = el.getBoundingClientRect();
    const dur = clamp(200 + (r.width + r.height) * 0.2, 240, 520) / this.speed;
    const from = job.shape === 'circle' ? 'circle(0% at 50% 50%)' : `inset(0 100% 100% 0 round ${job.radius})`;
    const to = job.shape === 'circle' ? 'circle(75% at 50% 50%)' : `inset(0 0 0 0 round ${job.radius})`;
    await this.wipe(job, from, to, dur, (p) => {
      const pt = at(p);
      cur.set(pt.x, pt.y);
    });
  }

  /** Images, the role slot, the marquee: scanned in top→bottom (or left→right for wide strips). */
  private async runMedia(cur: Cursor, job: Job): Promise<void> {
    const el = job.el;
    const wide = el.getBoundingClientRect().width > el.getBoundingClientRect().height * 3;
    const at = (p: number): Point => {
      const r = el.getBoundingClientRect();
      return wide
        ? { x: r.left + r.width * p, y: r.top + r.height * (0.5 + 0.18 * Math.sin(p * 10)) }
        : { x: r.left + r.width * (0.5 + 0.14 * Math.sin(p * 9)), y: r.top + r.height * p };
    };
    cur.mode('ptr');
    await cur.moveTo(() => at(0), this.travel(cur, at(0)));
    const r = el.getBoundingClientRect();
    const dur = clamp(320 + (wide ? r.width : r.height) * 0.6, 380, 800) / this.speed;
    const from = wide ? `inset(0 100% 0 0 round ${job.radius})` : `inset(0 0 100% 0 round ${job.radius})`;
    const to = `inset(0 0 0 0 round ${job.radius})`;
    await this.wipe(job, from, to, dur, (p) => {
      const pt = at(p);
      cur.set(pt.x, pt.y);
    });
  }

  private async wipe(job: Job, from: string, to: string, ms: number, onProgress: (p: number) => void): Promise<void> {
    job.el.classList.remove('ib-h');
    const anim = job.el.animate({ clipPath: [from, to] }, { duration: ms, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'backwards' });
    this.anims.add(anim);
    while (anim.playState !== 'finished' && anim.playState !== 'idle' && !this.finished) {
      onProgress(Number(anim.effect?.getComputedTiming().progress ?? 1));
      await frame();
    }
    this.anims.delete(anim);
  }

  /** Real typing: characters become visible one by one, the cursor sits at the caret. */
  private async runText(cur: Cursor, job: Job): Promise<void> {
    const first = this.caretAt(job, 0);
    if (!first) {
      this.reveal(job);
      return;
    }
    cur.mode('ptr');
    await cur.moveTo(() => this.caretAt(job, 0) ?? first, this.travel(cur, first));
    cur.mode('txt', first.h);
    await sleep(70 / this.speed);

    const { flat, total } = job;
    let typed = 0;
    while (typed < total && isSpace(flat[typed])) typed++;

    let budget = 0;
    let last = performance.now();
    let next = this.charDelay(flat[typed]);
    while (typed < total && !this.finished) {
      await frame();
      const now = performance.now();
      budget = Math.min(budget + (now - last), next + 120); // cap catch-up after a stalled tab, but never below `next`
      last = now;
      let advanced = false;
      while (typed < total && budget >= next) {
        const ch = flat[typed];
        typed++;
        while (typed < total && isSpace(flat[typed])) typed++; // spaces cost nothing
        budget -= next;
        next = this.charDelay(ch);
        advanced = true;
      }
      if (advanced) {
        this.apply(job, typed);
        const c = this.caretAt(job, typed);
        if (c) {
          cur.set(c.x, c.y);
          cur.mode('txt', c.h);
        }
      }
    }
    this.reveal(job);
  }

  /** ms before the next character — a little irregular, slower after punctuation. */
  private charDelay(ch: string | undefined): number {
    let ms = (1000 / 70) * (0.55 + Math.random() * 0.9);
    if (ch && /[.,;:!?]/.test(ch)) ms += 110;
    else if (Math.random() < 0.025) ms += 90 + Math.random() * 70;
    return ms / this.speed;
  }

  private apply(job: Job, typed: number): void {
    while (job.partIdx < job.parts.length) {
      const p = job.parts[job.partIdx];
      if (typed >= p.end) {
        this.highlight.delete(p.untyped);
        job.partIdx++;
        continue;
      }
      p.untyped.setStart(p.node, clamp(typed - p.start, 0, p.node.data.length));
      break;
    }
  }

  private caretAt(job: Job, typed: number): { x: number; y: number; h: number } | null {
    let k: number;
    if (typed <= 0) {
      k = job.flat.search(/\S/);
    } else {
      k = typed - 1;
      while (k >= 0 && isSpace(job.flat[k])) k--;
      if (k < 0) return this.caretAt(job, 0);
    }
    if (k < 0) return null;
    const part = job.parts.find((p) => k >= p.start && k < p.end);
    if (!part || k - part.start >= part.node.data.length) return null;
    this.tmp.setStart(part.node, k - part.start);
    this.tmp.setEnd(part.node, k - part.start + 1);
    const rects = this.tmp.getClientRects();
    if (!rects.length) return null;
    const r = rects[rects.length - 1];
    return { x: typed <= 0 ? r.left : r.right, y: r.top, h: r.height };
  }

  /** shows a job in full, instantly */
  private reveal(job: Job): void {
    if (job.kind === 'text') {
      for (const p of job.parts) this.highlight.delete(p.untyped);
      job.partIdx = job.parts.length;
    } else {
      job.el.classList.remove('ib-h');
    }
  }

  /* ----------------------------------------------------------- finish */

  /** Ends the intro (also the "Skip" button / Esc): everything left is shown at once. */
  finish(): void {
    if (this.finished) return;
    this.finished = true;
    window.clearTimeout(this.watchdog);
    window.removeEventListener('scroll', this.onScroll, { capture: true });
    window.removeEventListener('resize', this.onScroll);
    window.removeEventListener('keydown', this.onKey);

    for (const a of this.anims) a.cancel();
    this.anims.clear();
    for (const j of this.jobs) this.reveal(j);
    this.registry.delete(HL_NAME);
    this.doc.documentElement.classList.remove('ib-gate');

    for (const c of this.cursors) {
      c.aborted = true;
      c.show(false);
    }
    this.skipBtn.classList.add('gone');
    this.wake();
    window.setTimeout(() => {
      this.cursors.forEach((c) => c.destroy());
      this.layer.remove();
    }, 500);
  }
}

/* ----------------------------------------------------------------- service */

@Injectable({ providedIn: 'root' })
export class PageBuildService {
  private readonly doc = inject(DOCUMENT);
  private readonly isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private started = false;

  /** Call from the home page after its first render. Only the very first call per page load can play. */
  async start(): Promise<void> {
    if (!this.isBrowser || this.started) return;
    this.started = true;

    const html = this.doc.documentElement;
    const win = window as unknown as { Highlight?: HighlightCtor };
    const registry = (CSS as unknown as { highlights?: HighlightRegistryLike }).highlights;
    // the gate class is only set (index.html) on a hard load of "/" without reduced-motion
    if (!html.classList.contains('ib-gate')) return;

    const main = this.doc.querySelector<HTMLElement>('main#top');
    if (!main || !win.Highlight || !registry) {
      html.classList.remove('ib-gate');
      return;
    }

    // measure with the real webfonts, otherwise every line re-wraps while it is being typed
    await Promise.race([this.doc.fonts?.ready ?? Promise.resolve(), sleep(1200)]);
    if (!html.classList.contains('ib-gate') || !main.isConnected) return;

    const roots = [this.doc.querySelector<HTMLElement>('header.nav'), main].filter((el): el is HTMLElement => !!el);
    try {
      new PageBuilder(this.doc, roots, main, win.Highlight, registry).run();
    } catch (err) {
      console.error('Page build intro failed — showing the page as is.', err);
      registry.delete(HL_NAME);
      this.doc.querySelectorAll('.ib-h').forEach((el) => el.classList.remove('ib-h'));
      this.doc.querySelector('.ib-layer')?.remove();
      html.classList.remove('ib-gate');
    }
  }
}
