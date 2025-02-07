import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-edit-user',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl">
        <div class="flex justify-between items-center p-5 bg-blue-600 text-white rounded-t">
          <h3 class="text-2xl font-semibold">Editar Usuario</h3>
          <button 
            (click)="cancelEdit()" 
            class="text-3xl font-semibold text-red-500 hover:text-red-700"
          >
            &times;
          </button>
        </div>

        <div class="p-6">
          <div class="mb-4">
            <label class="block text-gray-700">Nombre de Usuario</label>
            <input 
              [(ngModel)]="user.username" 
              type="text" 
              class="w-full px-4 py-2 border rounded-md"
            >
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Correo Electrónico</label>
            <input 
              [(ngModel)]="user.email" 
              type="email" 
              class="w-full px-4 py-2 border rounded-md"
            >
          </div>

          <div class="mb-4">
            <label class="block text-gray-700">Estado</label>
            <select 
              [(ngModel)]="user.state" 
              class="w-full px-4 py-2 border rounded-md"
            >
              <option [value]="1">Activo</option>
              <option [value]="0">Inactivo</option>
            </select>
          </div>
        </div>

        <div class="flex justify-end p-4 space-x-3 border-t">
          <button 
            (click)="cancelEdit()" 
            class="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button 
            (click)="updateUser()" 
            class="px-4 py-2 text-white bg-blue-600 rounded-md"
          >
            Actualizar
          </button>
        </div>
      </div>
    </div>
  `
})
export class EditUserComponent {
  @Input() user!: User;
  @Output() userUpdated = new EventEmitter<User>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  updateUser(): void {
    if (!this.user || !this.user.id) return;

    this.userService.updateUser(this.user).subscribe({
      next: (updatedUser) => {
        this.userUpdated.emit(updatedUser);
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
        alert('No se pudo actualizar el usuario. Intente de nuevo.');
      }
    });
  }

  cancelEdit(): void {
    this.cancel.emit();
  }
}