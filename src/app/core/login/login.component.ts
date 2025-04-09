import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginData = {
    username: '',
    password: '',
    rememberMe: false,
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const formData = new URLSearchParams();
    formData.append('username', this.loginData.username);
    formData.append('password', this.loginData.password);

    this.http.post(
        'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/login',
        formData.toString(),
        {
          headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' }),
          withCredentials: true,
          responseType: 'text',
        }
      )
      .subscribe({
        next: (response: string) => {
          if (response.includes('Login successful')) {
            localStorage.setItem('token', 'some-auth-token'); // Simulación de token
            this.successMessage = 'Inicio de sesión exitoso.';
            this.errorMessage = null;
            this.router.navigate(['/dashboard']);
          } else {
            this.handleError('Usuario no encontrado o error en los datos');
          }
        },
        error: (error) => {
          console.error('Error en la petición:', error);
          this.handleError('Error al intentar iniciar sesión. Por favor, intente de nuevo.');
        },
      });
  }


  private handleError(message: string) {
    this.errorMessage = message;
    this.successMessage = null;
  }
}
