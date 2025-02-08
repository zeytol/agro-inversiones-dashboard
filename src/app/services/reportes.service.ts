import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReportesService {
  private baseUrl = 'https://agro-inversiones-reportes-hqhqeke3aee4e3dv.canadacentral-01.azurewebsites.net/api/reports';

  constructor(private http: HttpClient) {}

  getReporteVentas(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/ventas/${date}`);
  }

  getReporteProveedores(filter: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/proveedores/${filter}`);
  }

  getReporteInventario(): Observable<any> {
    return this.http.get(`${this.baseUrl}/inventario`);
  }

  getReporteGraficos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/graficos`);
  }

  getReporteGraficosDashboard(): Observable<any> {
    return this.http.get(`${this.baseUrl}/graficosDashboard`);
  }

  getReporteFinanzas(date: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/finanzas/${date}`);
  }

  getReporteClientes(filter: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/clientes/${filter}`);
  }

}
