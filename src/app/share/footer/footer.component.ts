import { Component, OnInit } from '@angular/core';
import { SocialService } from '../../services/social.service';
import { faFacebook, faTwitter, faInstagram, faSkype, faLinkedin } from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  facebook = faFacebook;
  twitter = faTwitter;
  instagram = faInstagram;
  skype = faSkype;
  linkedin = faLinkedin;

  constructor(public _social: SocialService) { }

  ngOnInit(): void {
  }

}
