import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  isDeleted = false;

  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clienteNombre: string } // Recibe el nombre del cliente como dato
  ) {}

  onCancel(): void {
    this.dialogRef.close(false); // Cierra sin eliminar
  }

  onConfirm(): void {
    this.isDeleted = true; // Cambia el estado para mostrar el mensaje de eliminación
    
    // Agrega un retraso para mostrar el mensaje antes de cerrar el modal
    setTimeout(() => {
      this.dialogRef.close(this.data.clienteNombre); // Pasa el nombre del cliente después del retraso
    }, 500); // 1500 ms = 1.5 segundos de retraso
  }

  onClose(): void {
    this.dialogRef.close(true); 
  }
}