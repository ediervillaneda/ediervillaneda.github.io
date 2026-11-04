import { provideHttpClient } from '@angular/common/http';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';

import { AppComponent } from './app.component';
import { GlobalCostants } from './global.constants';

describe('AppComponent', () => {
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppComponent],
      providers: [provideHttpClient(), provideHttpClientTesting()],
    }).compileComponents();
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'ediervillaneda.github.io'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('ediervillaneda.github.io');
  });

  it('should render the hero name loaded from Firebase', () => {
    const fixture = TestBed.createComponent(AppComponent);
    // HeroService and SocialService both request hero.json.
    httpMock
      .match(`${GlobalCostants.firebaseUrl}/hero.json`)
      .forEach(req => req.flush({ nombre: 'Edier Andrés Villaneda Navarro', social: [] }));
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('#hero h1')?.textContent).toContain(
      'Edier Andrés Villaneda Navarro'
    );
  });
});
