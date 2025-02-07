import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-add-user',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl">
        <div class="flex justify-between items-center p-5 border-b">
          <h3 class="text-xl font-semibold text-green-800">Agregar Nuevo Usuario</h3>
          <button (click)="cancelAdd()" class="text-red-500 text-2xl">&times;</button>
        </div>

        <form [formGroup]="userForm" (ngSubmit)="submitForm()" class="p-6">
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Nombre de Usuario</label>
            <input 
              type="text" 
              formControlName="username" 
              class="w-full p-2 border rounded-lg"
              placeholder="Ingrese nombre de usuario"
            >
            <small 
              *ngIf="userForm.get('username')?.invalid && userForm.get('username')?.touched" 
              class="text-red-500"
            >
              El nombre de usuario es requerido (mínimo 3 caracteres)
            </small>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Correo Electrónico</label>
            <input 
              type="email" 
              formControlName="email" 
              class="w-full p-2 border rounded-lg"
              placeholder="Ingrese correo electrónico"
            >
            <small 
              *ngIf="userForm.get('email')?.invalid && userForm.get('email')?.touched" 
              class="text-red-500"
            >
              Correo electrónico válido es requerido
            </small>
          </div>

          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Estado</label>
            <select 
              formControlName="state" 
              class="w-full p-2 border rounded-lg"
            >
              <option [value]="1">Activo</option>
              <option [value]="0">Inactivo</option>
            </select>
          </div>

          <div class="flex justify-end space-x-2">
            <button 
              type="button" 
              (click)="cancelAdd()" 
              class="px-4 py-2 bg-gray-300 rounded-md"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              [disabled]="isSubmitting || userForm.invalid"
              class="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
            >
              {{ isSubmitting ? 'Agregando...' : 'Agregar Usuario' }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `
})
export class AddUserComponent {
  @Output() userAdded = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  userForm: FormGroup;
  isSubmitting = false;

  constructor(
    private fb: FormBuilder, 
    private userService: UserService
  ) {
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
      next: (newUser: any) => {
        this.userAdded.emit(newUser);
        this.cancel.emit();
      },
      error: (err) => {
        console.error('Error al agregar usuario:', err);
        alert('No se pudo agregar el usuario. Intente de nuevo.');
        this.isSubmitting = false;
      }
    });
  }

  cancelAdd(): void {
    this.cancel.emit();
  }
}