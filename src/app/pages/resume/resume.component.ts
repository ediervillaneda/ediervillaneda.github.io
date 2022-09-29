import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  constructor(public _resume: ResumeService) {
    /* TODO document why this constructor is empty */
  }

  ngOnInit(): void {
    // TODO document why this method 'ngOnInit' is empty
  }
}
