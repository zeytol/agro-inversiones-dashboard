import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
   
  //private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/customers'; // URL API en Azure
  private apiUrl = 'http://localhost:8091/api/customers';  // Cambiar a URL local de la API

  constructor(private http: HttpClient) { }

  // Método para configurar las opciones de la solicitud, incluyendo withCredentials
  private getOptions() {
    return {
      withCredentials: true // Incluye las credenciales (cookies, cabeceras de autenticación, etc.)
    };
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl, this.getOptions());
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`, this.getOptions());
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente, { ...this.getOptions(), responseType: 'text' as 'json' });
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, cliente, { ...this.getOptions(), responseType: 'text' as 'json' });
  }

  eliminarCliente(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { ...this.getOptions(), responseType: 'text' });
  }
  
}
