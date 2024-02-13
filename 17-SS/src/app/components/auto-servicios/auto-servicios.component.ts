import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-auto-servicios',
  templateUrl: './auto-servicios.component.html',
  styleUrls: ['./auto-servicios.component.css'],
})
export class AutoServiciosComponent {
  idUser?: string;
  user: any = {};
  current: any = [];
  next: any = [];
  failed: any = []
  mostrarReprobadas: boolean = false;
  mostrarMensaje: boolean = false;

  constructor(
    //private api: ApiServiceService,
    private api: StudentServiceService,
    private jwtHelper: JwtHelperService,
  ) {
    this.decodeToken();
    this.userInfo(this.idUser);
    this.getCurrent(this.idUser);
    this.getNext(this.idUser);
    this.getFailed(this.idUser);
  }

  userInfo(id:any) {
    this.api.getUserInfo(id).subscribe((response: any) => {
      this.user = response.data;
      //console.log(this.user);
    });
  }

  getCurrent(id: any) {
    this.api.getCurrentClasses(id).subscribe((response: any) => {
      this.current = Array.of(response);
      //console.log(this.current);
    });
  }

  getNext(id: any) {
    this.api.getNextClasses(id).subscribe((response: any) => {
      this.next = Array.of(response);
      console.log(this.next);
    });
  }

  getFailed(id: any){
    this.api.getFailedClasses(id).subscribe((response: any)=>{
      this.failed = Array.of(response.data)
      console.log(this.failed.length)
      if(this.failed[0].length > 1){
        this.mostrarReprobadas = true;
      }else{
        this.mostrarMensaje = true
      }
      console.log(this.failed);
    })
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
