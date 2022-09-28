import { Component, OnInit } from '@angular/core';
import { FactsService } from '../../services/facts.service';

@Component({
  selector: 'app-facts',
  templateUrl: './facts.component.html',
  styleUrls: ['./facts.component.css'],
})
export class FactsComponent implements OnInit {
  constructor(public _facts: FactsService) {}

  ngOnInit(): void {
    /* TODO document why this method 'ngOnInit' is empty */
  }
}
