// edit-user.component.ts
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html'
})
export class EditUserComponent implements OnInit {
  @Input() userId!: number;
  @Input() userData: any;
  @Output() userEdited = new EventEmitter<void>();
  @Output() closeModal = new EventEmitter<void>();

  userForm: FormGroup;
  isLoading = false;
  message = { text: '', type: '' };

  constructor(private fb: FormBuilder, private userService: UserService) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    if (this.userData) {
      this.userForm.patchValue({
        username: this.userData.username,
        email: this.userData.email,
        password: '' // No mostrar contraseña por seguridad
      });
    }
  }

  onSubmit(): void {
    if (this.userForm.invalid) return;

    this.isLoading = true;
    this.userService.editUser(this.userId, this.userForm.value).pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      () => {
        this.showMessage('Usuario actualizado con éxito', 'success');
        this.userEdited.emit();
        this.onClose();
      },
      (error: HttpErrorResponse) => {
        if (error.status === 200) {
          this.showMessage('Usuario actualizado con éxito', 'success');
          this.userEdited.emit();
          this.onClose();
        } else {
          this.showMessage('Error al actualizar usuario', 'error');
          console.error(error);
        }
      }
    );
  }

  onClose(): void {
    this.userForm.reset();
    this.closeModal.emit();
  }

  private showMessage(text: string, type: string): void {
    this.message = { text, type };
    setTimeout(() => this.message = { text: '', type: '' }, 3000);
  }
}