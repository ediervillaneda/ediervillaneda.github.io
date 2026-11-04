import { Component, computed, inject } from '@angular/core';

import { ContentService } from '../../content/content.service';
import { InViewDirective } from '../../share/in-view.directive';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  imports: [InViewDirective],
})
export class SkillsComponent {
  protected readonly content = inject(ContentService);

  /** Skills split into two balanced columns. */
  readonly columns = computed(() => {
    const items = this.content.content()?.skills.items ?? [];
    const half = Math.ceil(items.length / 2);
    return [items.slice(0, half), items.slice(half)];
  });
}
