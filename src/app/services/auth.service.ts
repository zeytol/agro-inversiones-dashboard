import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true; // Puedes guardar un token en localStorage aquí
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token'); // Limpia el token si usas JWT
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }
}
