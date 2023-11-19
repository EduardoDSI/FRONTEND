import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDireccionRegisterComponent } from './mant-direccion-register.component';

describe('MantDireccionRegisterComponent', () => {
  let component: MantDireccionRegisterComponent;
  let fixture: ComponentFixture<MantDireccionRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDireccionRegisterComponent]
    });
    fixture = TestBed.createComponent(MantDireccionRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
