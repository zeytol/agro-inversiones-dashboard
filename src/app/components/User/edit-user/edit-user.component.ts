import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent implements OnInit {
  editUserForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    public dialogRef: MatDialogRef<EditUserComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any // Recibe los datos del usuario a editar
  ) {
    // Crea el formulario reactivo con los datos del usuario
    this.editUserForm = this.fb.group({
      username: [this.data.username, [Validators.required]],
      email: [this.data.email, [Validators.required, Validators.email]],
      telefono: [this.data.telefono, [Validators.required]],
      rol: [this.data.rol, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  // Llama al servicio para editar el usuario
  editarUsuario(): void {
    if (this.editUserForm.valid) {
      const updatedUser = this.editUserForm.value;
      this.userService.editarUsuario(this.data.id, updatedUser).subscribe({
        next: () => {
          Swal.fire('Usuario Editado', 'El usuario ha sido actualizado correctamente', 'success');
          this.dialogRef.close('usuario_editado'); // Cierra el modal con un valor
        },
        error: (err) => {
          Swal.fire('Error', `No se pudo editar el usuario. ${err.message}`, 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
  }

  // Cierra el modal sin hacer nada
  cancelar(): void {
    this.dialogRef.close();
  }
}
