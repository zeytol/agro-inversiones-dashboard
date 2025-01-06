import { Component } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(private http: HttpClient, private router: Router) {}

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

  onSubmit(): void {
    const userData = {
      email: this.email,
      username: this.username,
      password: this.password,
    };
  
    this.http
      .post('http://localhost:8091/register', userData, {
        observe: 'response',
        responseType: 'text',  // Cambiado a 'text' para probar la respuesta como texto
      })
      .subscribe({
        next: (response: HttpResponse<any>) => {
          console.log('Usuario registrado:', response.body);
          this.router.navigate(['/login']);
        },
        error: (error: HttpErrorResponse) => {
          console.error('Error en el registro:', error.message);
          this.errorMessage = 'Error del servidor. Inténtalo más tarde.';
        },
      });
  }
  
}
