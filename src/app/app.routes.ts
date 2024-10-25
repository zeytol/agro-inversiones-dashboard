import { Routes } from '@angular/router';
import { AuthenticationComponent } from './core/authentication/components/authentication.component';
import { RegisterComponent } from './core/register/register.component';

export const routes: Routes = [
  { path: 'login', component: AuthenticationComponent },
  { path: 'register', component: RegisterComponent },
  // Puedes agregar más rutas aquí si es necesario
];
