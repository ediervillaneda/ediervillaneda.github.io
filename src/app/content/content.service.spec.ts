import { DOCUMENT } from '@angular/common';
import { HttpTestingController } from '@angular/common/http/testing';
import { ApplicationRef } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  CONTENT,
  flushContent,
  provideContentTesting,
  startWithLanguage,
} from '../../testing/content-testing';
import { ContentService } from './content.service';

describe('ContentService', () => {
  let service: ContentService;
  let httpMock: HttpTestingController;

  function setup(): void {
    TestBed.configureTestingModule({ providers: provideContentTesting() });
    service = TestBed.inject(ContentService);
    httpMock = TestBed.inject(HttpTestingController);
  }

  afterEach(() => {
    httpMock.verify();
    localStorage.removeItem('lang');
  });

  it('loads the content of the stored language', async () => {
    startWithLanguage('en');
    setup();

    await flushContent('en');

    expect(service.language()).toBe('en');
    expect(service.content()).toEqual(CONTENT.en);
    expect(service.loaded()).toBe(true);
  });

  it('switches language, updates <html lang> and remembers the choice', async () => {
    startWithLanguage('es');
    setup();
    await flushContent('es');

    service.setLanguage('en');
    await flushContent('en');

    expect(service.content()?.ui.nav.about).toBe('About');
    expect(TestBed.inject(DOCUMENT).documentElement.lang).toBe('en');
    expect(localStorage.getItem('lang')).toBe('en');
  });

  it('keeps the previous content while the new language loads', async () => {
    startWithLanguage('es');
    setup();
    await flushContent('es');

    service.setLanguage('en');
    TestBed.tick();

    expect(service.content()).toEqual(CONTENT.es);
    httpMock.expectOne('data/en.json').flush(CONTENT.en);
  });

  it('updates the document title from the content', async () => {
    startWithLanguage('es');
    setup();
    await flushContent('es');

    expect(TestBed.inject(DOCUMENT).title).toBe(CONTENT.es.meta.title);
  });

  it('exposes the error when the content cannot be loaded', async () => {
    startWithLanguage('es');
    setup();
    TestBed.tick();

    httpMock.expectOne('data/es.json').flush('', { status: 404, statusText: 'Not Found' });
    await TestBed.inject(ApplicationRef).whenStable();

    expect(service.error()).toBeTruthy();
    expect(service.loaded()).toBe(false);
  });
});
