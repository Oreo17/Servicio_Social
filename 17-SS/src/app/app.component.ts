import { Component } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isHomePage: boolean = false;
  isAccountPage: boolean = false;
  isLoginPage: boolean = false;
  isAdminPage: boolean = false; 
  title = '17-SS';

  /*
  constructor(private router: Router, private activatedRoute: ActivatedRoute) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.isHomePage = this.router.url === '/buap';
        this.isAccountPage = this.router.url === '/autoServicios';
      }
    });
  }
  */

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.router.url;
        this.isHomePage = currentRoute === '/buap' || currentRoute === '/';
        this.isAccountPage = currentRoute.startsWith('/buap/autoServicios');
        this.isLoginPage = currentRoute === '/login'; 
        this.isAdminPage = currentRoute.startsWith('/buap/admin');
      }
    });
  }

  private isRouteActive(route: string): boolean {
    return this.router.url === route || this.router.url.startsWith(route + '/');
  }
}
