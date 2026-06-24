import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';

import { LanguageService } from '../../shared/language.service';
import { Home } from './home';

describe('Home', () => {
  let component: Home;
  let fixture: ComponentFixture<Home>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Home],
      providers: [provideRouter([])],
    }).compileComponents();

    fixture = TestBed.createComponent(Home);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should format review dates using the selected language', () => {
    const lang = TestBed.inject(LanguageService);

    lang.setLang('en');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('March 2026');
    expect(fixture.nativeElement.textContent).not.toContain('Marzo 2026');

    lang.setLang('it');
    fixture.detectChanges();
    expect(fixture.nativeElement.textContent).toContain('Marzo 2026');
  });
});
