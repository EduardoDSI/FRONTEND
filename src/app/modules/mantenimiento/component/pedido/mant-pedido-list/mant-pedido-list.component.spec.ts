import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantPedidoListComponent } from './mant-pedido-list.component';

describe('MantPedidoListComponent', () => {
  let component: MantPedidoListComponent;
  let fixture: ComponentFixture<MantPedidoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantPedidoListComponent]
    });
    fixture = TestBed.createComponent(MantPedidoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
