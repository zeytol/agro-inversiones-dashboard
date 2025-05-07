import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { customers } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  getClientes() {
    throw new Error('Method not implemented.');
  }

  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/customers'; // URL API en Azure

  // private apiUrl = 'http://localhost:81/api/clientes';  // Cambiar a URL local de la API

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<customers[]> {
    return this.http.get<customers[]>(this.apiUrl, {withCredentials: true});
  }

  obtenerClientePorId(id: number): Observable<customers> {
    return this.http.get<customers>(`${this.apiUrl}/${id}`, {withCredentials: true});
  }

  guardarCliente(customers: customers): Observable<any> {
    return this.http.post<any>(this.apiUrl, customers, { responseType: 'text' as 'json', withCredentials: true});
  }

actualizarCliente(id: number, customers: customers): Observable<string> {
  return this.http.put<string>(`${this.apiUrl}/${id}`, customers, { responseType: 'text' as 'json', withCredentials: true });
}
  eliminarCliente(id: number): Observable<string> {
return this.http.delete<string>(`${this.apiUrl}/${id}`, { responseType: 'text' as 'json', withCredentials: true });
  }
  
}
