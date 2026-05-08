import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AboutService } from 'src/app/services/about.service';

@Component({
  standalone: true,
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  imports: [CommonModule],
})
export class SkillsComponent implements OnInit {
  constructor(public _about: AboutService) {}

  ngOnInit(): void {}
}
