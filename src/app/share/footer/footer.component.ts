import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  imports: [FaIconComponent],
})
export class FooterComponent {
  protected readonly content = inject(ContentService);
  protected readonly year = new Date().getFullYear();
}
