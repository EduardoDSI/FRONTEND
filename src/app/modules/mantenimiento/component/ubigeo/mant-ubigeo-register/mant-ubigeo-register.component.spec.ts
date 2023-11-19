import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantUbigeoRegisterComponent } from './mant-ubigeo-register.component';

describe('MantUbigeoRegisterComponent', () => {
  let component: MantUbigeoRegisterComponent;
  let fixture: ComponentFixture<MantUbigeoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantUbigeoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantUbigeoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

