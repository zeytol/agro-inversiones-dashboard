import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SiderbangComponent } from './shared/siderbang/siderbang.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { AgregarClienteComponent } from './features/clientes/agregar-cliente/agregar-cliente.component';
import { RolesListComponent } from './components/roles/roles-list/roles-list.component';
import { RoleDetailComponent } from './components/roles/role-detail/role-detail.component';
import { CreateRoleComponent } from './components/roles/create-role/create-role.component';
import { CreatePermissionComponent } from './components/roles/create-permission/create-permission.component';
import { SuccessModalComponent } from './components/roles/success-modal/success-modal.component';
import { AssignPermissionsComponent } from './components/roles/assign-permissions/assign-permissions.component';
import { RoleManagerComponent } from './components/roles/role-manager/role-manager.component';
import { RolesComponent } from './roles/roles.component';
import { RoleDeleteComponent } from './role-delete/role-delete.component'; // Asegúrate de importar FormsModule



@NgModule({
  declarations: [
    AppComponent,
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
    RoleDeleteComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    FormsModule, // Añade FormsModule aquí
    ReactiveFormsModule, // Importa ReactiveFormsModule aquí
    HttpClientModule, // Agrega este módulo

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
