import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent {
  @Input() user: any;
  @Output() userUpdated = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  updateUser(): void {
    this.userService.updateUser(this.user).subscribe({
      next: (data) => {
        this.userUpdated.emit(data);
      },
      error: (err) => {
        console.error('Error updating user:', err);
      }
    });
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}