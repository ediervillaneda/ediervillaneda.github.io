import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-references',
  templateUrl: './references.component.html',
  imports: [FaIconComponent],
})
export class ReferencesComponent {
  protected readonly content = inject(ContentService);
}
