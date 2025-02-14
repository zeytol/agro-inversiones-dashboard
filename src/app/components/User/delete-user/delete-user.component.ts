// delete-user.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html'
})
export class DeleteUserComponent {
  @Input() userId!: number;
  @Input() username!: string;
  @Output() userDeleted = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  isLoading = false;
  message = { text: '', type: '' };

  constructor(private userService: UserService) {}

  onConfirmDelete(): void {
    this.isLoading = true;
    this.userService.deleteUser(this.userId).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      () => {
        this.showMessage('Usuario eliminado con éxito', 'success');
        this.userDeleted.emit();
        this.onClose();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.showMessage('Usuario eliminado con éxito', 'success');
          this.userDeleted.emit();
          this.onClose();
        } else {
          this.showMessage('Error al eliminar usuario', 'error');
          console.error(error);
        }
      }
    );
  }

  onClose(): void {
    this.closeModal.emit();
  }

  private showMessage(text: string, type: string): void {
    this.message = { text, type };
    setTimeout(() => this.message = { text: '', type: '' }, 3000);
  }
}