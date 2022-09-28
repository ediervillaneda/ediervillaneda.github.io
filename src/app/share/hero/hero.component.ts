import { Component, OnInit } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { AboutService } from '../../services/about.service';
import { faFacebook, faTwitter, faInstagram, faLinkedin, faSkype } from '@fortawesome/free-brands-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faTwitter, faLinkedin);

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {

  facebook = faFacebook;
  twitter = faTwitter;
  instagram = faInstagram;
  skype = faSkype;
  linkedin = faLinkedin;

  dataItems!: string;

  constructor(
    public _hero: HeroService,
    public _about: AboutService
  ) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}