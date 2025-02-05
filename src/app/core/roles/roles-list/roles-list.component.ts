import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../../services/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {
  isSidebarVisible = true;
  roles: any[] = [];
  isCreateRoleModalOpen = false;
  isLoadingModalOpen = false;
  isSuccessModalOpen = false;
  isErrorModalOpen = false;
  isDetailRoleModalOpen = false;
  isDeleteRoleModalOpen = false;
  selectedRole: any = null;
  isEditRoleModalOpen = false;
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
          permissions: role.permissions || []
        }));
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  fetchPermissions() {
    this.rolesService.getPermissions().subscribe(
      (data) => {
        this.availablePermissions = data;
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

    this.isLoadingModalOpen = true; // Mostrar modal de carga

    this.rolesService.createRole(this.newRole).subscribe(
      (response) => {
        console.log('Rol creado:', response);
        this.isLoadingModalOpen = false;
        this.isSuccessModalOpen = true;
    
        setTimeout(() => {
          this.isSuccessModalOpen = false;
          window.location.reload();
        }, 3000);
      },
      (error) => {
        if (error.status === 201) { // Si es 201, no es error
          console.log('Rol creado correctamente.');
          this.isSuccessModalOpen = true;
          setTimeout(() => {
            this.isSuccessModalOpen = false;
            window.location.reload();
          }, 3000);
        } else {
          console.error('Error al crear rol:', error);
          this.isLoadingModalOpen = false;
          this.isErrorModalOpen = true;
    
          setTimeout(() => {
            this.isErrorModalOpen = false;
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
    this.isLoadingModalOpen = true; // Mostrar modal de carga

    this.rolesService.deleteRole(id).subscribe(
      () => {
        console.log('Rol eliminado correctamente.');
        this.isLoadingModalOpen = false;
        this.isSuccessModalOpen = true;
        
        setTimeout(() => {
          this.isSuccessModalOpen = false;
          // Eliminar el rol de la lista sin recargar la página
          this.roles = this.roles.filter(role => role.id !== id);
        }, 3000);
      },
      (error) => {
        console.error('Error al eliminar rol:', error);
        this.isLoadingModalOpen = false;
        this.isErrorModalOpen = true;

        setTimeout(() => {
          this.isErrorModalOpen = false;
        }, 3000);
      }
    );
  }

  // Abrir modal de edición
  openEditRoleModal(role: any) {
    this.editedRole = { ...role }; // Cargar los datos del rol en el formulario de edición
    this.isEditRoleModalOpen = true;
  }

  closeEditRoleModal() {
    this.isEditRoleModalOpen = false;
    this.editedRole = { id: null, role_name: '', description: '', permissions: [] };
  }

  // Método para actualizar el rol
  updateRole() {
    // Verifica si los campos tienen el formato correcto
    console.log('Datos a enviar al API:', this.editedRole);
  
    this.isLoadingModalOpen = true;
  
    this.rolesService.updateRole(this.editedRole.id, this.editedRole).subscribe(
      (response) => {
        console.log('Rol actualizado:', response);
        this.isLoadingModalOpen = false;
        this.isSuccessModalOpen = true;
  
        const updatedRoleIndex = this.roles.findIndex(role => role.id === this.editedRole.id);
        if (updatedRoleIndex !== -1) {
          this.roles[updatedRoleIndex] = this.editedRole;
        }
  
        setTimeout(() => {
          this.isSuccessModalOpen = false;
          this.closeEditRoleModal();
        }, 3000);
      },
      (error) => {
        console.error('Error al actualizar rol:', error);
        this.isLoadingModalOpen = false;
        this.isErrorModalOpen = true;
  
        setTimeout(() => {
          this.isErrorModalOpen = false;
        }, 3000);
      }
    );
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}