import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { VentasComponent } from './components/ventas/ventas.component';

const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ventas', component: VentasComponent },  // Ruta para el componente de ventas
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirige a dashboard por defecto
  { path: '**', redirectTo: '/dashboard' } // Manejo de rutas no encontradas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
