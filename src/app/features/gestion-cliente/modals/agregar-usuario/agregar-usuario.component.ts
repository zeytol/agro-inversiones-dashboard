import { Component, ViewChild, TemplateRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { NgForm } from '@angular/forms'; // Importa NgForm para el formulario

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  @ViewChild('successModal') successModal!: TemplateRef<any>;
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;
  @ViewChild('userForm') userForm!: NgForm; // Referencia al formulario

  nombre: string = '';
  tipoCliente: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  imagePreview: string | null = null; // Variable para la previsualización de la imagen
  dialogRef!: MatDialogRef<any>;

  constructor(public dialog: MatDialog, @Inject(MatDialogRef) private parentDialogRef: MatDialogRef<any>) {}

  onCancel(): void {
    this.parentDialogRef.close(); // Cierra el modal principal al cancelar
  }

  onAdd(): void {
    // Verificar si el formulario es válido
    if (this.userForm.valid) {
      // Todos los campos están completos y válidos, mostrar modal de éxito
      this.dialogRef = this.dialog.open(this.successModal, {
        width: '400px',
        height: 'auto'
      });

      const nuevoCliente = {
        nombre: this.nombre,
        tipoCliente: this.tipoCliente,
        tipoDocumento: this.tipoDocumento,
        dniRuc: this.numeroDocumento,
        direccion: this.direccion,
        telefono: this.telefono,
        correo: this.correo,
        fotoUrl: this.imagePreview || ''
      };

      this.dialogRef.afterClosed().subscribe(() => {
        this.parentDialogRef.close(nuevoCliente); // Cierra el modal principal después de mostrar el mensaje de éxito y pasa los datos
      });
    } else {
      // Faltan campos o son inválidos, mostrar modal de error
      this.dialogRef = this.dialog.open(this.errorModal, {
        width: '400px',
        height: 'auto'
      });
    }
  }

  closeSuccessModal(): void {
    this.dialogRef.close();
  }

  closeErrorModal(): void {
    this.dialogRef.close();
  }

  retryAdd(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.imagePreview = URL.createObjectURL(file); // Genera la URL para previsualización
    }
  }
}
