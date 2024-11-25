import { Component, ViewChild, TemplateRef, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-editar-cliente',
  templateUrl: './editar-cliente.component.html',
  styleUrls: ['./editar-cliente.component.css']
})
export class EditarClienteComponent {
  @ViewChild('successModal') successModal!: TemplateRef<any>;
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;

  // Variables de cliente
  nombre: string;
  tipoCliente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion: string;
  telefono: string;
  correo: string;
  estado: string;
  imagePreview: string | null = null; // Variable para la previsualización de la imagen
  dialogRef!: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private parentDialogRef: MatDialogRef<any>
  ) {
    // Inicializa los valores con los datos recibidos
    this.nombre = data.nombre;
    this.tipoCliente = data.tipoCliente;
    this.tipoDocumento = data.tipoDocumento;
    this.numeroDocumento = data.dniRuc;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.correo = data.correo;
    this.estado = data.estado;
    this.imagePreview = data.fotoUrl;
  }

  onCancel(): void {
    this.parentDialogRef.close();
  }

  onEdit(): void {
    if (
      this.nombre &&
      this.tipoCliente &&
      this.tipoDocumento &&
      this.numeroDocumento &&
      this.direccion &&
      this.telefono &&
      this.correo &&
      this.estado
    ) {
      // Todos los campos están llenos, muestra el modal de éxito
      this.dialogRef = this.dialog.open(this.successModal, {
        width: '400px',
        height: 'auto'
      });
      this.dialogRef.afterClosed().subscribe(() => {
        this.parentDialogRef.close({
          nombre: this.nombre,
          tipoCliente: this.tipoCliente,
          tipoDocumento: this.tipoDocumento,
          dniRuc: this.numeroDocumento,
          direccion: this.direccion,
          telefono: this.telefono,
          correo: this.correo,
          estado: this.estado,
          fotoUrl: this.imagePreview
        });
      });
    } else {
      // Faltan campos, muestra el modal de error
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

  retryEdit(): void {
    this.dialogRef.close();
  }

  onFileSelected(event: Event): void {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files && fileInput.files[0]) {
      const file = fileInput.files[0];
      this.imagePreview = URL.createObjectURL(file); // Genera la previsualización
    }
  }
}
