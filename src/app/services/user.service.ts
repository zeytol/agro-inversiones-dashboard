import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private baseUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/all';
  private base1Url = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/roles';
  private base1Ur2 = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/register';
  private deleteUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/delete/';
  private editUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/edit/';
  private detailUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/details/';

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

  // Listar todos los roles
  getRoles(): Observable<any> {
    return this.http.get(this.base1Url, { withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status !== 200) {
          console.error('Error al obtener roles:', error);
          return throwError(() => new Error('No se pudieron obtener los roles.'));
        }
        return throwError(() => error);
      })
    );
  }

  // Registrar un nuevo usuario
  registrarUsuario(usuarioData: any): Observable<any> {
    return this.http.post(this.base1Ur2, usuarioData, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al registrar usuario:', error);
        return throwError(() => new Error('No se pudo registrar el usuario.'));
      })
    );
  }

  // Eliminar un usuario por su ID
  eliminarUsuario(id: string): Observable<any> {
    return this.http.delete(`${this.deleteUrl}${id}`, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al eliminar usuario:', error);
        return throwError(() => new Error('No se pudo eliminar el usuario.'));
      }),
      tap((response) => console.log('Respuesta de eliminar usuario:', response))
    );
  }

  // Editar un usuario por su ID
  editarUsuario(id: number, usuarioData: any): Observable<any> {
    return this.http.put(`${this.editUrl}${id}`, usuarioData, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al editar usuario:', error);
        return throwError(() => new Error('No se pudo editar el usuario.'));
      }),
      tap((response) => console.log('Respuesta de editar usuario:', response))
    );
  }

  // Ver detalles de un usuario por su ID
  getUsuarioDetalle(id: string | number): Observable<any> {
    return this.http.get(`${this.detailUrl}${id}`, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al obtener detalles del usuario:', error);
        return throwError(() => new Error('No se pudo obtener el detalle del usuario.'));
      }),
      tap((response) => console.log('Detalle del usuario obtenido:', response))
    );
  }

  // Asignar un rol a un usuario
  asignarRolAUsuario(userId: number, rolId: number): Observable<any> {
    const url = `https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/users/assign?userId=${userId}&rolId=${rolId}`;
    return this.http.post(url, null, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al asignar rol al usuario:', error);
        return throwError(() => new Error('No se pudo asignar el rol al usuario.'));
      }),
      tap((response) => console.log('Respuesta de asignación de rol:', response))
    );
  }
}
