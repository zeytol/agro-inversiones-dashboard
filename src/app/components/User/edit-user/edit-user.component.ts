import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import Swal from 'sweetalert2';

import { UserService } from '../../../services/user.service';

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
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.editUserForm = this.fb.group({
      username: [data.username, [Validators.required]],
      email: [data.email, [Validators.required, Validators.email]],
      telefono: [data.telefono, [Validators.required]],
      rol: [data.rol, [Validators.required]],
      enabled: [data.enabled, [Validators.required]]
    });
  }

  ngOnInit(): void {}

  editarUsuario(): void {
    if (this.editUserForm.valid) {
      const updatedUser = this.editUserForm.value;
      this.userService.editarUsuario(this.data.id, updatedUser).subscribe({
        next: () => {
          Swal.fire('Usuario Editado', 'El usuario ha sido actualizado correctamente', 'success');
          this.dialogRef.close('usuario_editado');
        },
        error: (err) => {
          Swal.fire('Error', `No se pudo editar el usuario. ${err.message}`, 'error');
        }
      });
    } else {
      Swal.fire('Error', 'Formulario inválido', 'error');
    }
  }

  cancelar(): void {
    this.dialogRef.close();
  }
}