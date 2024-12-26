import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse, HttpParams } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  togglePasswordVisibility(inputId: string, iconId: string): void {
    const input = document.getElementById(inputId) as HTMLInputElement;
    const icon = document.getElementById(iconId) as HTMLElement;

    if (input && icon) {
      if (input.type === 'password') {
        input.type = 'text';
        icon.classList.remove('fa-eye-slash');
        icon.classList.add('fa-eye');
      } else {
        input.type = 'password';
        icon.classList.remove('fa-eye');
        icon.classList.add('fa-eye-slash');
      }
    }
  } 
passwordVisible: any;
onGoogleSignIn() {
throw new Error('Method not implemented.');
}
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}
  onSubmit(): void {
    const params = new HttpParams()
      .set('username', this.username)
      .set('password', this.password);
    console.log('Login params:', params.toString());

    this.http
      .post(
        'http://localhost:8091/login',
        null,
        {
          params: params,
          observe: 'response',
          responseType: 'text',
          withCredentials: true
        }
      )
      .subscribe({
        next: (response: HttpResponse<string>) => {
          if (response.body && response.body.includes('<!DOCTYPE html>')) {
            this.errorMessage = 'Credenciales incorrectas. Inténtalo de nuevo.';
          } else {
            this.router.navigate(['/dashboard']);
          }
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error en la autenticación:', error.message);
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
        },
      });
  }
}