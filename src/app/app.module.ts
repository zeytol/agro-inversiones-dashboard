import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';
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
import { FormsModule } from '@angular/forms';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgregarUsuarioComponent } from './modals/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from './modals/editar-cliente/editar-cliente.component'; 
import { GestionProductosComponent } from './features/Productos/gestion-productos/gestion-productos.component';
import { AgregarModalComponent } from './features/Productos/agregar-modal/agregar-modal.component';
import { EditarModalComponent } from './features/Productos/editar-modal/editar-modal.component';
import { FiltrarModalComponent } from './features/Productos/filtrar-modal/filtrar-modal.component';
import { CarritoModalComponent } from './features/Productos/carrito-modal/carrito-modal.component';
import { DetallesModalComponent } from './features/Productos/detalles-modal/detalles-modal.component';
import { DocumentosComponent } from './features/documentos/documentos/documentos.component';
import { EditarDocComponent } from './features/documentos/modals/editar-doc/editar-doc.component';
import { AgregarDocComponent } from './features/documentos/modals/agregar-doc/agregar-doc.component';
import { EnviarDocComponent } from './features/documentos/modals/enviar-doc/enviar-doc.component';
import { EliminarDocComponent } from './features/documentos/modals/eliminar-doc/eliminar-doc.component';


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
    ClientesComponent,
    ConfirmDeleteModalComponent,
    AgregarUsuarioComponent,
    EditarClienteComponent,
    GestionProductosComponent,
    AgregarModalComponent,
    EditarModalComponent,
    FiltrarModalComponent,
    CarritoModalComponent,
    DetallesModalComponent,
    RolesListComponent,
    RoleDetailComponent,
    CreateRoleComponent,
    CreatePermissionComponent,
    SuccessModalComponent,
    AssignPermissionsComponent,
    RoleManagerComponent,
    RolesComponent,
    RoleDeleteComponent,
    DocumentosComponent,
    EditarDocComponent,
    AgregarDocComponent,
    EnviarDocComponent ,
    EliminarDocComponent,
    

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgApexchartsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule, 
    ReactiveFormsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}
