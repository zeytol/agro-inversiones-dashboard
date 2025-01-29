import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';  // Añade esta importación
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from '../app/core/login/login.component'
import { RegisterComponent } from './core/register/register.component';

import { InventarioComponent } from './features/inventario/inventario.component';

import { ClientesComponent } from './components/clientes/clientes.component';
import { GestionProductosComponent } from './features/Productos/gestion-productos/gestion-productos.component';
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { CreateRoleComponent } from './components/roles/create-role/create-role.component';
import { CreatePermissionComponent } from './components/roles/create-permission/create-permission.component';
import { AssignPermissionsComponent } from './components/roles/assign-permissions/assign-permissions.component';
import { RoleManagerComponent } from './components/roles/role-manager/role-manager.component';
import { RolesComponent } from './components/roles/roles/roles.component';
import { UsersComponent } from '../app/components/User/users/users.component';
import { RoleModalComponent } from './components/roles/role-modal/role-modal.component';
import { DocumentosComponent } from './features/documentos/documentos/documentos.component';
import { ReportesComponent } from './features/reportes/reportes.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'user', component: UsersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },

  { path: 'ventas', component: VentasComponent },
  { path: 'roles', component: RoleModalComponent },
  { path: 'ventas', component: VentasComponent }, 
  { path: 'clientes', component: ClientesComponent },
  { path: 'productos', component: GestionProductosComponent },
  { path: 'documento', component: DocumentosComponent },
  { path: 'reportes', component: ReportesComponent },
  { path: 'roles', component: RolesListComponent },
  { path: 'roles/ajustes', component: AssignPermissionsComponent },
  { path: 'roles/detalle/:id', component: RoleDetailComponent },
  { path: 'roles/crear', component: CreateRoleComponent },
  { path: 'permisos/crear', component: CreatePermissionComponent },
  { path: 'role', component: RolesComponent },
  { path: 'proveedores', component: ProveedoresComponent },
  { path: 'inventario', component: InventarioComponent},
  { path: 'ventas', component: VentasComponent },  
  { path: '', redirectTo: '/login', pathMatch: 'full' }, 
  { path: '**', redirectTo: '/dashboard' } ,


];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],  
  exports: [RouterModule],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy } 
  ]
})
export class AppRoutingModule { }