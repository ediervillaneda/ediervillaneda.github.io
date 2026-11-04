import { Component, computed, inject, signal } from '@angular/core';

import { PortfolioCategoryId } from '../../content/content.model';
import { ContentService } from '../../content/content.service';

interface HeaderStyle {
  bg: string;
  text: string;
}

const HEADER_STYLES: Record<PortfolioCategoryId, HeaderStyle> = {
  mainframe: { bg: '#4a5568', text: '#e2e8f0' },
  web: { bg: '#3a6186', text: '#dce8f5' },
  financial: { bg: '#3d7a5e', text: '#d8f0e4' },
};

@Component({
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
})
export class PortfolioComponent {
  protected readonly content = inject(ContentService);

  /** Selected category, or `null` for all projects. */
  readonly activeFilter = signal<PortfolioCategoryId | null>(null);

  private readonly portfolio = computed(() => this.content.content()?.portfolio);

  readonly filteredItems = computed(() => {
    const items = this.portfolio()?.items ?? [];
    const filter = this.activeFilter();
    return filter ? items.filter((item) => item.category === filter) : items;
  });

  private readonly labels = computed(
    () => new Map(this.portfolio()?.categories.map((category) => [category.id, category.label])),
  );

  setFilter(filter: PortfolioCategoryId | null): void {
    this.activeFilter.set(filter);
  }

  protected label(category: PortfolioCategoryId): string {
    return this.labels().get(category) ?? category;
  }

  protected headerStyle(category: PortfolioCategoryId): HeaderStyle {
    return HEADER_STYLES[category];
  }
}
