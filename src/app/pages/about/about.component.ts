import { Component, OnInit } from '@angular/core';
import { GlobalCostants } from 'src/app/global.constants';
import { AboutService } from '../../services/about.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css'],
})
export class AboutComponent implements OnInit {
  constructor(public _about: AboutService) {}

  ngOnInit(): void {}
}
