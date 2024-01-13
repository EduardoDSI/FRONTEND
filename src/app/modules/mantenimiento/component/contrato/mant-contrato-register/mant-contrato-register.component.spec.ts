import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantContratoRegisterComponent } from './mant-contrato-register.component';

describe('MantContratoRegisterComponent', () => {
  let component: MantContratoRegisterComponent;
  let fixture: ComponentFixture<MantContratoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantContratoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantContratoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
