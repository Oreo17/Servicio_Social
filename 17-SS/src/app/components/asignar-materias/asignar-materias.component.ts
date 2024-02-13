import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-asignar-materias',
  templateUrl: './asignar-materias.component.html',
  styleUrls: ['./asignar-materias.component.css']
})
export class AsignarMateriasComponent {
  idAccount?: string;
  user: any = {};
  next: any = [];

  courseError: boolean = false;
  courseExito: boolean = false;
  selectedCourse: any;
  guardar: boolean = true;
  ok: boolean = false;

  constructor(private api: ApiServiceService, private router: ActivatedRoute) {
    this.router.params.subscribe((params: any) => {
      this.idAccount = params.id;
      this.userInfo(this.idAccount);
    });
  }

  userInfo(id: any) {
    this.api.getUserInfo(id).subscribe((response: any) => {
      this.user = response.data;
      console.log(this.user);
      const avance = this.user.avance;
      /*
      if (avance === "0.00") {
        this.getNew(this.idAccount);
      } else {
        this.getNext(this.idAccount);
      }
      */
      this.getNext(this.idAccount);
    });
  }

  getNew(id: any) {
    this.api.getClassesNewStudent(id).subscribe((response: any) => {
      this.next = response.data;
      console.log(this.next);
    });
  }

  getNext(id: any) {
    this.api.getNextClasses(id).subscribe((response: any) => {
      this.next = response.next;
      console.log(this.next);
    });
  }

  addNewCourseStudent(data: any) {
    this.api.addCourse(data).subscribe((response: any) => {
      console.log(response);
    })
  }

  saveCourse() {
    if (this.selectedCourse) {
      console.log(this.selectedCourse);
      const data = {
        idMateria: this.selectedCourse.id,
        idCuenta: Number(this.idAccount),
      };
      console.log(data);
      this.addNewCourseStudent(data);
      this.reset();
    } else {
      console.log("Error");
      this.guardar = false;
      this.courseError = true;
      this.ok = true;
    }
  }

  reset() {
    this.selectedCourse = null;
    this.ok = false;
    this.guardar = true;
    this.courseError = false;
    this.courseExito = false;
    this.getNext(this.idAccount);
  }

}
