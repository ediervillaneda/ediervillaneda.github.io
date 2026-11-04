import { DOCUMENT } from '@angular/common';
import { Component, afterNextRender, effect, inject } from '@angular/core';
import AOS from 'aos';

import { ContentService } from './content/content.service';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FactsComponent } from './pages/facts/facts.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { ServicesComponent } from './pages/services/services.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { BackToTopComponent } from './share/back-to-top/back-to-top.component';
import { FooterComponent } from './share/footer/footer.component';
import { HeaderComponent } from './share/header/header.component';
import { HeroComponent } from './share/hero/hero.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  imports: [
    HeaderComponent,
    HeroComponent,
    AboutComponent,
    FactsComponent,
    SkillsComponent,
    ResumeComponent,
    PortfolioComponent,
    ServicesComponent,
    ReferencesComponent,
    ContactComponent,
    FooterComponent,
    BackToTopComponent,
  ],
})
export class AppComponent {
  protected readonly content = inject(ContentService);

  constructor() {
    const document = inject(DOCUMENT);

    // AOS watches the DOM, so sections rendered later still animate.
    afterNextRender(() => AOS.init({ duration: 1000, once: true }));

    effect(() => {
      if (this.content.loaded() || this.content.error()) {
        document.getElementById('preloader')?.remove();
      }
    });
  }
}
