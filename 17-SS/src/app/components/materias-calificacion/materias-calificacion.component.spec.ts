import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCalificacionComponent } from './materias-calificacion.component';

describe('MateriasCalificacionComponent', () => {
  let component: MateriasCalificacionComponent;
  let fixture: ComponentFixture<MateriasCalificacionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MateriasCalificacionComponent]
    });
    fixture = TestBed.createComponent(MateriasCalificacionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
