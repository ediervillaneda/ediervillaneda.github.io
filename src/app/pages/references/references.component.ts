import { Component } from '@angular/core';
import { NgFor } from '@angular/common';
import { ReferencesService } from '../../services/references.service';

@Component({
  standalone: true,
  selector: 'app-references',
  templateUrl: './references.component.html',
  imports: [NgFor],
})
export class ReferencesComponent {
  constructor(public _references: ReferencesService) {}
}
