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


  addUser(): void {
    if (this.validateNewUser()) {
      this.userService.addUser(this.newUser).subscribe({
        next: (data) => {
          this.users.push(data);
          this.isAddingUser = false;
          this.newUser = {}; // Reinicia newUser
        },
        error: (err) => {
          console.error('Error al agregar usuario:', err);
        }
      });
    }
  }
  
  validateNewUser(): boolean {
    if (!this.newUser.username || !this.newUser.email || !this.newUser.phone || !this.newUser.status) {
      alert('Por favor, complete todos los campos.');
      return false;
    }
    return true;
  }
  
  confirmDeleteUser(user: any): void {
    this.userToDelete = user; 
  }
  
  deleteUser(): void {
    if (this.userToDelete) {
      this.userService.deleteUser(this.userToDelete.id).subscribe({
        next: () => {
          this.users = this.users.filter(user => user.id !== this.userToDelete.id);
          this.userToDelete = null;
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
        }
      });
    }
  }
  
  cancelDelete(): void {
    this.userToDelete = null; 
  }

  editUser(user: any): void {
    this.editingUser = { ...user };
  }

  updateUser(): void {
    this.userService.updateUser(this.editingUser).subscribe({
      next: (data) => {
        const index = this.users.findIndex(user => user.id === data.id);
        if (index !== -1) {
          this.users[index] = data;
        }
        this.editingUser = null;
      },
      error: (err) => {
        console.error('Error al actualizar usuario:', err);
      }
    });
  }
  
  cancelEdit(): void {
    this.editingUser = null;
  }

  viewRolesPermissions(user: any): void {
    this.userRolesPermissions = user;
  }

  closeRolesModal(): void {
    this.userRolesPermissions = null;
  }

  cancelAddUser(): void {
    this.isAddingUser = false;
  }
}