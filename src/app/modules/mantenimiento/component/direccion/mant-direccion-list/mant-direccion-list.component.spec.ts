import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDireccionListComponent } from './mant-direccion-list.component';

describe('MantDireccionListComponent', () => {
  let component: MantDireccionListComponent;
  let fixture: ComponentFixture<MantDireccionListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDireccionListComponent]
    });
    fixture = TestBed.createComponent(MantDireccionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
