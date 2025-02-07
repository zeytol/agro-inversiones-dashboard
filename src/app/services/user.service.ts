import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly apiUrl = 'https://agro-inversiones-oauth-cca2drebeabyhufq.canadacentral-01.azurewebsites.net/api/users';
  private readonly httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions)
      .pipe(catchError(this.handleError('Error obteniendo usuarios')));
  }

  addUser(user: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, user, this.httpOptions)
      .pipe(catchError(this.handleError('Error añadiendo usuario')));
  }

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}users/edit${user.id}`, user, this.httpOptions)
      .pipe(catchError(this.handleError('Error actualizando usuario')));
  }

  deleteUser(userId: number): Observable<any> {
    if (!userId) {
        console.error('Error: Intentando eliminar usuario sin ID.');
        return throwError(() => new Error('ID de usuario no válido.'));
    }

    return this.http.delete(`${this.apiUrl}/users/delete/${userId}`);
}

  private handleError(errorMessage: string) {
    return (error: any) => {
      console.error(errorMessage, error);
      return throwError(() => new Error(`${errorMessage}. Inténtelo de nuevo más tarde.`));
    };
  }
}