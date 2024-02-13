import { Component, OnInit } from "@angular/core";
import { FormGroup, Validators, FormBuilder } from "@angular/forms";
import { ApiServiceService } from 'src/app/service/api-service.service';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-agregar-alumnos',
  templateUrl: './agregar-alumnos.component.html',
  styleUrls: ['./agregar-alumnos.component.css']
})
export class AgregarAlumnosComponent implements OnInit {

  idUser?: string;

  registerAccount! : FormGroup;
  registerUser!: FormGroup;
  submitted = false;
  mostrarFormularioAlumno = true;
  next: boolean = false;
  back: boolean = false;
  accountSuccess: boolean = false;
  userSuccess: boolean = false;

  newID: any;

  constructor(private formAccount: FormBuilder, private formUser: FormBuilder, private api: ApiServiceService, private jwtHelper: JwtHelperService) {
    this.decodeToken();
  }

  ngOnInit(): void {
    this.registerAccount = this.formAccount.group({
      nombre: ['', Validators.required],
      apellidoPaterno: ['', Validators.required],
      apellidoMaterno: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      telefono: ['', Validators.required],
    });
    this.registerUser = this.formUser.group({
      matricula: ['', [Validators.required, Validators.minLength(9)]],
      contrasena: ['', [Validators.required, Validators.minLength(5)]],
      repeatContrasena: ['', Validators.required]
    },{
      validator: this.mustMatch('contrasena', 'repeatContrasena')
    })
  }
  
  saveAccount(): void {
    this.submitted = true;
    const data = this.registerAccount.value;
    if (this.registerAccount.invalid) {
      return;
    }
    const body = {
      nombre: data.nombre,
      apellidoPaterno: data.apellidoPaterno,
      apellidoMaterno: data.apellidoMaterno,
      correo: data.correo,
      telefono: data.telefono,
      tipo: "0",
      idPlanEstudio: 1,
      eliminado: 0
    }
    console.log(body);
    this.api.createAccount(body).subscribe((response: any)=>{
      console.log(response);
      this.newID = response.data.id;
    })
    this.accountSuccess = true;
    this.next = true;
    this.onResetAccount();
  }

  saveUser(): void{
    this.submitted = true;
    const data = this.registerUser.value;
    console.log(data);
    console.log(this.newID);
    if (this.registerUser.invalid) {
      return;
    }
    const body = {
      matricula: data.matricula,
      contrasena: data.contrasena,
      idCuenta: this.newID,
      tutorId: this.idUser,
      eliminado: 0
    }
    console.log(body);
    this.api.createUser(body).subscribe((response: any)=>{
      console.log(response)
      this.newID = 0;
    })
    this.userSuccess = true;
    this.back = true;
    this.onResetUser();
  }


  onResetAccount() {
    this.submitted = false;
    this.registerAccount.reset();
  }

  
  onResetUser() {
    this.submitted = false;
    this.registerUser.reset();
  }

  changeForms() {
    this.mostrarFormularioAlumno = !this.mostrarFormularioAlumno;
    this.accountSuccess = false;
    this.next = false;
  }

  mustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['mustMatch']) {
        return;
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ mustMatch: true });
      } else {
        matchingControl.setErrors(null);
      }
    };
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
