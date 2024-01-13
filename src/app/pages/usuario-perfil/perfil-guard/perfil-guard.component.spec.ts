import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PerfilGuardComponent } from './perfil-guard.component';

describe('PerfilGuardComponent', () => {
  let component: PerfilGuardComponent;
  let fixture: ComponentFixture<PerfilGuardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PerfilGuardComponent]
    });
    fixture = TestBed.createComponent(PerfilGuardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
