import { DOCUMENT } from '@angular/common';
import { HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import {
  CONTENT,
  flushContent,
  provideContentTesting,
  startWithLanguage,
} from '../../../testing/content-testing';
import { ContentService } from '../../content/content.service';
import { HeaderComponent, NAV_ITEMS } from './header.component';

describe('HeaderComponent', () => {
  async function render() {
    startWithLanguage('es');
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
      providers: provideContentTesting(),
    });
    const fixture = TestBed.createComponent(HeaderComponent);
    await flushContent('es');
    await fixture.whenStable();
    return fixture;
  }

  afterEach(() => {
    localStorage.removeItem('lang');
    TestBed.inject(DOCUMENT).body.classList.remove('mobile-nav-active');
  });

  it('links to every section with translated labels', async () => {
    const fixture = await render();
    const links: HTMLAnchorElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('.nav-menu a'),
    );

    expect(links.map((link) => link.getAttribute('href'))).toEqual(
      NAV_ITEMS.map((item) => `#${item.target}`),
    );
    expect(links.map((link) => link.textContent?.trim())).toEqual(
      NAV_ITEMS.map((item) => CONTENT.es.ui.nav[item.id]),
    );
  });

  it('opens and closes the mobile menu', async () => {
    const fixture = await render();
    const toggle: HTMLButtonElement = fixture.nativeElement.querySelector('.mobile-nav-toggle');
    const body = TestBed.inject(DOCUMENT).body;

    toggle.click();
    await fixture.whenStable();
    expect(body.classList).toContain('mobile-nav-active');
    expect(toggle.getAttribute('aria-expanded')).toBe('true');

    const link: HTMLAnchorElement = fixture.nativeElement.querySelector('.nav-menu a');
    // Keep Karma's page from navigating; the component's handler still runs.
    link.addEventListener('click', (event) => event.preventDefault());
    link.click();
    await fixture.whenStable();
    expect(body.classList).not.toContain('mobile-nav-active');
    expect(toggle.getAttribute('aria-expanded')).toBe('false');
  });

  it('changes the language from the switch', async () => {
    const fixture = await render();
    const english: HTMLButtonElement = fixture.nativeElement.querySelector(
      '.language-switch button[lang="en"]',
    );

    english.click();
    TestBed.tick();
    TestBed.inject(HttpTestingController).expectOne('data/en.json').flush(CONTENT.en);
    await fixture.whenStable();

    expect(TestBed.inject(ContentService).language()).toBe('en');
    expect(english.getAttribute('aria-pressed')).toBe('true');
    expect(fixture.nativeElement.querySelector('.nav-menu a span').textContent).toBe('Home');
  });
});
