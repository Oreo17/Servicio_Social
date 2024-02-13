import { Component } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { StudentServiceService } from 'src/app/service/student-service.service';

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html',
  styleUrls: ['./mapa.component.css']
})
export class MapaComponent {
  idUser?: string;
  data:any = [];
  constructor(private api: StudentServiceService,private jwtHelper: JwtHelperService){
    this.decodeToken()
    this.getClassesMap(this.idUser)
  }
  getClassesMap(id: any){
    this.api.getAllClassesMap(id).subscribe((response: any)=>{
      this.data = Array.of(response)
      console.log(this.data);
    })
  }

  getClase(calificacion: number, cursada: string): string {
    if (cursada === '1') {
      return 'aprobada';
    } else if (cursada === '0' && calificacion === 0) {
      return 'cursando';
    }else if(cursada === '0' && calificacion === 5){
     return "reprobada"
    }
    else {
      return ''; // En caso de otros valores
    }
  }

  getStatus(intentos: number, cursada: string): string {
    if (intentos > 1) {
      return 'fa-solid fa-circle-xmark fa-xl pb-2';
    } else if (intentos === 1  && cursada === "1") {
      return 'fa-solid fa-circle-check fa-xl pb-2';
    }
    else {
      return ''; // En caso de otros valores
    }
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
