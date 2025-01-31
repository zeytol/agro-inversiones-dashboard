import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isAuthenticated = false;

  login() {
    this.isAuthenticated = true; 
  }

  logout() {
    this.isAuthenticated = false;
    localStorage.removeItem('token'); 
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated || !!localStorage.getItem('token');
  }
}
