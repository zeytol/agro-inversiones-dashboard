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
  estado: string;
  photoUrl: string | null;
  lastInvoice: { number: string, date: string, amount: number, status: string };
  attachedDocuments: Array<{ name: string, url: string, icon: string }>;

  constructor(
    public dialogRef: MatDialogRef<DetalleClienteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.nombre = data.nombre;
    this.tipoCliente = data.tipoCliente;
    this.tipoDocumento = data.tipoDocumento;
    this.numeroDocumento = data.numeroDocumento;
    this.direccion = data.direccion;
    this.telefono = data.telefono;
    this.correo = data.correo;
    this.estado = data.estado;
    this.photoUrl = data.photoUrl;
    this.lastInvoice = data.lastInvoice;
    this.attachedDocuments = data.attachedDocuments;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
