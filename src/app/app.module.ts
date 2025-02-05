import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Unificar FormsModule y ReactiveFormsModule aquí
import { MatIconModule } from '@angular/material/icon';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProveedoresComponent } from './features/proveedores/proveedores.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { InventarioComponent } from './features/inventario/inventario.component';

// Importaciones de Font Awesome
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { SiderbangComponent } from './shared/siderbang/siderbang.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { LoginComponent } from './core/login/login.component';
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
import { RolesListComponent } from './core/roles/roles-list/roles-list.component';
import { VentasComponent } from './features/ventas/ventas/ventas.component';
import { UsersComponent } from '../app/components/User/users/users.component';

import { EditUserComponent } from '../app/components/User/edit-user/edit-user.component';
import { AddUserComponent } from '../app/components/User/add-user/add-user.component';
import { DeleteUserComponent } from '../app/components/User/delete-user/delete-user.component';
import { RegisterComponent } from './core/register/register.component';
import { ReportesComponent } from './features/reportes/reportes.component';
import { AgregarReporteComponent } from './features/reportes/agregar-reporte/agregar-reporte.component';
import { EditarReporteComponent } from './features/reportes/editar-reporte/editar-reporte.component';
import { TipoReporteComponent } from './features/reportes/tipo-reporte/tipo-reporte.component';
import { ExportarReporteComponent } from './features/reportes/exportar-reporte/exportar-reporte.component';
import { AgregarCategoriaComponent } from './features/Productos/modalCategoria/agregar-categoria/agregar-categoria.component';
import { EliminarCategoriaComponent } from './features/Productos/modalCategoria/eliminar-categoria/eliminar-categoria.component';
import { EditarCategoriaComponent } from './features/Productos/modalCategoria/editar-categoria/editar-categoria.component';
import { PermisosComponent } from './core/permisos/permisos.component';


@NgModule({
  declarations: [
    AppComponent,
    ProveedoresComponent,
    DashboardComponent,
    SiderbangComponent,
    HeaderComponent,
    VentasComponent,
    AgregarClienteComponent,
    InventarioComponent,
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
    LoginComponent,
    DocumentosComponent,
    EditarDocComponent,
    AgregarDocComponent,
    EnviarDocComponent,
    EliminarDocComponent,
    UsersComponent,
    EditUserComponent,
    AddUserComponent,
    DeleteUserComponent,
    RegisterComponent,
    ReportesComponent,
    AgregarReporteComponent,
    EditarReporteComponent,
    TipoReporteComponent,
    ExportarReporteComponent,
    AgregarCategoriaComponent,
    EliminarCategoriaComponent,
    EditarCategoriaComponent,
    PermisosComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    NgApexchartsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule, 
    NgxPaginationModule,
    ReactiveFormsModule,
    NgApexchartsModule,
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync(),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
  }
}