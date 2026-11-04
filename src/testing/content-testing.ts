import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { ApplicationRef, provideAppInitializer, provideZonelessChangeDetection } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import en from '../../firebase-data/en.json';
import es from '../../firebase-data/es.json';
import { SiteContent } from '../app/content/content.model';
import { Language } from '../app/content/content.service';
import { registerIcons } from '../app/icons';

export const CONTENT: Record<Language, SiteContent> = {
  es: es as SiteContent,
  en: en as SiteContent,
};

/** Makes ContentService start in `language`, regardless of the browser or earlier specs. */
export function startWithLanguage(language: Language): void {
  localStorage.setItem('lang', language);
}

/** Providers every spec needs: zoneless change detection, HTTP mocks and the icon set. */
export function provideContentTesting() {
  return [
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideHttpClientTesting(),
    provideAppInitializer(registerIcons),
  ];
}

/** Answers the pending request for `data/<language>.json` with the real site content. */
export async function flushContent(language: Language = 'es'): Promise<void> {
  // Run effects so httpResource sends its request (whenStable would wait on it).
  TestBed.tick();
  TestBed.inject(HttpTestingController).expectOne(`data/${language}.json`).flush(CONTENT[language]);
  await TestBed.inject(ApplicationRef).whenStable();
}
