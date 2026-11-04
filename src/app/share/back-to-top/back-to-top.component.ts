import { Component, inject, signal } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

/** Floating button shown after scrolling down; replaces the template's jQuery version. */
@Component({
  selector: 'app-back-to-top',
  imports: [FaIconComponent],
  host: { '(window:scroll)': 'onScroll()' },
  template: `
    <button
      type="button"
      class="back-to-top"
      [class.active]="visible()"
      [attr.aria-label]="content.ui()?.a11y?.backToTop"
      [attr.tabindex]="visible() ? null : -1"
      (click)="scrollToTop()"
    >
      <fa-icon icon="arrow-up" aria-hidden="true" />
    </button>
  `,
})
export class BackToTopComponent {
  protected readonly content = inject(ContentService);
  protected readonly visible = signal(false);

  onScroll(): void {
    this.visible.set(window.scrollY > 100);
  }

  protected scrollToTop(): void {
    window.scrollTo({ top: 0 });
  }
}
