import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, finalize } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
viewRolesPermissions(arg0: any) {
throw new Error('Method not implemented.');
}
selectedUser: any;
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300); 
  }
    private frontendIdCounter = 1;

  private updateChartsSize() {
    this.charts.forEach(chart => chart.chart.redraw());
  }
  users$ = new BehaviorSubject<any[]>([]);
  userForm: FormGroup;
  selectedUserId: number | null = null;
  message = { text: '', type: '' };
  isLoading = false;
  charts: any[] = [];

  showModal = false;
  showDeleteModal = false;
  userToDelete: any = null;
  isSidebarVisible = true;

  constructor(private userService: UserService, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    this.isLoading = true;
    this.userService.getUsers().pipe(
      finalize(() => this.isLoading = false)
    ).subscribe(
      data => {
        this.users$.next(data);
      },
      error => {
        console.error('Error cargando usuarios:', error);
        this.showMessage('Error al cargar usuarios', 'error');
      }
    );
  }

  openModal(user: any = null): void {
    this.showModal = true;
    if (user) {
      this.selectedUserId = user.id;
      this.userForm.patchValue({
        username: user.username,
        email: user.email,
        password: '' 
      });
    } else {
      this.resetForm();
    }
  }

  openDeleteModal(user: any): void {
    this.userToDelete = user;
    this.showDeleteModal = true;
  }

  submitForm(): void {
    if (this.userForm.invalid) return;
  
    const user = this.userForm.value;
    this.isLoading = true;
  
    if (this.selectedUserId) {
      this.userService.editUser(this.selectedUserId, user).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        () => {
          this.showMessage('Usuario actualizado con éxito', 'success');
          this.loadUsers();
          this.closeModal();
        },
        (error) => {
          this.showMessage('Error al actualizar usuario', 'error');
          console.error(error);
        }
      );
    } else {
      this.userService.addUser(user).pipe(
        finalize(() => this.isLoading = false)
      ).subscribe(
        () => {
          this.showMessage('Usuario agregado con éxito', 'success');
          this.loadUsers();
          this.closeModal();
        },
        (error: HttpErrorResponse) => {
          if (error.status === 201) {
            this.showMessage('Usuario agregado con éxito', 'success');
            this.loadUsers();
            this.closeModal();
          } else {
            this.showMessage('Error al agregar usuario', 'error');
            console.error(error);
          }
        }
      );
    }
  }
  deleteUser(): void {
    if (!this.userToDelete || typeof this.userToDelete.id !== 'number') {
      this.showMessage('No se ha seleccionado un usuario válido para eliminar', 'error');
      return;
    }
  
    // Mostrar confirmación con SweetAlert2
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.isLoading = true;
        this.userService.deleteUser(this.userToDelete.id).pipe(
          finalize(() => this.isLoading = false)
        ).subscribe(
          () => {
            this.showMessage('Usuario eliminado con éxito', 'success');
            this.loadUsers();
            this.closeDeleteModal();
          },
          (error: HttpErrorResponse) => {
            if (error.status === 200) {
              this.showMessage('Usuario eliminado con éxito', 'success');
              this.loadUsers();
              this.closeDeleteModal();
            } else {
              console.error('Error al eliminar el usuario:', error);
              this.showMessage('Ocurrió un error al eliminar el usuario', 'error');
            }
          }
        );
      }
    });
  }

  closeModal(): void {
    this.showModal = false;
    this.resetForm();
  }

  closeDeleteModal(): void {
    this.showDeleteModal = false;
    this.userToDelete = null;
  }

  resetForm(): void {
    this.userForm.reset();
    this.selectedUserId = null;
  }

  showMessage(text: string, type: 'success' | 'error') {
    Swal.fire({
      icon: type,
      title: text,
      showConfirmButton: false,
      timer: 3000 
    });
  }
}