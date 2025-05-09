import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { customers } from '../../../models/client.model';

@Component({
  selector: 'app-cliente-detalle',
  templateUrl: './cliente-detalle.component.html',
  styleUrls: ['./cliente-detalle.component.css']
})
export class ClienteDetalleComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public cliente: customers,
    private dialogRef: MatDialogRef<ClienteDetalleComponent>
  ) {}

  cerrarModal(): void {
    this.dialogRef.close();
  }
}
