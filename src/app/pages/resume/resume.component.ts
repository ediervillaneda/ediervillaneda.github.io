import { Component, OnInit } from '@angular/core';
import { Resume } from 'src/app/interfaces/resume.interfase';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  selector: 'app-resume',
  templateUrl: './resume.component.html',
})
export class ResumeComponent implements OnInit {
  constructor(public _resume: ResumeService) {}

  ngOnInit(): void {}
}
