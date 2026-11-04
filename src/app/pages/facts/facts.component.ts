import { Component, inject } from '@angular/core';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { IconName } from '@fortawesome/fontawesome-svg-core';

import { ContentService } from '../../content/content.service';
import { CountUp } from '../../share/count-up';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  imports: [FaIconComponent, CountUp],
})
export class FactsComponent {
  protected readonly content = inject(ContentService);

  /** Icon names come from the JSON content; they must be registered in `icons.ts`. */
  protected icon(name: string): IconName {
    return name as IconName;
  }
}
