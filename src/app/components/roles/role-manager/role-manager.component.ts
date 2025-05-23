import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { RoleService } from '../role.service';
import { Role } from '../role.interface';

@Component({
  selector: 'app-role-manager',
  templateUrl: './role-manager.component.html',
  styleUrls: ['./role-manager.component.css']
})
export class RoleManagerComponent implements OnInit {
[x: string]: any;
searchModules() {
throw new Error('Method not implemented.');
}
modules: any;
selectedModuleName: string|undefined;
modalInput: any;
  toggleModule(module: any) {
    module.expanded = !module.expanded;
  }
openCreatePermissionModal(_t27: Role) {
throw new Error('Method not implemented.');
}
  roles: Role[] = []; 
  originalRoles: Role[] = [];
  isModalOpen: boolean = false;
  modalType: string = '';
  modalData: any = {};
  selectedRoleDetails: Role | null = null;
  isRoleDetailsModalOpen: boolean = false;
  roleSearchTerm: string = '';
  moduleSearchTerm: string = '';
  permissionSearchTerm: string = '';

  @Input() role: Role | null = null;
  @Output() closeModal = new EventEmitter<void>();
  modalTitle: any;

  constructor(private roleService: RoleService) {}

  ngOnInit(): void {
    this.loadRoles();
  }
  
  openRoleDetailsModal(role: Role) {
    this.selectedRoleDetails = role;
    this.isRoleDetailsModalOpen = true;
  }

  closeRoleDetailsModal() {
    this.isRoleDetailsModalOpen = false;
    this.selectedRoleDetails = null;
  }
  loadRoles() {
    this.roleService.getRoles().subscribe(
      (roles: Role[]) => {
        this.originalRoles = roles.map((role) => ({
          ...role,
          isExpanded: false,
          modules: role.modules.map((module) => ({
            ...module,
            isExpanded: false, 
            permissions: module.permissions.map((permission) => ({
              ...permission,
              isSelected: false, 
            })),
          })),
        }));
        this.roles = [...this.originalRoles];
      },
      (error) => {
        console.error('Error loading roles:', error);
      }
    );
  }


  toggleModuleExpansion(role: Role) {
    role.isExpanded = !role.isExpanded;
  }
  toggleRoleExpansion(role: Role) {
    role.isExpanded = !role.isExpanded;
  }
  toggleExpansion(type: string, id: any) {
    if (type === 'role') {
      const role = this.roles.find(r => r.role_id === id);
      if (role) role.isExpanded = !role.isExpanded;
    }
  }

  searchRoles() {
    if (!this.roleSearchTerm && !this.moduleSearchTerm && !this.permissionSearchTerm) {
      this.roles = [...this.originalRoles];
      return;
    }

    this.roles = this.originalRoles.filter(role => {
      const roleNameMatch = !this.roleSearchTerm || 
        role.role_name.toLowerCase().includes(this.roleSearchTerm.toLowerCase());
      
      const moduleMatch = !this.moduleSearchTerm || 
        role.modules.some(module => 
          module.module_name.toLowerCase().includes(this.moduleSearchTerm.toLowerCase())
        );
      
      const permissionMatch = !this.permissionSearchTerm || 
        role.modules.some(module => 
          module.permissions.some(permission => 
            permission.permission_name.toLowerCase().includes(this.permissionSearchTerm.toLowerCase())
          )
        );

      return roleNameMatch && moduleMatch && permissionMatch;
    });
  }

  openModal(type: string, roleId?: number, moduleName?: string) {
    this.isModalOpen = true;
    this.modalType = type;
    this.modalData = {};

    if (type === 'module') {
      this.modalData.roleId = roleId;
    } else if (type === 'permission') {
      this.modalData.roleId = roleId;
      this.modalData.moduleName = moduleName;
    }
    this.isModalOpen = true;

  }

  addRole() {
    if (!this.modalData.role_name) {
      console.error('Role name is required');
      return;
    }

    const newRole = { 
      role_name: this.modalData.role_name, 
      modules: [],
      role_id: 0 
    };

    this.roleService.addRole(newRole).subscribe(
      (createdRole) => {
        this.loadRoles();
        this.closeModal.emit();
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error adding role:', error);
      }
    );
  }

  addModule(roleId: number) {
    if (!this.modalData.module_name) {
      console.error('Module name is required');
      return;
    }

    const newModule = { 
      module_name: this.modalData.module_name, 
      permissions: [] 
    };

    this.roleService.addModuleToRole(roleId, newModule).subscribe(
      () => {
        this.loadRoles();
        this.closeModal.emit();
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error adding module:', error);
      }
    );
  }

  addPermission(roleId: number, moduleName: string) {
    if (!this.modalData.permission_name) {
      console.error('Permission name is required');
      return;
    }

    const newPermission = { 
      permission_name: this.modalData.permission_name 
    };

    this.roleService.addPermissionToModule(roleId, moduleName, newPermission).subscribe(
      () => {
        this.loadRoles();
        this.closeModal.emit();
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error adding permission:', error);
      }
    );
  }

  deleteRole(roleId: number) {
    this.roleService['deleteRole'](roleId).subscribe(
      () => {
        this.loadRoles();
      },
      (error: any) => {
        console.error('Error deleting role:', error);
      }
    );
  }

  deleteModule(roleId: number, moduleName: string) {
    this.roleService.removeModuleFromRole(roleId, moduleName).subscribe(
      () => {
        this.loadRoles();
        this.closeModal.emit();
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error deleting module:', error);
      }
    );
  }

  deletePermission(roleId: number, moduleName: string, permissionName: string) {
    this.roleService.removePermissionFromModule(roleId, moduleName, permissionName).subscribe(
      () => {
        this.loadRoles();
        this.closeModal.emit();
        this.isModalOpen = false;
      },
      (error) => {
        console.error('Error deleting permission:', error);
      }
    );
  }

  close() {
    this.isModalOpen = false;
    this.closeModal.emit();
  }

  submitModal() {
    console.log('Modal submitted');
    this.close();
  }
}