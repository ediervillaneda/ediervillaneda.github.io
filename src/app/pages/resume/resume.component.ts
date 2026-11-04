import { Component, inject } from '@angular/core';

import { ContentService } from '../../content/content.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent {
  protected readonly content = inject(ContentService);
}
