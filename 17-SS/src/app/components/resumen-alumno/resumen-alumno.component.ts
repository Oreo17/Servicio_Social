import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiServiceService } from 'src/app/service/api-service.service';

@Component({
  selector: 'app-resumen-alumno',
  templateUrl: './resumen-alumno.component.html',
  styleUrls: ['./resumen-alumno.component.css']
})
export class ResumenAlumnoComponent {
  idAccount?: string;
  user: any = {};
  current: any = [];
  next: any = [];
  failed: any = []
  mostrarReprobadas: boolean = false;
  mostrarMensaje: boolean = false;

  constructor(private api: ApiServiceService, private router: ActivatedRoute){
    this.router.params.subscribe((params: any)=>{
      this.idAccount = params.id;
      this.userInfo(this.idAccount)
      this.getCurrent(this.idAccount);
      this.getNext(this.idAccount);
      this.getFailed(this.idAccount);
    })
  }

  userInfo(id: any){
    this.api.getUserInfo(id).subscribe((response: any)=>{
      this.user = response.data;
      console.log(this.user);
    })
  }

  getCurrent(id: any){
    this.api.getCurrentClasses(id).subscribe((response: any)=>{
      this.current = Array.of(response.current);
      console.log(this.current);
    })
  }

  getNext(id: any){
    this.api.getNextClasses(id).subscribe((response: any)=>{
      this.next = Array.of(response.next);
    })
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


}
