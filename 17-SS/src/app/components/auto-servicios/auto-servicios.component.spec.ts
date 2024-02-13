import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoServiciosComponent } from './auto-servicios.component';

describe('AutoServiciosComponent', () => {
  let component: AutoServiciosComponent;
  let fixture: ComponentFixture<AutoServiciosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutoServiciosComponent]
    });
    fixture = TestBed.createComponent(AutoServiciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
