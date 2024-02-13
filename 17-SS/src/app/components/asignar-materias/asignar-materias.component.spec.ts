import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignarMateriasComponent } from './asignar-materias.component';

describe('AsignarMateriasComponent', () => {
  let component: AsignarMateriasComponent;
  let fixture: ComponentFixture<AsignarMateriasComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AsignarMateriasComponent]
    });
    fixture = TestBed.createComponent(AsignarMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
