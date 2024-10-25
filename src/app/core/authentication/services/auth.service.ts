import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // Lógica de autenticación, puedes usar un API para validar usuarios
  isAuthenticated(): boolean {
    // Aquí puedes comprobar si el usuario está autenticado
    return !!localStorage.getItem('token'); // Ejemplo simple
  }

  login(email: string, password: string): void {
    // Lógica para iniciar sesión
    // Guarda el token en localStorage, etc.
  }

  logout(): void {
    // Lógica para cerrar sesión
    localStorage.removeItem('token');
  }
}
