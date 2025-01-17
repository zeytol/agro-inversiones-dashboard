import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClienteService {
  private apiUrl = 'https://agro-apiclientes-fzczhygvd2f4e4ag.brazilsouth-01.azurewebsites.net/api/clientes';

  constructor(private http: HttpClient) {}

  // Obtener cliente por DNI
  
  getTodosClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  
  
  

  // Agregar un nuevo cliente
  agregarCliente(cliente: any): Observable<any> {
    return this.http.post(this.apiUrl, cliente);
  }
}
