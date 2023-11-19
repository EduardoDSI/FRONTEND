import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantDeudaListComponent } from './mant-deuda-list.component';

describe('MantDeudaListComponent', () => {
  let component: MantDeudaListComponent;
  let fixture: ComponentFixture<MantDeudaListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantDeudaListComponent]
    });
    fixture = TestBed.createComponent(MantDeudaListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
