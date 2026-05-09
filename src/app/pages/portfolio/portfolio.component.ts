import { Component } from '@angular/core';
import { PortfolioService } from '../../services/portfolio.service';
import { PortfolioItem } from '../../interfaces/portfolio.interface';

@Component({
  standalone: true,
  selector: 'app-portfolio',
  templateUrl: './portfolio.component.html',
  imports: [],
})
export class PortfolioComponent {
  activeFilter = '*';

  private readonly headerStyles: Record<string, { bg: string; text: string }> = {
    Mainframe: { bg: '#4a5568', text: '#e2e8f0' },
    Web: { bg: '#3a6186', text: '#dce8f5' },
    Financiero: { bg: '#3d7a5e', text: '#d8f0e4' },
  };

  constructor(public _portfolio: PortfolioService) {}

  get filteredItems(): PortfolioItem[] {
    const items = this._portfolio.portfolio.items ?? [];
    if (this.activeFilter === '*') return items;
    return items.filter(item => item.categoria === this.activeFilter);
  }

  setFilter(filter: string) {
    this.activeFilter = filter;
  }

  getHeaderStyle(tipo: string) {
    return this.headerStyles[tipo] || { bg: '#4a5568', text: '#e2e8f0' };
  }
}
