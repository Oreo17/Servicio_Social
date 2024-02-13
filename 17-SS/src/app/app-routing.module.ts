import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AutoServiciosComponent } from './components/auto-servicios/auto-servicios.component';
import { MapaComponent } from './components/mapa/mapa.component';
import { AuthGuard } from './auth.guard';
import { MateriasCalificacionComponent } from './components/materias-calificacion/materias-calificacion.component';
import { MostrarAlumnosComponent } from './components/mostrar-alumnos/mostrar-alumnos.component';
import { ResumenAlumnoComponent } from './components/resumen-alumno/resumen-alumno.component';
import { AsignarMateriasComponent } from './components/asignar-materias/asignar-materias.component';
import { AgregarAlumnosComponent } from './components/agregar-alumnos/agregar-alumnos.component';

const routes: Routes = [
  { path: '', redirectTo: '/buap', pathMatch: 'full' },
  { path: 'buap', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  // Admin { allowedUserType: '1' }
  { path: 'buap/admin', component: MostrarAlumnosComponent, pathMatch: 'full', canActivate: [AuthGuard],data:{ allowedUserType: '1' }  },
  { path: 'buap/admin/calificaciones/:id', component: MateriasCalificacionComponent, pathMatch: 'full', canActivate: [AuthGuard], data:{ allowedUserType: '1' } },
  { path: 'buap/admin/materias/:id', component: AsignarMateriasComponent, pathMatch: 'full', canActivate: [AuthGuard], data:{ allowedUserType: '1' } },
  { path: 'buap/admin/resumen/:id', component: ResumenAlumnoComponent, pathMatch: 'full', canActivate: [AuthGuard], data:{ allowedUserType: '1' } },
  { path: 'buap/admin/agregarAlumnos', component: AgregarAlumnosComponent, pathMatch: 'full', canActivate: [AuthGuard], data:{ allowedUserType: '1' } },
  // Alumnos
  { path: 'buap/autoServicios', component: AutoServiciosComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { allowedUserType: '0' } },
  { path: 'buap/autoServicios/proyeccion', component: MapaComponent, pathMatch: 'full', canActivate: [AuthGuard], data: { allowedUserType: '0' } },
  { path: '**', redirectTo: '/buap' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
