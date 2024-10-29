// src/app/app.module.ts
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
<<<<<<< HEAD
import { LoginComponent } from './core/login/login.component';
import { RegisterComponent } from './core/register/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent],
=======
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { SiderbangComponent } from './shared/siderbang/siderbang.component';
import { HeaderComponent } from './shared/header/header.component';
import { NgApexchartsModule } from 'ng-apexcharts';



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SiderbangComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgApexchartsModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
>>>>>>> 3c470956316e43b9fd154583ddf6ef051664a727
})
export class AppModule {}
