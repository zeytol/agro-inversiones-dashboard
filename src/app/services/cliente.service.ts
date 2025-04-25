import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customers } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/customers'; // URL API en Azure

  // private apiUrl = 'http://localhost:81/api/clientes';  // Cambiar a URL local de la API

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<customers[]> {
    return this.http.get<customers[]>(this.apiUrl, {withCredentials: true});
  }

  obtenerClientePorId(id: number): Observable<customers> {
    return this.http.get<customers>(`${this.apiUrl, {withCredentials: true}}/${id}`);
  }

  guardarCliente(customers: customers): Observable<any> {
    return this.http.post<any>(this.apiUrl, customers, { responseType: 'text' as 'json', withCredentials: true});
  }

  actualizarCliente(id: number, customers: customers): Observable<string> {
    return this.http.put<string>(`${this.apiUrl, {withCredentials: true}}/${id}`, customers, { responseType: 'text' as 'json' });
  }

  eliminarCliente(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl, {withCredentials: true}}/${id}`, { responseType: 'text' });
  }
  
}
