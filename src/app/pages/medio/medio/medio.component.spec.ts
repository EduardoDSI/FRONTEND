import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedioComponent } from './medio.component';

describe('MedioComponent', () => {
  let component: MedioComponent;
  let fixture: ComponentFixture<MedioComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedioComponent]
    });
    fixture = TestBed.createComponent(MedioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
