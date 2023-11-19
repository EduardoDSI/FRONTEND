import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDeudaRegisterComponent } from './mant-deuda-register.component';

describe('MantDeudaRegisterComponent', () => {
  let component: MantDeudaRegisterComponent;
  let fixture: ComponentFixture<MantDeudaRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDeudaRegisterComponent]
    });
    fixture = TestBed.createComponent(MantDeudaRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
