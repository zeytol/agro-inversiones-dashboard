import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class RolesService {
  private baseUrl = 'https://agro-inversiones-oauth-cca2drebeabyhufq.canadacentral-01.azurewebsites.net/api/roles';

  constructor(private http: HttpClient) {}

  // Listar todos los roles
  getRoles(): Observable<any> {
    return this.http.get(this.baseUrl, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al obtener roles:', error);
        return throwError(() => new Error('No se pudieron obtener los roles.'));
      })
    );
  }

  // Registrar un nuevo rol (con autenticación)
  createRole(roleData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/nuevo`, roleData, { withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status !== 201) { // Solo capturar errores reales
          console.error('Error al crear rol:', error);
          return throwError(() => new Error('No se pudo crear el rol.'));
        }
        return throwError(() => error); // Permitir respuestas 201 pasar
      })
    );
  }

  // Obtener detalles de un rol
  getRoleById(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/details/${id}`, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error(`Error al obtener el rol con ID ${id}:`, error);
        return throwError(() => new Error('No se pudo obtener el rol.'));
      })
    );
  }

  // Editar un rol
  updateRole(roleId: number, roleData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/editar/${roleId}`, roleData, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al editar rol:', error);
        return throwError(() => new Error('No se pudo editar el rol.'));
      })
    );
  }

  // Eliminar un rol por ID
  deleteRole(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/eliminar/${id}`, { withCredentials: true }).pipe(
      catchError((error) => {
        if (error.status === 200 || error.status === 204) {
          // Si el servidor responde con 200 o 204, no es un error
          return of(null); // Retornar un observable vacío indicando éxito
        }
        console.error(`Error al eliminar el rol con ID ${id}:`, error);
        return throwError(() => new Error('No se pudo eliminar el rol.'));
      })
    );
  }

  // Listar todos los permisos
  getPermissions(): Observable<any> {
    return this.http.get(`${this.baseUrl}/permissions`, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error al obtener permisos:', error);
        return throwError(() => new Error('No se pudieron obtener los permisos.'));
      })
    );
  }

  // Registrar un nuevo permiso
  createPermission(permissionData: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/permissions/nuevo`, permissionData);
  }

  // Editar un permiso
  updatePermission(id: number, permissionData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/permissions/editar/${id}`, permissionData);
  }

  // Eliminar un permiso
  deletePermission(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/permissions/eliminar/${id}`);
  }

  // Asignar permisos a un rol
  assignPermissionsToRole(rolId: number, permissions: number[]): Observable<any> {
    return this.http.post(`${this.baseUrl}/${rolId}/permissions`, { permissions });
  }
}