import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { GestionProductosComponent } from './features/Productos/gestion-productos/gestion-productos.component';
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { CreateRoleComponent } from './components/roles/create-role/create-role.component';
import { CreatePermissionComponent } from './components/roles/create-permission/create-permission.component';
import { AssignPermissionsComponent } from './components/roles/assign-permissions/assign-permissions.component';
import { RoleManagerComponent } from './components/roles/role-manager/role-manager.component'; // Importa el componente
import { RolesComponent } from './components/roles/roles/roles.component';
import { ReportesComponent } from './features/reportes/reportes.component';



const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'ventas', component: VentasComponent }, 
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: GestionProductosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'roles/ajustes', component: AssignPermissionsComponent },
  { path: 'roles/detalle/:id', component: RoleDetailComponent }, // Ruta para ver detalles de un rol específico
  { path: 'roles/crear', component: CreateRoleComponent },       // Ruta para crear un nuevo rol
  { path: 'permisos/crear', component: CreatePermissionComponent }, // Ruta para crear un nuevo permiso
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirige a dashboard por defecto
  { path: 'role', component: RolesComponent },   // Ruta para gestionar roles y permisos

  { path: 'proveedores', component: ProveedoresComponent },
  // Ruta para el componente de ventas

  { path: '', redirectTo: '/dashboard', pathMatch: 'full' }, // Redirige a dashboard por defecto
  { path: '**', redirectTo: '/dashboard' } // Manejo de rutas no encontradas


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
