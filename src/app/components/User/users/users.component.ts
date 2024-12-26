import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  isSidebarVisible = true;
  users: any[] = [];
  loading: boolean = false;
  editingUser: any | null = null;
  userToDelete: any | null = null;
  isAddingUser: boolean = false;
  userRolesPermissions: any | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error loading users:', err);
        this.loading = false;
      }
    });
  }

  openAddUserModal(): void {
    this.isAddingUser = true;
  }

  handleUserAdded(newUser: any): void {
    this.users.push(newUser);
    this.isAddingUser = false;
  }

  handleEditUser(user: any): void {
    this.editingUser = { ...user };
  }

  handleUserUpdated(updatedUser: any): void {
    const index = this.users.findIndex(user => user.id === updatedUser.id);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
    this.editingUser = null;
  }

  handleDeleteUser(user: any): void {
    this.userToDelete = user;
  }

  handleUserDeleted(deletedUser: any): void {
    this.users = this.users.filter(user => user.id !== deletedUser.id);
    this.userToDelete = null;
  }

  // Roles and Permissions handlers
  viewRolesPermissions(user: any): void {
    this.userRolesPermissions = user;
  }

  closeRolesModal(): void {
    this.userRolesPermissions = null;
  }
}