import { Component, Input, Output, EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-role-delete',
  templateUrl: './role-delete.component.html',
  styleUrls: ['./role-delete.component.css']
})
export class RoleDeleteComponent {
  @Input() roles: any[] = []; 
  @Output() roleDeleted = new EventEmitter<number>(); 

  deleteRole(roleId: number): void {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este registro?',
      text: 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        popup: 'bg-white shadow-lg rounded-lg',
        title: 'text-lg font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton:
          'bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md transition-colors',
        cancelButton:
          'bg-red-600 text-black hover:bg-red-400 py-2 px-4 rounded-md transition-colors',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles = this.roles.filter((role) => role.id !== roleId);
        this.roleDeleted.emit(roleId);  
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado exitosamente.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El registro está a salvo :)', 'error');
      }
    });
  }
}
