
import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirm-delete-modal',
  templateUrl: './confirm-delete-modal.component.html',
  styleUrls: ['./confirm-delete-modal.component.css']
})
export class ConfirmDeleteModalComponent {
  isDeleted = false;
  isLoading = false;
  error: string | null = null;
  
  constructor(
    public dialogRef: MatDialogRef<ConfirmDeleteModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { clientId: number, clientName: string }
  ) {}
  
  onCancel(): void {
    this.dialogRef.close(false);
  }
  
  onConfirm(): void {
    this.isLoading = true;

    this.dialogRef.close({ confirmed: true, clientId: this.data.clientId });
  }
  
  showSuccessAndClose(): void {
    this.isLoading = false;
    this.isDeleted = true;
  }
  
  showError(errorMessage: string): void {
    this.isLoading = false;
    this.error = errorMessage;
  }
  
  onClose(): void {
    this.dialogRef.close(true);
  }
}
