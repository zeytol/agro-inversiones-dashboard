import { Component, EventEmitter, Input, Output } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-delete-user',
  template: `
    <div class="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div class="w-full max-w-md bg-white rounded-xl shadow-2xl">
        <div class="bg-red-50 p-5 border-b">
          <h3 class="text-2xl font-semibold text-red-800">Confirmar Eliminación</h3>
        </div>

        <div class="p-6">
          <p class="text-lg text-gray-600">
            ¿Está seguro que desea eliminar el usuario 
            <span class="font-bold text-red-600">{{ user.username }}</span>?
          </p>
        </div>

        <div class="flex justify-end p-4 space-x-3 border-t">
          <button 
            (click)="cancelDelete()" 
            class="px-4 py-2 text-gray-600 bg-gray-200 rounded-md"
          >
            Cancelar
          </button>
          <button 
            (click)="deleteUser()" 
            class="px-4 py-2 text-white bg-red-600 rounded-md"
          >
            Sí, Eliminar
          </button>
        </div>
      </div>
    </div>
  `
})
export class DeleteUserComponent {
  @Input() user: any;
  @Output() userDeleted = new EventEmitter<any>();
  @Output() cancel = new EventEmitter<void>();

  constructor(private userService: UserService) {}

  deleteUser(): void {
    if (this.user) {
      this.userService.deleteUser(this.user.id).subscribe({
        next: () => {
          this.userDeleted.emit(this.user);
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          alert('No se pudo eliminar el usuario. Intente de nuevo.');
        }
      });
    }
  }

  cancelDelete(): void {
    this.cancel.emit();
  }
}