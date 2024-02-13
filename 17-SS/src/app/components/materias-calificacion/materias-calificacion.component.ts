import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-materias-calificacion',
  templateUrl: './materias-calificacion.component.html',
  styleUrls: ['./materias-calificacion.component.css']
})
export class MateriasCalificacionComponent {
  user: any = {}
  data?: any;
  selectedMateria: any;
  calificacion: number | undefined;
  final: any;
  idAccount: string | undefined;
  calificacionError: boolean = false;
  calificacionExito: boolean = false;
  guardar: boolean = true;
  ok: boolean = false;

  constructor(private api: ApiServiceService, private path: Router, private router: ActivatedRoute) {
    this.router.params.subscribe((params: any)=>{
      this.idAccount = params.id;
      this.getCursos(this.idAccount);
      this.userInfo(this.idAccount);
    })
  }

  userInfo(id: any){
    this.api.getUserInfo(id).subscribe((response:any)=>{
      this.user = response.data;
      console.log(this.user);
    })
  }

  getCursos(id: any){
    this.api.getCurrentClasses(id).subscribe((response: any) => {
      this.data = response.current;
      console.log(this.data);
    });
  }

  guardarCalificacion() {
    if (this.calificacion !== undefined && this.calificacion <= 10 && this.calificacion >= 0 && this.selectedMateria && this.selectedMateria.materiaNRC) {
      if(this.calificacion >=6){
        console.log("Aprobado");
        this.calificacionError = false;
        this.final = {
          calificacion: this.calificacion,
          cursada: 1,
          idCurso: this.selectedMateria.materiaNRC,
          idCuenta: Number(this.idAccount),
        };
        this.saveGrade(this.final);
        this.getCursos(this.idAccount);
        this.calificacionExito = true;
        this.guardar = false;
        this.ok = true;
        console.log(this.final);        
      }else{
        console.log("Reprobado");
        this.calificacionError = false;
        this.final = {
          calificacion: 5,
          cursada: 0,
          idCurso: this.selectedMateria.materiaNRC,
          idCuenta: this.idAccount,
        };
        this.saveGrade(this.final);
        this.getCursos(this.idAccount);
        this.calificacionExito = true;
        this.guardar = false;
        this.ok = true;
        console.log(this.final); 
      }

    } else {
      this.calificacionError = true;
      console.log("Error: Verifica que todos los campos estén seleccionados y la calificación sea válida.");
    }
  }

  saveGrade(data: any) {
    this.api.addGrade(data).subscribe((response: any)=>{
      console.log(response);
    })
  }

  reset(){
    this.selectedMateria = null;
    this.calificacion = undefined;
    this.ok = false;
    this.calificacionExito = false;
    this.guardar = true;
  }
}
