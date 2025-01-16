import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  constructor(private http: HttpClient) {}

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

  onSubmit(form: any): void {
    if (form.valid) {
      const user = form.value;
      const headers = { 'Content-Type': 'application/json' };

      this.http.post('https://agroinversiones-api-c-cmgxhcgsfrfzbecw.brazilsouth-01.azurewebsites.net/api/users/register', user, { headers, responseType: 'text' })
        .pipe(
          catchError((error) => {
            console.error('Error registering user:', error);
            return of(null);
          })
        )
        .subscribe(response => {
          if (response) {
            try {
              const jsonResponse = JSON.parse(response);
              console.log('User registered successfully:', jsonResponse);
            } catch (e) {
              console.error('Error parsing JSON response:', e, 'Response:', response);
            }
          } else {
            console.warn('No response or non-JSON response received');
          }
        });
        
    }
  }
}
