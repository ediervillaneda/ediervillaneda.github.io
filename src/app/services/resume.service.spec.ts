import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { GlobalCostants } from '../global.constants';
import { Resume } from '../interfaces/resume.interfase';
import { ResumeService } from './resume.service';

describe('ResumeService', () => {
  let service: ResumeService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(ResumeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpMock.verify());

  it('should be created', () => {
    httpMock.expectOne(`${GlobalCostants.firebaseUrl}/resumen.json`).flush({});
    expect(service).toBeTruthy();
  });

  it('should load the resume from Firebase', () => {
    const resume: Resume = { descripcion: 'Resumen', educations: [], experiences: [] };

    httpMock.expectOne(`${GlobalCostants.firebaseUrl}/resumen.json`).flush(resume);

    expect(service.resume).toEqual(resume);
    expect(service.cargando).toBeFalse();
  });
});
