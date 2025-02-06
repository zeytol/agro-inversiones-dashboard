import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  eliminarUsuario(id: number) {
    throw new Error('Method not implemented.');
  }
  private readonly apiUrl = 'https://agroinversiones-api-c-cmgxhcgsfrfzbecw.brazilsouth-01.azurewebsites.net/api/users';
  private readonly httpOptions = { withCredentials: true };

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUrl, this.httpOptions).pipe(
    );
  }
  

  addUser(user: any): Observable<any> {
    const registerUrl = 'https://agro-inversiones-oauth-cca2drebeabyhufq.canadacentral-01.azurewebsites.net/api/users/register';
    return this.http.post<any>(registerUrl, user, this.httpOptions)
      .pipe(catchError(this.handleError('Error añadiendo usuario')));
  }
  

  updateUser(user: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${user.id}`, user, this.httpOptions)
      .pipe(catchError(this.handleError('Error actualizando usuario')));
  }

  deleteUser(userId: number): Observable<any> {
    const deleteUrl = `https://agroinversiones-api-c-cmgxhcgsfrfzbecw.brazilsouth-01.azurewebsites.net/api/users/delete/${userId}`;
    return this.http.delete<any>(deleteUrl, this.httpOptions).pipe(
      catchError(this.handleError('Error eliminando usuario'))
    );
  }
  

  private handleError(errorMessage: string) {
    return (error: any) => {
      console.error(errorMessage, error);
      return throwError(() => new Error(`${errorMessage}. Inténtelo de nuevo más tarde.`));
    };
  }
}
