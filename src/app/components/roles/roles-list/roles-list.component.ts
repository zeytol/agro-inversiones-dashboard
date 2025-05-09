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
          permission_name: perm.permissionName 
        }));
        console.log('Permisos disponibles:', this.availablePermissions); 
      },
      (error) => {
        console.error('Error al obtener permisos:', error);
      }
    );
  }

  goToUsers() {
    this.router.navigate(['/user']);
  }

  goToPermissions() {
    this.router.navigate(['/permisos']);
  }

  openCreateRoleModal() {
    this.isCreateRoleModalOpen = true;
  }

  closeCreateRoleModal() {
    this.isCreateRoleModalOpen = false;
    this.newRole = { roleName: '', description: '' };
  }

  createRole() {
    if (!this.newRole.roleName || !this.newRole.description) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    this.isCreatingRole = true; 
  
    this.rolesService.createRole(this.newRole).subscribe(
      (response) => {
        console.log('Rol creado:', response);
        this.isCreatingRole = false;
        this.isCreateSuccessModalOpen = true;
  
        setTimeout(() => {
          this.isCreateSuccessModalOpen = false;
          window.location.reload();
        }, 3000);
      },
      (error) => {
        if (error.status === 201) { 
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

  openDetailRoleModal(role: any) {
    this.selectedRole = role;
    this.isDetailRoleModalOpen = true;
  }

  closeDetailRoleModal() {
    this.isDetailRoleModalOpen = false;
    this.selectedRole = null;
  }

  openDeleteRoleModal(role: any) {
    this.selectedRole = role;
    this.isDeleteRoleModalOpen = true;
  }

  closeDeleteRoleModal() {
    this.isDeleteRoleModalOpen = false;
    this.selectedRole = null;
  }

  deleteRole(id: number) {
    this.isDeletingRole = true;
    this.isDeleteRoleModalOpen = false; 

    this.rolesService.deleteRole(id).subscribe(
      () => {
        console.log('Rol eliminado correctamente.');
        this.isDeletingRole = false;
        this.isDeleteSuccessModalOpen = true;

        setTimeout(() => {
          this.isDeleteSuccessModalOpen = false;
          this.roles = this.roles.filter(role => role.id !== id);
        }, 3000); 
      },
      (error) => {
        console.error('Error al eliminar rol:', error);
        this.isDeletingRole = false;
        this.isDeleteErrorModalOpen = true;

        setTimeout(() => {
          this.isDeleteErrorModalOpen = false;
        }, 3000); 
      }
    );
  }

  togglePermission(permissionId: number) {
    if (this.editedRole.permissions.includes(permissionId)) {
      this.editedRole.permissions = this.editedRole.permissions.filter((id: number) => id !== permissionId);
    } else {
      this.editedRole.permissions.push(permissionId);
    }
  }

  openEditRoleModal(role: any) {
    this.editedRole = {
      ...role,
      permissions: (role.permissions || []).map((perm: any) => perm.id)
    };
    this.isEditRoleModalOpen = true;
  }

  closeEditRoleModal() {
    this.isEditRoleModalOpen = false;
    this.editedRole = { id: null, role_name: '', description: '', permissions: [] };
  }

  updateRole() {
    if (!this.editedRole.role_name || !this.editedRole.description) {
      alert('Por favor, completa todos los campos.');
      return;
    }
  
    this.isEditingRole = true; 
  
    const roleData = {
      id: this.editedRole.id,
      roleName: this.editedRole.role_name,
      description: this.editedRole.description,
      permissions: this.editedRole.permissions.map((id: number) => ({ id })), 
    };
  
    this.rolesService.updateRole(this.editedRole.id, roleData).subscribe(
      (response) => {
        console.log('Rol actualizado con éxito:', response);
        this.isEditingRole = false;
        this.isEditSuccessModalOpen = true;
  
        setTimeout(() => {
          this.isEditSuccessModalOpen = false;
          window.location.reload();
        }, 3000); 
      },
      (error) => {
        console.error('Error al actualizar rol:', error);
        this.isEditingRole = false;
        this.isEditErrorModalOpen = true;
  
        setTimeout(() => {
          this.isEditErrorModalOpen = false;
          window.location.reload();
        }, 3000); 
      }
    );
  }

isPermissionSelected(permissionId: number): boolean {
  return this.editedRole.permissions.includes(permissionId);
}

onPermissionChange(permissionId: number, isChecked: boolean) {
  if (isChecked) {
    if (!this.editedRole.permissions.includes(permissionId)) {
      this.editedRole.permissions.push(permissionId);
    }
  } else {
    this.editedRole.permissions = this.editedRole.permissions.filter((id: number) => id !== permissionId);
  }
}


  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}