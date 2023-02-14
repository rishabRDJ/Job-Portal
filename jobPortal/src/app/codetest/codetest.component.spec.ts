import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodetestComponent } from './codetest.component';

describe('CodetestComponent', () => {
  let component: CodetestComponent;
  let fixture: ComponentFixture<CodetestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CodetestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CodetestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
