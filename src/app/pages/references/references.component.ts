import { Component } from '@angular/core';
import { ReferencesService } from '../../services/references.service';

@Component({
  standalone: true,
  selector: 'app-references',
  templateUrl: './references.component.html',
  imports: [],
})
export class ReferencesComponent {
  constructor(public _references: ReferencesService) {}
}
