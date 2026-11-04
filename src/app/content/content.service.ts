import { DOCUMENT } from '@angular/common';
import { httpResource } from '@angular/common/http';
import { Injectable, computed, effect, inject, linkedSignal, signal } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

import { SiteContent } from './content.model';

export const LANGUAGES = ['es', 'en'] as const;
export type Language = (typeof LANGUAGES)[number];

const STORAGE_KEY = 'lang';

function isLanguage(value: unknown): value is Language {
  return LANGUAGES.includes(value as Language);
}

/**
 * Loads the site content for the active language from `data/<lang>.json`
 * (built from `firebase-data/`) and keeps `<html lang>`, the title and the
 * meta description in sync with it.
 */
@Injectable({ providedIn: 'root' })
export class ContentService {
  private readonly document = inject(DOCUMENT);
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);

  readonly language = signal<Language>(this.initialLanguage());

  private readonly resource = httpResource<SiteContent>(() => `data/${this.language()}.json`);

  /** Last loaded content, kept while another language is loading to avoid a blank page. */
  readonly content = linkedSignal<SiteContent | undefined, SiteContent | undefined>({
    source: () => (this.resource.hasValue() ? this.resource.value() : undefined),
    computation: (next, previous) => next ?? previous?.value,
  });

  readonly loaded = computed(() => this.content() !== undefined);
  readonly error = computed(() => this.resource.error());
  readonly ui = computed(() => this.content()?.ui);

  constructor() {
    effect(() => {
      const language = this.language();
      this.document.documentElement.lang = language;
      try {
        localStorage.setItem(STORAGE_KEY, language);
      } catch {
        // Storage can be unavailable (private mode); the choice just isn't remembered.
      }
    });

    effect(() => {
      const meta = this.content()?.meta;
      if (!meta) return;
      this.title.setTitle(meta.title);
      this.meta.updateTag({ name: 'description', content: meta.description });
      this.meta.updateTag({ property: 'og:title', content: meta.title });
      this.meta.updateTag({ property: 'og:description', content: meta.description });
    });
  }

  setLanguage(language: Language): void {
    this.language.set(language);
  }

  private initialLanguage(): Language {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (isLanguage(stored)) return stored;
    } catch {
      // Ignore unavailable storage.
    }
    const browser = this.document.defaultView?.navigator.language ?? '';
    return browser.toLowerCase().startsWith('en') ? 'en' : 'es';
  }
}
