import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true;
    localStorage.removeItem('carrito'); 
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token'); 
    localStorage.removeItem('carrito');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }
}
