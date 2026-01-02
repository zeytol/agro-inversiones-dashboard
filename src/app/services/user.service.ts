import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://agro-inversiones-oauth-cca2drebeabyhufq.canadacentral-01.azurewebsites.net/api/users';

  constructor(private http: HttpClient) {}

  // Listar usu
  // 
  // arios
  getUsers(): Observable<any> {
    return this.http.get<any>(this.apiUrl, { withCredentials: true });
  }

  // Obtener detalles de un usuario
  getUserById(id: number): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/details/${id}`, { withCredentials: true });
  }

  // Agregar usuario
  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, { withCredentials: true });
  }

  // Editar usuario
  editUser(id: number, user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/edit/${id}`, user, { withCredentials: true });
  }

  // Eliminar usuario
  deleteUser(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/delete/${id}`, { withCredentials: true });
  }
  
  
}
