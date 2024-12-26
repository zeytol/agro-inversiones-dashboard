import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loginUrl = 'http://localhost:8091/login';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    // Crear los datos del cuerpo de la solicitud
    const body = JSON.stringify({ username, password });

    // Realizar la solicitud HTTP POST
    return this.http.post<any>(this.loginUrl, body, {
      headers,
      withCredentials: true, // Esto reemplaza 'credentials: include'
    });
  }
}
