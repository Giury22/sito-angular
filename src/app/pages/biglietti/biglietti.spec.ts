import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Biglietti } from './biglietti';

describe('Biglietti', () => {
  let component: Biglietti;
  let fixture: ComponentFixture<Biglietti>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Biglietti],
    }).compileComponents();

    fixture = TestBed.createComponent(Biglietti);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
