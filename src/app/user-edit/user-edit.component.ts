import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface User {
  id: number;
  foto: string;
  username: string;
  password: string;
  email: string;
  telefono: string;
  estado: string;
  fechaIngreso: string;
  ultimaConexion: string;
  roles: string[];
  modulos: string[];
  permisos: string[];
}

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  users: User[] = [];
  editUserForm: FormGroup;
  isModalOpen = false;
  currentUser: User | null = null;

  // Available options for roles, modules, and permissions
  availableRoles = ['Admin', 'Usuario'];
  availableModules = ['Dashboard', 'Usuarios', 'Reportes', 'Configuración'];
  availablePermissions = ['Ver', 'Crear', 'Editar', 'Eliminar'];

  constructor(private fb: FormBuilder) {
    this.editUserForm = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      estado: ['Activo', Validators.required],
      roles: [[]],
      modulos: [[]],
      permisos: [[]]
    });
  }

  ngOnInit(): void {
    // Load users from your data source (JSON, service, etc.)
    this.loadUsers();
  }

  loadUsers(): void {
    // In a real app, this would come from a service
    this.users = [
      // Your existing user data
    ];
  }

  openEditModal(user: User): void {
    this.currentUser = user;
    this.editUserForm.patchValue({
      username: user.username,
      email: user.email,
      telefono: user.telefono,
      estado: user.estado,
      roles: user.roles,
      modulos: user.modulos,
      permisos: user.permisos
    });
    this.isModalOpen = true;
  }

  saveUser(): void {
    if (this.editUserForm.valid && this.currentUser) {
      // Find the index of the current user
      const userIndex = this.users.findIndex(u => u.id === this.currentUser!.id);
      
      if (userIndex !== -1) {
        // Update the user with form values
        this.users[userIndex] = {
          ...this.currentUser,
          ...this.editUserForm.value
        };

        // Close modal and reset
        this.isModalOpen = false;
        this.currentUser = null;
        this.editUserForm.reset({ estado: 'Activo' });
      }
    }
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.currentUser = null;
  }

  // Form validation helpers
  get username() { return this.editUserForm.get('username'); }
  get email() { return this.editUserForm.get('email'); }
  get telefono() { return this.editUserForm.get('telefono'); }
}