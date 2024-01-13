import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantContratoListComponent } from './mant-contrato-list.component';

describe('MantContratoListComponent', () => {
  let component: MantContratoListComponent;
  let fixture: ComponentFixture<MantContratoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantContratoListComponent]
    });
    fixture = TestBed.createComponent(MantContratoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
