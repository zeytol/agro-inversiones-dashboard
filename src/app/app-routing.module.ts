import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';  // Añade esta importación
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { GestionProductosComponent } from './features/Productos/gestion-productos/gestion-productos.component';
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { UsersComponent} from './components/User/users/users.component';
import { PermisosComponent } from './core/permisos/permisos.component';
import { RolesListComponent } from './core/roles/roles-list/roles-list.component';
import { ReportesComponent } from './features/reportes/reportes.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ventas', component: VentasComponent }, 
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: GestionProductosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'usuarios', component: UsersComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'permisos', component: PermisosComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: '**', redirectTo: '/dashboard' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } 
  ]
})
export class AppRoutingModule { }