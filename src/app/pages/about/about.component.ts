import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [FaIconComponent],
})
export class AboutComponent {
  protected readonly content = inject(ContentService);
}
