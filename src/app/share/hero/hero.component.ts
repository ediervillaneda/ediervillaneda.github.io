import { Component, OnInit } from '@angular/core';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { AboutService } from '../../services/about.service';
import { HeroService } from '../../services/hero.service';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.css'],
})
export class HeroComponent implements OnInit {
  constructor(
    public _hero: HeroService,
    public _social: SocialService,
    public _about: AboutService,
    public library: FaIconLibrary
  ) {
    library.addIconPacks(fab);
  }

  ngOnInit(): void {
    this._social['social'].forEach(function (element: any) {
      console.log(element);
    });
    console.log(this._social);

    /* TODO document why this method 'ngOnInit' is empty */
  }
}
