import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom, Observable } from 'rxjs';
export interface LoginCredentials {
  username: string;
  password: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  data?: any;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly API_URL = 'http://127.0.0.1:8091/login';

  constructor(private http: HttpClient) {}

  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    
    const body = new URLSearchParams();
    body.set('username', credentials.username);
    body.set('password', credentials.password);

    try {
      const response = await firstValueFrom(
        this.http.post<LoginResponse>(
          this.API_URL,
          body.toString(),
          {
            headers,
            withCredentials: true
          }
        )
      );

      return response;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(`Login failed: ${error.message}`);
      }
      throw new Error('An unexpected error occurred during login');
    }
  }
}