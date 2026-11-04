import { TestBed } from '@angular/core/testing';

import {
  CONTENT,
  flushContent,
  provideContentTesting,
  startWithLanguage,
} from '../../../testing/content-testing';
import { PortfolioComponent } from './portfolio.component';

describe('PortfolioComponent', () => {
  beforeEach(() => {
    startWithLanguage('es');
    TestBed.configureTestingModule({
      imports: [PortfolioComponent],
      providers: provideContentTesting(),
    });
  });

  async function render() {
    const fixture = TestBed.createComponent(PortfolioComponent);
    await flushContent('es');
    await fixture.whenStable();
    return fixture;
  }

  it('shows every project by default', async () => {
    const fixture = await render();
    const cards = fixture.nativeElement.querySelectorAll('.portfolio-item');

    expect(cards.length).toBe(CONTENT.es.portfolio.items.length);
  });

  it('filters projects when a category button is clicked', async () => {
    const fixture = await render();
    const buttons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('#portfolio-flters button'),
    );
    const mainframe = buttons.find((button) => button.textContent?.trim() === 'Mainframe');

    mainframe?.click();
    await fixture.whenStable();

    const expected = CONTENT.es.portfolio.items.filter((item) => item.category === 'mainframe');
    expect(fixture.componentInstance.filteredItems()).toEqual(expected);
    expect(fixture.nativeElement.querySelectorAll('.portfolio-item').length).toBe(expected.length);
    expect(mainframe?.getAttribute('aria-pressed')).toBe('true');
  });

  it('shows every project again with the "all" filter', async () => {
    const fixture = await render();
    fixture.componentInstance.setFilter('web');
    fixture.componentInstance.setFilter(null);
    await fixture.whenStable();

    expect(fixture.componentInstance.filteredItems().length).toBe(
      CONTENT.es.portfolio.items.length,
    );
  });
});
