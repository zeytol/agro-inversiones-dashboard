import { Component, OnInit } from '@angular/core';
import { RolesService } from '../../services/roles.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-permisos',
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.css'],
})
export class PermisosComponent implements OnInit {
  permissions: any[] = [];
  isSidebarVisible = true;
  newPermission = { permissionName: '', description: '', moduleId: 1 };
  roles: any[] = [];
  selectedRoleId: number | null = null;
  selectedPermissions: number[] = [];
  isCreateModalOpen = false;

  constructor(private rolesService: RolesService) {}

  ngOnInit(): void {
    this.fetchPermissions();
    this.fetchRoles();
  }

  // Obtener lista de permisos
  fetchPermissions() {
    this.rolesService.getPermissions().subscribe(
      (data) => {
        this.permissions = data;
      },
      (error) => {
        console.error('Error al obtener permisos:', error);
      }
    );
  }

  // Obtener lista de roles para asignación
  fetchRoles() {
    this.rolesService.getRoles().subscribe(
      (data) => {
        this.roles = data;
      },
      (error) => {
        console.error('Error al obtener roles:', error);
      }
    );
  }

  // Crear un nuevo permiso
  createPermission() {
    this.rolesService.createPermission(this.newPermission).subscribe(
      () => {
        this.fetchPermissions();
        this.isCreateModalOpen = false;
        this.newPermission = { permissionName: '', description: '', moduleId: 1 };
      },
      (error) => {
        console.error('Error al crear permiso:', error);
      }
    );
  }

  // Eliminar un permiso
  deletePermission(id: number) {
    if (confirm('¿Estás seguro de eliminar este permiso?')) {
      this.rolesService.deletePermission(id).subscribe(
        () => {
          this.fetchPermissions();
        },
        (error) => {
          console.error('Error al eliminar permiso:', error);
        }
      );
    }
  }

  // Asignar permisos a un rol
  assignPermissions() {
    if (this.selectedRoleId && this.selectedPermissions.length > 0) {
      this.rolesService.assignPermissionsToRole(this.selectedRoleId, this.selectedPermissions).subscribe(
        () => {
          alert('Permisos asignados correctamente');
        },
        (error) => {
          console.error('Error al asignar permisos:', error);
        }
      );
    } else {
      alert('Selecciona un rol y al menos un permiso.');
    }
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
