import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  imports: [FaIconComponent],
})
export class ContactComponent {
  protected readonly content = inject(ContentService);
}
