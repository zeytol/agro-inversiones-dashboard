import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user.model';
import { finalize, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css'],
})
export class UsersComponent implements OnInit {
  isSidebarVisible = true;
  users: User[] = [];
  loading = false;
  editingUser: User | null = null;
  userToDelete: User | null = null;
  isAddingUser = false;

  readonly UserState = {
    ACTIVE: 1,
    INACTIVE: 0,
  };

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getUsers().pipe(
      finalize(() => (this.loading = false)),
      catchError(err => this.handleError('Error cargando usuarios', err))
    ).subscribe(users => this.users = users);
  }

  openAddUserModal(): void {
    this.isAddingUser = true;
  }

  handleUserAdded(newUser: User): void {
    this.users.push(newUser);
    this.isAddingUser = false;
  }

  handleEditUser(user: User): void {
    this.editingUser = { ...user };
  }

  handleUserUpdated(updatedUser: User): void {
    const index = this.users.findIndex(u => u.id === updatedUser.id);
    if (index !== -1) this.users[index] = updatedUser;
    this.editingUser = null;
  }

  handleDeleteUser(user: User): void {
    if (confirm(`Are you sure you want to delete ${user.username}?`)) {
      this.userService.deleteUser(user.id).subscribe({
        next: () => {
          this.users = this.users.filter(u => u.id !== user.id);
        },
        error: err => this.handleError('Error eliminando usuario', err)
      });
    }
  }
  
  confirmDeleteUser(): void {
    if (this.userToDelete && this.userToDelete.id) {
      this.userService.deleteUser(this.userToDelete.id).pipe(
        catchError(err => this.handleError('Error al eliminar usuario', err))
      ).subscribe(() => {
        this.users = this.users.filter(u => u.id !== this.userToDelete!.id);
        this.userToDelete = null;
      });
    }
  }

  filterUsersByState(state: number): void {
    this.loading = true;
    this.userService.getUsers().pipe(
      finalize(() => (this.loading = false)),
      catchError(err => this.handleError('Error filtrando usuarios', err))
    ).subscribe(users => this.users = users.filter(user => user.state === state));
  }

  private handleError(message: string, err: HttpErrorResponse) {
    console.error(message, err);
    alert(`${message}. Inténtelo de nuevo más tarde.`);
    return throwError(() => err);
  }
}
