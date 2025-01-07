import { Component, OnInit } from '@angular/core';
import { RoleService } from '../role.service';

import { Role } from '..//role.interface';
@Component({
  selector: 'app-roles-list',
  templateUrl: './roles-list.component.html',
})
export class RolesListComponent implements OnInit {
  roles: Role[] = [];
  isModalOpen = false;
  isCreateRoleModalOpen = false;
  isPermissionModalOpen = false;
  selectedRole: Role | null = null;
closeP: any;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.roleService.getRoles().subscribe((data) => {
      this.roles = data;
    });
  }

  viewRole(role: Role) {
    this.selectedRole = role;
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedRole = null;
  }

  openCreateRoleModal() {
    this.isCreateRoleModalOpen = true;
  }

  closeCreateRoleModal() {
    this.isCreateRoleModalOpen = false;
  }

  openPermissionModal(role: Role) {
    this.selectedRole = role;
    this.isPermissionModalOpen = true;
  }

  closePermissionModal() {
    this.isPermissionModalOpen = false;
  }

  editRole(role: Role) {
    // Implement the edit logic here
  }

  deleteRole(role: Role) {
    // Implement the delete logic here
  }
}
