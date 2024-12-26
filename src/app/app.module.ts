import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';


import { FormsModule } from '@angular/forms'; // Add this import

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './pages/proveedores/proveedores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';

// Importaciones de Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';


import { SiderbangComponent } from './shared/siderbang/siderbang.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginComponent } from './core/login/login.component';

 // Asegúrate de importar FormsModule
import { AgregarClienteComponent } from './features/clientes/agregar-cliente/agregar-cliente.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { CreateRoleComponent } from './components/roles/create-role/create-role.component';
import { CreatePermissionComponent } from './components/roles/create-permission/create-permission.component';
import { SuccessModalComponent } from './components/roles/success-modal/success-modal.component';
import { AssignPermissionsComponent } from './components/roles/assign-permissions/assign-permissions.component';
import { RoleManagerComponent } from './components/roles/role-manager/role-manager.component';
import { RolesComponent } from './components/roles/roles/roles.component';
import { RoleDeleteComponent } from './components/roles/role-delete/role-delete.component'; // Asegúrate de importar FormsModule
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { UsersComponent } from './users/users.component';
<<<<<<< HEAD
import { UserEditComponent } from './user-edit/user-edit.component';
import { RoleModalComponent } from './role-modal/role-modal.component';
import { UserHeaderComponent } from './users/user-header/user-header.component';
import { UserSidebarComponent } from './users/user-sidebar/user-sidebar.component';
import { UserTableComponent } from './users/user-table/user-table.component';
import { UserModalsComponent } from './users/user-modals/user-modals.component';
=======
import { RoleModalComponent } from '../app/components/roles/role-modal/role-modal.component';
>>>>>>> 77a4919fc53af631a89c6103a9c4cc8c7cf0fb50

// Asegúrate de importar FormsModule




@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    DashboardComponent,
    DashboardComponent,
    SiderbangComponent,
    HeaderComponent,
    VentasComponent,
    AgregarClienteComponent,
    RolesListComponent,
    RoleDetailComponent,
    CreateRoleComponent,
    CreatePermissionComponent,
    SuccessModalComponent,
    AssignPermissionsComponent,
    RoleManagerComponent,
    RolesComponent,
    RoleDeleteComponent,
    LoginComponent, 

    UsersComponent,
<<<<<<< HEAD
    UserEditComponent,
    RoleModalComponent,
    UserHeaderComponent,
    UserSidebarComponent,
    UserTableComponent,
    UserModalsComponent,
    
=======
    RoleModalComponent,

>>>>>>> 77a4919fc53af631a89c6103a9c4cc8c7cf0fb50
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    FormsModule,
    HttpClientModule,
    NgApexchartsModule,
    FormsModule, 
    ReactiveFormsModule, 
    HttpClientModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}