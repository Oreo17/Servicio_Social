import { Component } from '@angular/core';
import { ApiServiceService } from 'src/app/service/api-service.service';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-mostrar-alumnos',
  templateUrl: './mostrar-alumnos.component.html',
  styleUrls: ['./mostrar-alumnos.component.css']
})
export class MostrarAlumnosComponent {
  idUser?: string;
  user: any = {};
  alumnos: any;
  constructor(private api: ApiServiceService, private router: Router, private jwtHelper: JwtHelperService) {
    this.decodeToken();
    this.userInfo(this.idUser);
    this.getUsersInfo(this.idUser);
  }

  navegarAAlumno(id: number) {
    this.router.navigate(['buap/admin/resumen', id]);
  }

  navegarCalificacion(id: number) {
    this.router.navigate(['buap/admin/calificaciones', id]);
  }

  navegarMaterias(id: number) {
    this.router.navigate(['buap/admin/materias', id]);
  }

  search(value: string) {
    if(value.length > 0){
      const id = this.idUser;
      this.api.getUsersTutorQuery(id,value).subscribe((response:any)=>{
        this.alumnos = response.data;
      });      
    }else{
      this.getUsersInfo(this.idUser);
    }
  }

  getUsersInfo(id: any){
    this.api.getUsersTutor(id).subscribe((response: any) => {
      this.alumnos = response.data;
      //console.log(this.alumnos);
    })
  }

  userInfo(id:any) {
    this.api.getUserInfo(id).subscribe((response: any) => {
      this.user = response.data;
      console.log(this.user);
    });
  }

  decodeToken() {
    const token = localStorage.getItem('token'); // Obtén el token desde el localStorage o de donde lo tengas almacenado

    if (token) {
      try {
        // Decodifica el token JWT
        const tokenPayload = this.jwtHelper.decodeToken(token);
        this.idUser = (tokenPayload._id).toString();
        console.log(this.idUser);
        return tokenPayload;
      } catch (error) {
        return false; // Si hay un error al decodificar el token, se considera inválido
      }
    }
    return false; // Si no se encuentra un token, se considera inválido
  }

}
