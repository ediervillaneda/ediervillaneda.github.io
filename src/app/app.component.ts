import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from './services/about.service';
import { HeroService } from './services/hero.service';
import { SocialService } from './services/social.service';
import { HeaderComponent } from './share/header/header.component';
import { HeroComponent } from './share/hero/hero.component';
import { AboutComponent } from './pages/about/about.component';
import { FactsComponent } from './pages/facts/facts.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { ServicesComponent } from './pages/services/services.component';
import { ReferencesComponent } from './pages/references/references.component';
import { ContactComponent } from './pages/contact/contact.component';
import { FooterComponent } from './share/footer/footer.component';

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    CommonModule,
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
  ],
})
export class AppComponent {
  title = 'ediervillaneda.github.io';
  constructor(
    public _about: AboutService,
    public _hero: HeroService,
    public _social: SocialService
  ) {}
}
