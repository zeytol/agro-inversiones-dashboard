import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {
  isSidebarVisible = true;
  roles: any[] = [];
  isCreateRoleModalOpen = false;
  isCreateSuccessModalOpen = false;
  isCreateErrorModalOpen = false;
  isCreatingRole = false;
  isDetailRoleModalOpen = false;
  isDeleteRoleModalOpen = false;
  selectedRole: any = null;
  isEditRoleModalOpen = false;
  isEditingRole = false;
  isEditSuccessModalOpen = false;
  isEditErrorModalOpen = false;
  isDeletingRole = false;
  isDeleteSuccessModalOpen = false;
  isDeleteErrorModalOpen = false;
  editedRole: any = { id: null, role_name: '', description: '', permissions: [] };
  availablePermissions: any[] = [];
  newRole = { roleName: '', description: '' };

  constructor(private rolesService: RolesService, private router: Router) {}

  ngOnInit(): void {
    this.fetchRoles();
    this.fetchPermissions();
  }

  fetchRoles() {
    this.rolesService.getRoles().subscribe(
      (data) => {
        this.roles = data.map((role: any) => ({
          id: role.id,
          role_name: role.roleName,
          description: role.description,
          // Mapeamos cada permiso para cambiar "permissionName" por "permission_name"
          permissions: (role.permissions || []).map((perm: any) => ({
            id: perm.id,
            permission_name: perm.permissionName,
            description: perm.description,
            module: perm.module
          }))
        }));
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  p: number = 1;

  fetchPermissions() {
    this.rolesService.getPermissionsT().subscribe(
      (data) => {
        this.availablePermissions = data.map((perm: any) => ({
          ...perm,
          permission_name: perm.permissionName  // transforma a permission_name
        }));
        console.log('Permisos disponibles:', this.availablePermissions); 
      },
      (error) => {
        console.error('Error al obtener permisos:', error);
      }
    );
  }

  // Navegar a la página de usuarios
  goToUsers() {
    this.router.navigate(['/usuarios']);
  }

  goToPermissions() {
    this.router.navigate(['/permisos']);
  }

  // Abrir y cerrar modal de crear rol
  openCreateRoleModal() {
    this.isCreateRoleModalOpen = true;
  }

  closeCreateRoleModal() {
    this.isCreateRoleModalOpen = false;
    this.newRole = { roleName: '', description: '' };
  }

  // Crear nuevo rol usando el servicio
  createRole() {
    if (!this.newRole.roleName || !this.newRole.description) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    this.isCreatingRole = true; // Mostrar modal de carga
  
    this.rolesService.createRole(this.newRole).subscribe(
      (response) => {
        console.log('Rol creado:', response);
        this.isCreatingRole = false;
        this.isCreateSuccessModalOpen = true;
  
        setTimeout(() => {
          this.isCreateSuccessModalOpen = false;
          // Recargar la página o actualizar la lista
          window.location.reload();
        }, 3000);
      },
      (error) => {
        if (error.status === 201) { // Si es 201, no es error
          console.log('Rol creado correctamente.');
          this.isCreateSuccessModalOpen = true;
          setTimeout(() => {
            this.isCreateSuccessModalOpen = false;
            window.location.reload();
          }, 3000);
        } else {
          console.error('Error al crear rol:', error);
          this.isCreatingRole = false;
          this.isCreateErrorModalOpen = true;
  
          setTimeout(() => {
            this.isCreateErrorModalOpen = false;
            window.location.reload();
          }, 3000);
        }
      }
    );
  }

  // Abrir modal de detalles
  openDetailRoleModal(role: any) {
    this.selectedRole = role;
    this.isDetailRoleModalOpen = true;
  }

  // Cerrar modal de detalles
  closeDetailRoleModal() {
    this.isDetailRoleModalOpen = false;
    this.selectedRole = null;
  }

  // Abrir modal de confirmación de eliminación
  openDeleteRoleModal(role: any) {
    this.selectedRole = role;
    this.isDeleteRoleModalOpen = true;
  }

  // Cerrar modal de confirmación de eliminación
  closeDeleteRoleModal() {
    this.isDeleteRoleModalOpen = false;
    this.selectedRole = null;
  }

  // Eliminar rol
  deleteRole(id: number) {
    this.isDeletingRole = true; // Mostrar modal de carga
    this.isDeleteRoleModalOpen = false; // Cerrar el modal de confirmación

    this.rolesService.deleteRole(id).subscribe(
      () => {
        console.log('Rol eliminado correctamente.');
        this.isDeletingRole = false;
        this.isDeleteSuccessModalOpen = true;

        setTimeout(() => {
          this.isDeleteSuccessModalOpen = false;
          // Eliminar el rol de la lista sin recargar la página
          this.roles = this.roles.filter(role => role.id !== id);
        }, 3000); // Cerrar el modal de éxito después de 3 segundos
      },
      (error) => {
        console.error('Error al eliminar rol:', error);
        this.isDeletingRole = false;
        this.isDeleteErrorModalOpen = true;

        setTimeout(() => {
          this.isDeleteErrorModalOpen = false;
        }, 3000); // Cerrar el modal de error después de 3 segundos
      }
    );
  }

  togglePermission(permissionId: number) {
    if (this.editedRole.permissions.includes(permissionId)) {
      // Si ya existe, lo removemos.
      this.editedRole.permissions = this.editedRole.permissions.filter((id: number) => id !== permissionId);
    } else {
      // Si no existe, lo agregamos.
      this.editedRole.permissions.push(permissionId);
    }
  }

  // Abrir modal de edición con el rol seleccionado
  openEditRoleModal(role: any) {
    this.editedRole = {
      ...role,
      permissions: (role.permissions || []).map((perm: any) => perm.id)
    };
    this.isEditRoleModalOpen = true;
  }

  // Cerrar modal de edición
  closeEditRoleModal() {
    this.isEditRoleModalOpen = false;
    this.editedRole = { id: null, role_name: '', description: '', permissions: [] };
  }

  // Actualizar el rol
  updateRole() {
    if (!this.editedRole.role_name || !this.editedRole.description) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    this.isEditingRole = true; // Mostrar modal de carga
  
    const roleData = {
      id: this.editedRole.id,
      roleName: this.editedRole.role_name,
      description: this.editedRole.description,
      permissions: this.editedRole.permissions.map((id: number) => ({ id })), // Formato correcto
    };
  
    this.rolesService.updateRole(this.editedRole.id, roleData).subscribe(
      (response) => {
        console.log('Rol actualizado con éxito:', response);
        this.isEditingRole = false;
        this.isEditSuccessModalOpen = true;
  
        setTimeout(() => {
          this.isEditSuccessModalOpen = false;
          // Recargar la página después de la actualización
          window.location.reload();
        }, 3000); // 3 segundos para cerrar el modal y refrescar la página
      },
      (error) => {
        console.error('Error al actualizar rol:', error);
        this.isEditingRole = false;
        this.isEditErrorModalOpen = true;
  
        setTimeout(() => {
          this.isEditErrorModalOpen = false;
          // Recargar la página después del error
          window.location.reload();
        }, 3000); // 3 segundos para cerrar el modal y refrescar la página
      }
    );
  }

  // Devuelve true si el permiso está seleccionado
isPermissionSelected(permissionId: number): boolean {
  return this.editedRole.permissions.includes(permissionId);
}

// Se ejecuta cuando cambia el estado del checkbox
onPermissionChange(permissionId: number, isChecked: boolean) {
  if (isChecked) {
    // Si no existe, lo agregamos.
    if (!this.editedRole.permissions.includes(permissionId)) {
      this.editedRole.permissions.push(permissionId);
    }
  } else {
    // Si existe, lo removemos.
    this.editedRole.permissions = this.editedRole.permissions.filter((id: number) => id !== permissionId);
  }
}


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}