import { Component, DestroyRef, computed, effect, inject, input, signal } from '@angular/core';

import { InViewDirective } from './in-view.directive';

/** Splits `"18+"` into `{ target: 18, suffix: "+" }`; non-numeric values have no target. */
export function parseCount(value: string): {
  target: number | null;
  prefix: string;
  suffix: string;
} {
  const match = /^(\D*)(\d+)(.*)$/.exec(value);
  if (!match) return { target: null, prefix: '', suffix: value };
  return { prefix: match[1], target: Number(match[2]), suffix: match[3] };
}

/**
 * Animates the leading number of `value` from 0 when it scrolls into view.
 * Replaces the template's jQuery counterUp plugin.
 */
@Component({
  selector: 'app-count-up',
  hostDirectives: [InViewDirective],
  template: '{{ display() }}',
})
export class CountUp {
  readonly value = input.required<string>();
  /** Animation length in milliseconds. */
  readonly duration = input(1000);

  private readonly parsed = computed(() => parseCount(this.value()));
  private readonly current = signal(0);

  readonly display = computed(() => {
    const { target, prefix, suffix } = this.parsed();
    return target === null ? suffix : `${prefix}${this.current()}${suffix}`;
  });

  constructor() {
    const inView = inject(InViewDirective);
    const destroyRef = inject(DestroyRef);
    let frame = 0;
    destroyRef.onDestroy(() => cancelAnimationFrame(frame));

    effect(() => {
      const { target } = this.parsed();
      if (target === null || !inView.visible()) return;

      const reduceMotion = globalThis.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
      if (reduceMotion) {
        this.current.set(target);
        return;
      }

      const start = performance.now();
      const duration = this.duration();
      const step = (now: number) => {
        const progress = Math.min((now - start) / duration, 1);
        this.current.set(Math.round(target * progress));
        if (progress < 1) frame = requestAnimationFrame(step);
      };
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(step);
    });
  }
}
