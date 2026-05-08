import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ResumeService } from 'src/app/services/resume.service';

@Component({
  standalone: true,
  selector: 'app-resume',
  templateUrl: './resume.component.html',
  imports: [CommonModule],
})
export class ResumeComponent implements OnInit {
  constructor(public _resume: ResumeService) {}

  ngOnInit(): void {}
}
