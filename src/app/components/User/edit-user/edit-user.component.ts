// src/app/components/edit-user/edit-user.component.ts
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent {
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  updateUser(): void {
    if (!this.user || !this.user.id) return;

    this.userService.updateUser(this.user)
      .pipe(catchError(err => this.handleError('Error al actualizar usuario', err)))
      .subscribe(updatedUser => {
        this.userUpdated.emit(updatedUser);
      });
  }

  cancelEdit(): void {
    this.cancel.emit();
  }

  private handleError(message: string, err: any) {
    console.error(message, err);
    alert(`${message}. Inténtelo de nuevo más tarde.`);
    return throwError(() => err);
  }
}
