import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from '../../services/about.service';

@Component({
  standalone: true,
  selector: 'app-about',
  templateUrl: './about.component.html',
  imports: [CommonModule],
})
export class AboutComponent implements OnInit {
  constructor(public _about: AboutService) {}

  ngOnInit(): void {}
}
