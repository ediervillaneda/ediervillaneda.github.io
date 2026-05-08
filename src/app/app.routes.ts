import { Routes } from '@angular/router';
import { PortfolioComponent } from './pages/portfolio/portfolio.component';
import { AboutComponent } from './pages/about/about.component';
import { ContactComponent } from './pages/contact/contact.component';
import { ResumeComponent } from './pages/resume/resume.component';

export const routes: Routes = [
  { path: 'home', component: PortfolioComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'resume', component: ResumeComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' },
];
