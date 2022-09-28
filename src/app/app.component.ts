import { Component } from '@angular/core';
import { AboutService } from './services/about.service';
import { HeroService } from './services/hero.service';
import { SocialService } from './services/social.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'ediervillaneda.github.io';
  constructor(
    public _about: AboutService,
    public _hero: HeroService,
    public _social: SocialService
  ) {}
}
