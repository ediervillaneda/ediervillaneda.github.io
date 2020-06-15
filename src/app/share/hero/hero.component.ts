import { Component, OnInit, } from '@angular/core';
import { HeroService } from '../../services/hero.service';
import { SocialService } from '../../services/social.service';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css']
})

export class HeroComponent implements OnInit {

  dataItems: string;

  constructor(public _hero: HeroService, public _social: SocialService, public _about: AboutService) { }

  ngOnInit(): void {
  }

}
