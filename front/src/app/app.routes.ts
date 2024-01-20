import { Routes } from '@angular/router';
import { DashboardComponent } from './Views/dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';

import { PageNotFoundComponentComponent } from './page-not-found-component/page-not-found-component.component';


import { EscuelasComponent } from './Views/escuelas/escuelas.component';
import { ProfesoresComponent } from './Views/profesores/profesores.component';
import { NuevoProfesorComponent } from './Views/profesores/nuevo-profesor/nuevo-profesor.component';
import { NuevaEscuelaComponent } from './Views/escuelas/nueva-escuela/nueva-escuela.component';


export const routes: Routes = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
 
   
  {
    path: 'escuelas',
    component: EscuelasComponent,
  },
  {
    path: 'profesores',
    component: ProfesoresComponent,
  },
  {
    path: 'nueva-escuela',
    component: NuevaEscuelaComponent,
  },
  {
    path: 'nuevo-profesor',
    component: NuevoProfesorComponent,
  },
 
  
  

  {
    path: 'editar-escuela/:id',
    component: NuevaEscuelaComponent,
  },
  {
    path: 'editar-profesor/:id',
    component: NuevoProfesorComponent,
  },
  
  { path: 'login', component: LoginComponent },
  { path: '**', component: PageNotFoundComponentComponent },
];
