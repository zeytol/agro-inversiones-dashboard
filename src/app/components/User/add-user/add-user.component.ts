import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent {
  userForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router
  ) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      enabled: [true]
    });
  }

  cancelAdd() {
    // Aquí puedes cerrar el modal o limpiar el formulario
    this.userForm.reset({ enabled: true });
  }

  onSubmit() {
    if (this.userForm.invalid) {
      Swal.fire({
        icon: 'error',
        title: 'Formulario inválido',
        text: 'Por favor, completa todos los campos correctamente.'
      });
      return;
    }
  
    const formData = this.userForm.value;
  
    Swal.fire({
      title: 'Registrando usuario...',
      text: 'Por favor espera',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.userService.registrarUsuario(formData).subscribe({
      next: (response) => {
        Swal.close();
        Swal.fire({
          icon: 'success',
          title: 'Usuario registrado',
          text: 'El usuario ha sido registrado correctamente.',
          confirmButtonText: 'OK'
        }).then(() => {
          this.cancelAdd(); // Cierra el modal y limpia el formulario
          location.reload();
        });
      },
      error: (error) => {
        Swal.close();
        Swal.fire({
          icon: 'error',
          title: 'Error al registrar',
          text: 'Ocurrió un error al guardar el usuario. Intenta nuevamente.'
        });
        console.error('Error al registrar el usuario:', error.message);
      }
    });
  }
}
