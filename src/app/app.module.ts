import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module'; // Verifica que esta ruta sea correcta
import { AppComponent } from './app.component';
import { HeaderComponent } from './shared/layouts/header/header.component'; // Ajusta esta ruta según la ubicación de tu componente

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    // otros
  ],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
