import { Component, OnInit } from '@angular/core';
import { UserService } from '../../app/user.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  isSidebarVisible = true;

  users: any[] = [];
  loading: boolean = false;
  editingUser: any | null = null;
  userToDelete: any | null = null;
  newUser: any = {
    username: '',
    email: '',
    phone: '',
    status: 'Active',
    photo: '',
    roles: [],
    modules: []
  };
  
  // New property to control add user modal visibility
  isAddingUser: boolean = false;
  userRolesPermissions: any | null = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }
  private updateChartsSize() {
   
  }
  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().subscribe({
      next: (data) => {
        this.users = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Error al cargar usuarios:', err);
        this.loading = false;
      }
    });
  }

  // New method to open add user modal
  openAddUserModal(): void {
    this.newUser = {
      username: '',
      email: '',
      phone: '',
      status: 'Active',
      photo: '',
      roles: [],
      modules: []
    };
    this.isAddingUser = true;
  }


  // New method to add a new user
  addUser(): void {
    if (this.validateNewUser()) {
      this.userService.addUser(this.newUser).subscribe({
        next: (data) => {
          this.users.push(data); // Add the newly created user to the list
          this.isAddingUser = false; // Close the modal
          this.newUser = {}; // Clear the form
        },
        error: (err) => {
          console.error('Error al agregar usuario:', err);
        }
      });
    }
  }
  

  // Validation method for new user
  validateNewUser(): boolean {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.phone) {
      alert('Por favor, complete todos los campos.');
      return false;
    }
    return true;
  }
  
  // Existing methods remain the same
  confirmDeleteUser(user: any): void {
    this.userToDelete = user; // Store the user to be deleted
  }
  
  deleteUser(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== this.userToDelete.id); // Remove the user from the list
          this.userToDelete = null; // Close the modal
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }
  
  cancelDelete(): void {
    this.userToDelete = null; // Close the delete confirmation modal without deleting
  }

  editUser(user: any): void {
    this.editingUser = { ...user };
  }

  updateUser(): void {
    this.userService.updateUser(this.editingUser).subscribe({
      next: (data) => {
        const index = this.users.findIndex(user => user.id === data.id);
        if (index !== -1) {
          this.users[index] = data; // Update the user in the list
        }
        this.editingUser = null; // Close the modal
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }
  
  cancelEdit(): void {
    this.editingUser = null;
  }
  // Método para abrir el modal de Roles y Permisos
  viewRolesPermissions(user: any): void {
    this.userRolesPermissions = user;
  }

  // Método para cerrar el modal de Roles y Permisos
  closeRolesModal(): void {
    this.userRolesPermissions = null;
  }
  // Close add user modal
  cancelAddUser(): void {
    this.isAddingUser = false;
  }
}