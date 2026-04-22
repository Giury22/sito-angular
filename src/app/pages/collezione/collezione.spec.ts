import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Collezione } from './collezione';

describe('Collezione', () => {
  let component: Collezione;
  let fixture: ComponentFixture<Collezione>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Collezione],
    }).compileComponents();

    fixture = TestBed.createComponent(Collezione);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
