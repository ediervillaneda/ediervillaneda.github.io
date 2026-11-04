import { Type } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import {
  CONTENT,
  flushContent,
  provideContentTesting,
  startWithLanguage,
} from '../../testing/content-testing';
import { AboutComponent } from './about/about.component';
import { ContactComponent } from './contact/contact.component';
import { ResumeComponent } from './resume/resume.component';
import { SkillsComponent } from './skills/skills.component';

async function render<T>(component: Type<T>, language: 'es' | 'en' = 'es') {
  startWithLanguage(language);
  TestBed.configureTestingModule({ imports: [component], providers: provideContentTesting() });
  const fixture = TestBed.createComponent(component);
  await flushContent(language);
  await fixture.whenStable();
  return fixture;
}

describe('page sections', () => {
  afterEach(() => localStorage.removeItem('lang'));

  it('About shows contact details without private data', async () => {
    const fixture = await render(AboutComponent);
    const text: string = fixture.nativeElement.textContent;

    expect(text).toContain(CONTENT.es.about.email);
    expect(text).toContain(CONTENT.es.about.degree);
    expect(text).not.toMatch(/319|1982|Edad|Birthday/);
    expect(fixture.nativeElement.querySelector('img').getAttribute('alt')).toBe(
      CONTENT.es.ui.about.photoAlt,
    );
  });

  it('Contact only lists contact details, with no form or phone', async () => {
    const fixture = await render(ContactComponent);
    const element: HTMLElement = fixture.nativeElement;

    expect(element.querySelector('form')).toBeNull();
    expect(element.querySelector(`a[href="mailto:${CONTENT.es.contact.email}"]`)).not.toBeNull();
    expect(element.textContent).toContain(CONTENT.es.contact.location);
    expect(element.textContent).not.toContain('319');
  });

  it('Resume labels the current job with the translated "present" text', async () => {
    const fixture = await render(ResumeComponent, 'en');
    const dates = Array.from(
      fixture.nativeElement.querySelectorAll('h5') as NodeListOf<HTMLElement>,
    );

    expect(dates.some((h5) => h5.textContent?.includes('January 2019 - Present'))).toBeTrue();
  });

  it('Skills splits the items into two balanced columns', async () => {
    const fixture = await render(SkillsComponent);
    const [left, right] = fixture.componentInstance.columns();

    expect(left.length + right.length).toBe(CONTENT.es.skills.items.length);
    expect(Math.abs(left.length - right.length)).toBeLessThanOrEqual(1);
  });
});
