import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  passwordVisible: boolean = false;

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  togglePasswordVisibility() {
    this.passwordVisible = !this.passwordVisible;
  }

  onLogin() {
    if (this.loginForm.valid) {
      // Lógica de autenticación aquí
      console.log('Formulario de inicio de sesión:', this.loginForm.value);
      this.router.navigate(['/dashboard']);
    } else {
      console.error('Formulario inválido');
    }
  }

  onGoogleSignIn() {
    console.log('Iniciar sesión con Google');
  }
}
