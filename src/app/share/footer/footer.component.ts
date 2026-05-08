import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AboutService } from '../../services/about.service';
import { HeroService } from '../../services/hero.service';
import { SocialService } from '../../services/social.service';

@Component({
  standalone: true,
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css'],
  imports: [CommonModule, FontAwesomeModule],
})
export class FooterComponent implements OnInit {
  constructor(
    public _hero: HeroService,
    public _social: SocialService,
    public _about: AboutService,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fab);
  }

  ngOnInit(): void {}
}
