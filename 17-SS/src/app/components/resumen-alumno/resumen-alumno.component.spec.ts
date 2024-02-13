import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ResumenAlumnoComponent } from './resumen-alumno.component';

describe('ResumenAlumnoComponent', () => {
  let component: ResumenAlumnoComponent;
  let fixture: ComponentFixture<ResumenAlumnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ResumenAlumnoComponent]
    });
    fixture = TestBed.createComponent(ResumenAlumnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
