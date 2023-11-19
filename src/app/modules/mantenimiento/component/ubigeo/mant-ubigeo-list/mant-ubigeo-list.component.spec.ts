import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MantubigeoListComponent } from './mant-ubigeo-list.component';

describe('MantubigeoListComponent', () => {
  let component: MantubigeoListComponent;
  let fixture: ComponentFixture<MantubigeoListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MantubigeoListComponent]
    });
    fixture = TestBed.createComponent(MantubigeoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
