import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { HomeComponent } from './components/home/home.component';
import { HomeContentComponent } from './components/home-content/home-content.component';
import { LoginComponent } from './components/login/login.component';
import { AutoServiciosComponent } from './components/auto-servicios/auto-servicios.component';
import { NavAccountComponent } from './components/nav-account/nav-account.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { HttpClientModule } from '@angular/common/http';
import { CalificacionPipe } from './pipes/calificacion.pipe';
import { ModalLoginComponent } from './components/modal-login/modal-login.component';
import { JwtModule, JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { MateriasCalificacionComponent } from './components/materias-calificacion/materias-calificacion.component';
import { FormsModule } from '@angular/forms';
import { MostrarAlumnosComponent } from './components/mostrar-alumnos/mostrar-alumnos.component';
import { ResumenAlumnoComponent } from './components/resumen-alumno/resumen-alumno.component';
import { AsignarMateriasComponent } from './components/asignar-materias/asignar-materias.component';
import { NavAdminComponent } from './components/nav-admin/nav-admin.component';
import { AgregarAlumnosComponent } from './components/agregar-alumnos/agregar-alumnos.component'; 

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    HomeContentComponent,
    LoginComponent,
    AutoServiciosComponent,
    NavAccountComponent,
    MapaComponent,
    CalificacionPipe,
    ModalLoginComponent,
    MateriasCalificacionComponent,
    MostrarAlumnosComponent,
    ResumenAlumnoComponent,
    AsignarMateriasComponent,
    NavAdminComponent,
    AgregarAlumnosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem('token'); // Obtiene el token del localStorage
        },
        allowedDomains: [], // Domains permitidos (ajusta esto según tus necesidades)
      },
    }),
  ],
  providers: [
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    JwtHelperService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
