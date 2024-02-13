import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from 'src/app/service/auth-service.service';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  userData: any;
  loginError: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthServiceService,
    private router: Router,
    private localStorage: LocalStorageService
  ) {
    this.loginForm = this.formBuilder.group({
      matricula: [''],
      password: [''],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { matricula, password } = this.loginForm.value;
      this.authService.login(matricula, password).subscribe(
        (response: any) => {
          this.userData = response.data;
          this.loginError = false;
          this.saveToken(this.userData.token);
          this.handleLoginSuccess();
        },
        (error) => {
          this.loginError = true;
          console.log(error);
        }
      );
    }
  }

  saveToken(data: any) {
    this.localStorage.set('token', JSON.stringify(data));
  }

  handleLoginSuccess() {
    const userType = this.authService.getUserType();
    console.log('User Type:', userType);
  
    const isTokenValid = this.authService.isTokenValid();
    console.log('Is Token Valid:', isTokenValid);
  
    if (isTokenValid && userType === '0') {
      this.router.navigate(['buap/autoServicios']);
    } else if (isTokenValid && userType === '1') {
      this.router.navigate(['buap/admin']);
    } else {
      console.log('Tipo de usuario no reconocido o token no válido');
    }
  }
  

}
