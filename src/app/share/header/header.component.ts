import { DOCUMENT } from '@angular/common';
import {
  Component,
  DestroyRef,
  ElementRef,
  afterNextRender,
  effect,
  inject,
  signal,
} from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { NavId } from '../../content/content.model';
import { ContentService, LANGUAGES, Language } from '../../content/content.service';

interface NavItem {
  id: NavId;
  /** Id of the element the link scrolls to. */
  target: string;
  icon: IconName;
}

export const NAV_ITEMS: readonly NavItem[] = [
  { id: 'home', target: 'hero', icon: 'house' },
  { id: 'about', target: 'about', icon: 'user' },
  { id: 'skills', target: 'skills', icon: 'chart-simple' },
  { id: 'resume', target: 'resume', icon: 'file-lines' },
  { id: 'portfolio', target: 'portfolio', icon: 'book-open' },
  { id: 'services', target: 'services', icon: 'server' },
  { id: 'references', target: 'references', icon: 'comments' },
  { id: 'contact', target: 'contact', icon: 'envelope' },
];

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  imports: [FaIconComponent],
  host: {
    '(document:click)': 'onDocumentClick($event)',
    '(document:keydown.escape)': 'closeMenu()',
  },
})
export class HeaderComponent {
  protected readonly content = inject(ContentService);
  protected readonly items = NAV_ITEMS;
  protected readonly languages = LANGUAGES;

  protected readonly menuOpen = signal(false);
  protected readonly active = signal<string>('hero');

  private readonly host = inject<ElementRef<HTMLElement>>(ElementRef).nativeElement;

  constructor() {
    const document = inject(DOCUMENT);
    const destroyRef = inject(DestroyRef);

    effect(() => document.body.classList.toggle('mobile-nav-active', this.menuOpen()));

    // Scrollspy: highlight the link of the section crossing the middle of the viewport.
    afterNextRender(() => {
      if (typeof IntersectionObserver === 'undefined') return;
      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) this.active.set(entry.target.id);
          }
        },
        { rootMargin: '-50% 0px -50% 0px' },
      );
      const observeTargets = () => {
        observer.disconnect();
        for (const item of NAV_ITEMS) {
          const section = document.getElementById(item.target);
          if (section) observer.observe(section);
        }
      };
      observeTargets();
      // Sections render once the content arrives; observe them again then.
      const mutations = new MutationObserver(observeTargets);
      mutations.observe(document.getElementById('main') ?? document.body, {
        childList: true,
        subtree: true,
      });
      destroyRef.onDestroy(() => {
        observer.disconnect();
        mutations.disconnect();
      });
    });
  }

  protected toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  closeMenu(): void {
    this.menuOpen.set(false);
  }

  protected select(target: string): void {
    this.active.set(target);
    this.closeMenu();
  }

  protected setLanguage(language: Language): void {
    this.content.setLanguage(language);
  }

  onDocumentClick(event: MouseEvent): void {
    if (this.menuOpen() && !this.host.contains(event.target as Node)) this.closeMenu();
  }
}
