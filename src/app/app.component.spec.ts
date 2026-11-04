import { DOCUMENT } from '@angular/common';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  CONTENT,
  flushContent,
  provideContentTesting,
  startWithLanguage,
} from '../testing/content-testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(() => {
    startWithLanguage('es');
    TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: provideContentTesting(),
    });
  });

  afterEach(() => localStorage.removeItem('lang'));

  it('renders the hero name and every section from the content', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    await flushContent('es');
    await fixture.whenStable();
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('#hero h1')?.textContent).toContain(CONTENT.es.hero.name);
    const titles = Array.from(element.querySelectorAll('section h2')).map((h2) =>
      h2.textContent?.trim(),
    );
    expect(titles).toEqual(Object.values(CONTENT.es.ui.sections));
  });

  it('removes the preloader once the content is loaded', async () => {
    const document = TestBed.inject(DOCUMENT);
    const preloader = document.createElement('div');
    preloader.id = 'preloader';
    document.body.appendChild(preloader);

    const fixture = TestBed.createComponent(AppComponent);
    await flushContent('es');
    await fixture.whenStable();

    expect(document.getElementById('preloader')).toBeNull();
  });

  it('shows an error message when the content fails to load', async () => {
    const fixture = TestBed.createComponent(AppComponent);
    TestBed.tick();
    TestBed.inject(HttpTestingController)
      .expectOne('data/es.json')
      .flush('', { status: 500, statusText: 'Server Error' });
    await fixture.whenStable();

    expect(fixture.nativeElement.querySelector('[role="alert"]')).not.toBeNull();
  });
});
