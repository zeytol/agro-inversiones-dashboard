import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-detalle-cliente',
  templateUrl: './detalle-cliente.component.html',
  styleUrls: ['./detalle-cliente.component.css']
})
export class DetalleClienteComponent {
  nombre: string;
  tipoCliente: string;
  tipoDocumento: string;
  numeroDocumento: string;
  direccion: string;
  telefono: string;
  correo: string;
  imagePreview: string | null;  // Cambiado de photoUrl a imagePreview
  lastInvoice: { number: string, date: string, amount: number, status: string };
  attachedDocuments: Array<{ name: string, url: string, icon: string }>;

  constructor(
    public dialogRef: MatDialogRef<DetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    console.log('fotoUrl:', data.fotoUrl);  // Verifica si el dato es correcto
    this.nombre = data.nombre;
    this.tipoCliente = data.tipoCliente;
    this.tipoDocumento = data.tipoDocumento;
    this.numeroDocumento = data.numeroDocumento;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.correo = data.correo;
    this.imagePreview = data.fotoUrl;  // Aquí asignamos la URL de la imagen a imagePreview
    console.log('imagePreview:', this.imagePreview);  // Verifica el valor de imagePreview
    this.lastInvoice = data.lastInvoice;
    this.attachedDocuments = data.attachedDocuments;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
