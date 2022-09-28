import { Component, OnInit } from '@angular/core';
import { FactsService } from '../../services/facts.service';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';

import { FaIconLibrary } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css'],
})
export class FactsComponent implements OnInit {
  constructor(public _facts: FactsService, public library: FaIconLibrary) {
    library.addIconPacks(fas, far);
    console.log(this._facts['facts']);
  }

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}
