import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Cliente } from '../models/client.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private apiUrl = 'https://apicustomersagro-djegh3dmfea5hmbu.brazilsouth-01.azurewebsites.net/api/customers'; // URL API en Azure
  // private apiUrl = 'http://localhost:81/api/customers';  // Cambiar a URL local de la API

  constructor(private http: HttpClient) { }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(this.apiUrl);
  }

  obtenerClientePorId(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.apiUrl}/${id}`);
  }

  guardarCliente(cliente: Cliente): Observable<any> {
    return this.http.post<any>(this.apiUrl, cliente, { responseType: 'text' as 'json' });
  }

  actualizarCliente(id: number, cliente: Cliente): Observable<string> {
    return this.http.put<string>(`${this.apiUrl}/${id}`, cliente, { responseType: 'text' as 'json' });
  }

  eliminarCliente(id: number): Observable<string> {
    return this.http.delete(`${this.apiUrl}/${id}`, { responseType: 'text' });
  }
  
}
