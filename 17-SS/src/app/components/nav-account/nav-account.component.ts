import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-nav-account',
  templateUrl: './nav-account.component.html',
  styleUrls: ['./nav-account.component.css']
})
export class NavAccountComponent {
  constructor(private localStorage:LocalStorageService, private router:Router) {}
  logout() {
    this.localStorage.clearToken(); // Elimina el token del localStorage
    this.router.navigate(['buap']);
  }
}
