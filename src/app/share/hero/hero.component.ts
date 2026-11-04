import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  imports: [FaIconComponent],
})
export class HeroComponent {
  protected readonly content = inject(ContentService);
}
