import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  user = {
    username: '',
    email: '',
    password: '',
  };
  confirmPassword = '';
  errorMessage: string | null = null;
  successMessage: string | null = null;
  apiEndpoint = environment.apiEndpoint;

  constructor(private http: HttpClient) {}
  togglePasswordVisibility(fieldId: string, iconId: string) {
    const field = document.getElementById(fieldId) as HTMLInputElement;
    const icon = document.getElementById(iconId) as HTMLElement;

    if (field.type === 'password') {
      field.type = 'text';
      icon.classList.remove('fa-eye-slash');
      icon.classList.add('fa-eye');
    } else {
      field.type = 'password';
      icon.classList.remove('fa-eye');
      icon.classList.add('fa-eye-slash');
    }
  }
  get passwordsDontMatch(): boolean {
    return this.user.password !== this.confirmPassword;
  }

  onRegister() {
    this.errorMessage = '';
    this.successMessage = '';
  
    if (this.passwordsDontMatch) {
      this.errorMessage = 'Las contraseñas no coinciden.';
      return;
    }
  
    this.http.post(this.apiEndpoint, this.user, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      responseType: 'text',
      withCredentials: true,

    })   .subscribe({
        next: (response: string) => {
          if (response.includes('Usuario registrado exitosamente')) {
            this.successMessage = 'Inicio de sesión exitoso.';
            this.errorMessage = null;

       
          } else {
            this.handleError('Usuario no encontrado o error en los datos');
          }
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          this.handleError('Error al intentar iniciar sesaión. Por favor, intente de nuevo.');
        },
      });
  
  }
  private handleError(message: string) {
    this.errorMessage = message;
    this.successMessage = null;
  }
  
}
