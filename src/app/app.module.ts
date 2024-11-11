import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { MatIconModule } from '@angular/material/icon';
import { HttpClientModule } from '@angular/common/http';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SiderbangComponent } from './shared/siderbang/siderbang.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';
import { VentasComponent } from './components/ventas/ventas.component';
import { FormsModule } from '@angular/forms';
import { AgregarClienteComponent } from './agregar-cliente/agregar-cliente.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { ConfirmDeleteModalComponent } from './modals/confirm-delete-modal/confirm-delete-modal.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { AgregarUsuarioComponent } from './modals/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from './modals/editar-cliente/editar-cliente.component'; 
import { GestionProductosComponent } from './components/gestion-productos/gestion-productos.component';
import { AgregarModalComponent } from './modals/gestion-productos/agregar-modal/agregar-modal.component';

@NgModule({
  declarations: [
    AppComponent,
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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule,
    FormsModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    HttpClientModule
  ],
  providers: [
    provideClientHydration(),
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
