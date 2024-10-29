import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'], // Nota: debe ser "styleUrls" en plural
})
export class RegisterComponent {
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
}
