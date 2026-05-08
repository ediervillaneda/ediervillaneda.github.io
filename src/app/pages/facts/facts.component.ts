import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { FactsService } from '../../services/facts.service';

@Component({
  standalone: true,
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  imports: [CommonModule, FontAwesomeModule],
})
export class FactsComponent implements OnInit {
  constructor(public _facts: FactsService, public library: FaIconLibrary) {
    library.addIconPacks(fas, far);
  }

  ngOnInit(): void {}
}
