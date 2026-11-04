import {
  DestroyRef,
  Directive,
  ElementRef,
  afterNextRender,
  inject,
  input,
  signal,
} from '@angular/core';

/**
 * Exposes `visible()`, which turns true (once) when the host scrolls into view.
 * Replaces the template's jQuery Waypoints usage.
 */
@Directive({
  selector: '[appInView]',
  exportAs: 'inView',
})
export class InViewDirective {
  /** Fraction of the host that must be visible, as in IntersectionObserver. */
  readonly threshold = input(0.2, { alias: 'appInViewThreshold' });

  private readonly visibleState = signal(false);
  readonly visible = this.visibleState.asReadonly();

  constructor() {
    const element = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;
    const destroyRef = inject(DestroyRef);

    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') {
        this.visibleState.set(true);
        return;
      }
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries.some((entry) => entry.isIntersecting)) {
            this.visibleState.set(true);
            observer.disconnect();
          }
        },
        { threshold: this.threshold() },
      );
      observer.observe(element);
      destroyRef.onDestroy(() => observer.disconnect());
    });
  }
}
