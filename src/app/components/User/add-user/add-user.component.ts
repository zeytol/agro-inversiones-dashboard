import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html'
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  isSubmitting = false;

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      state: [1, Validators.required]
    });
  }

  submitForm(): void {
    if (this.userForm.invalid) return;

    this.isSubmitting = true;
    this.userService.addUser(this.userForm.value).subscribe({
      next: (newUser) => {
        this.userAdded.emit(newUser);
        this.cancel.emit(); // Cierra el modal
      },
      error: (err) => {
        console.error('Error al agregar usuario:', err);
        alert('No se pudo agregar el usuario. Intente de nuevo.');
      },
      complete: () => (this.isSubmitting = false)
    });
  }

  cancelAdd(): void {
    this.cancel.emit();
  }
}
