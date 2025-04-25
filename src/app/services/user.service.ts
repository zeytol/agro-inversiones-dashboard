import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users';

  constructor(private http: HttpClient) { }

  // Listar todos los usuarios
  getUsuarios(): Observable<any> {
    return this.http.get(this.baseUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status !== 200) {
          console.error('Error al obtener usuarios:', error);
          return throwError(() => new Error('No se pudieron obtener los usuarios.'));
        }
        return throwError(() => error);
      })
    );
  }
}
