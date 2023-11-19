import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPedidoRegisterComponent } from './mant-pedido-register.component';

describe('MantPedidoRegisterComponent', () => {
  let component: MantPedidoRegisterComponent;
  let fixture: ComponentFixture<MantPedidoRegisterComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantPedidoRegisterComponent]
    });
    fixture = TestBed.createComponent(MantPedidoRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
