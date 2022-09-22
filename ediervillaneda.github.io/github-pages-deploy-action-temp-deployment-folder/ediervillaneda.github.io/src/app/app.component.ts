import { Component } from '@angular/core';
import { AboutService } from './services/about.service';
import { HeroService } from './services/hero.service';
import { SocialService } from './services/social.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor(public about: AboutService,
    public heroService: HeroService,
    public socialService: SocialService) {  }
}
