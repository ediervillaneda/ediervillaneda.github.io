import { Component, OnInit } from '@angular/core';
import { AboutService } from 'src/app/services/about.service';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  constructor(public _about: AboutService) {}

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  
  }
}
