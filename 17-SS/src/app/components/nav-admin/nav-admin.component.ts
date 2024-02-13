import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/local-storage.service';

@Component({
  selector: 'app-nav-admin',
  templateUrl: './nav-admin.component.html',
  styleUrls: ['./nav-admin.component.css']
})
export class NavAdminComponent {
  constructor(private localStorage:LocalStorageService, private router:Router) {}
  logout() {
    this.localStorage.clearToken(); // Elimina el token del localStorage
    this.router.navigate(['buap']);
  }
}
