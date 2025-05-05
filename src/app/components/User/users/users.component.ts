import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AddUserComponent } from '../add-user/add-user.component';
import { EditUserComponent } from '../edit-user/edit-user.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; 
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  isSidebarVisible = true;
  error: string = '';

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  p: number = 1;

  // Navegar a la página de usuarios
  goToPermissions() {
    this.router.navigate(['/roles']);
  }

  registrarUsuario(): void {
    const form = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      enabled: [true]
    });
  
    Swal.fire({
      title: 'Registrar nuevo usuario',
      html: `
        <style>
          .form-group {
            display: flex;
            flex-direction: column;
            gap: 10px;
            align-items: stretch;
          }
  
          .form-group label {
            font-weight: 500;
            text-align: left;
          }
  
          .form-group input,
          .form-group select {
            padding: 0.5rem;
            font-size: 1rem;
            border: 1px solid #ccc;
            border-radius: 5px;
            width: 100%;
            box-sizing: border-box;
          }
        </style>
  
        <div class="form-group">
          <input id="swal-username" placeholder="Nombre de usuario">
          <input id="swal-password" placeholder="Contraseña" type="password">
          <input id="swal-email" placeholder="Correo electrónico">
          <input id="swal-telefono" placeholder="Teléfono">
          <select id="swal-enabled">
            <option value="true" selected>Activo</option>
            <option value="false">Inactivo</option>
          </select>
        </div>
      `,
      focusConfirm: false,
      showCancelButton: true,
      confirmButtonText: 'Registrar',
      preConfirm: () => {
        const username = (document.getElementById('swal-username') as HTMLInputElement).value.trim();
        const password = (document.getElementById('swal-password') as HTMLInputElement).value;
        const email = (document.getElementById('swal-email') as HTMLInputElement).value.trim();
        const telefono = (document.getElementById('swal-telefono') as HTMLInputElement).value.trim();
        const enabled = (document.getElementById('swal-enabled') as HTMLSelectElement).value === 'true';
  
        form.setValue({ username, password, email, telefono, enabled });
  
        if (form.invalid) {
          Swal.showValidationMessage('Por favor completa todos los campos correctamente.');
          return;
        }
  
        return form.value;
      }
    }).then(result => {
      if (result.isConfirmed && result.value) {
        Swal.fire({
          title: 'Registrando usuario...',
          allowOutsideClick: false,
          didOpen: () => {
            Swal.showLoading();
          }
        });
  
        this.userService.registrarUsuario(result.value).subscribe({
          next: () => {
            Swal.fire('Éxito', 'Usuario registrado correctamente.', 'success');
            this.obtenerUsuarios();
          },
          error: (err) => {
            Swal.fire('Error', `No se pudo registrar el usuario. ${err.message}`, 'error');
          }
        });
      }
    });
  }
    

  obtenerUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.map((usuario: any) => ({
          id: usuario.id,
          username: usuario.username,
          email: usuario.email,
          telefono: usuario.telefono,
          enabled: usuario.enabled,
          created_at: usuario.created_at,
          rol: usuario.rol && usuario.rol.roleName ? usuario.rol.roleName : 'No asignado'
        }));
      },
      error: (err) => {
        this.error = err.message || 'Error desconocido';
        console.error('Error al cargar usuarios:', err);
      }
    });
  }

  openAddUserModal(): void {
    const dialogRef = this.dialog.open(AddUserComponent, {
      width: '500px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result === 'usuario_creado') {
        this.obtenerUsuarios(); // refresca lista
      }
    });
  }
  
  verDetalle(usuario: any): void {
    this.userService.getUsuarioDetalle(usuario.id).subscribe({
      next: (detalle) => {
        Swal.fire({
          title: `Detalles de ${usuario.username}`,
          html: `
            <strong>Email:</strong> ${usuario.email}<br>
            <strong>Teléfono:</strong> ${usuario.telefono}<br>
            <strong>Rol:</strong> ${usuario.rol?.roleName || 'No asignado'}<br>
            <strong>Estado:</strong> ${usuario.enabled ? 'Activo' : 'Inactivo'}<br>
            <strong>Registrado el:</strong> ${new Date(usuario.created_at).toLocaleDateString()}
          `,
          icon: 'info',
          confirmButtonText: 'Cerrar'
        });
      },
      error: (err) => {
        Swal.fire('Error', `No se pudieron obtener los detalles del usuario. ${err.message}`, 'error');
      }
    });
  }

  asignarRol(): void {
    // Paso 1: Selecciona usuario
    const inputOptionsUsuarios: any = {};
    this.usuarios.forEach((usuario) => {
      inputOptionsUsuarios[usuario.id] = usuario.username;
    });
  
    Swal.fire({
      title: 'Seleccionar usuario',
      input: 'select',
      inputOptions: inputOptionsUsuarios,
      inputPlaceholder: 'Selecciona un usuario',
      showCancelButton: true,
      confirmButtonText: 'Siguiente',
      cancelButtonText: 'Cancelar',
      inputValidator: (value) => {
        if (!value) {
          return 'Debes seleccionar un usuario';
        }
        return null;
      }
    }).then((resultUsuario) => {
      if (resultUsuario.isConfirmed && resultUsuario.value) {
        const usuarioId = +resultUsuario.value;
        const usuarioSeleccionado = this.usuarios.find(u => u.id === usuarioId);
  
        // Paso 2: Selecciona rol
        this.userService.getRoles().subscribe({
          next: (roles) => {
            const inputOptionsRoles: any = {};
            roles.forEach((rol: any) => {
              inputOptionsRoles[rol.id] = rol.roleName;
            });
  
            Swal.fire({
              title: `Asignar rol a ${usuarioSeleccionado.username}`,
              input: 'select',
              inputOptions: inputOptionsRoles,
              inputPlaceholder: 'Selecciona un rol',
              showCancelButton: true,
              confirmButtonText: 'Asignar',
              cancelButtonText: 'Cancelar',
              inputValidator: (value) => {
                if (!value) {
                  return 'Debes seleccionar un rol';
                }
                return null;
              }
            }).then((resultRol) => {
              if (resultRol.isConfirmed && resultRol.value) {
                const rolId = +resultRol.value;
  
                this.userService.asignarRolAUsuario(usuarioId, rolId).subscribe({
                  next: () => {
                    Swal.fire('Rol Asignado', `El rol fue asignado a ${usuarioSeleccionado.username} correctamente.`, 'success');
                    this.obtenerUsuarios(); // refresca lista
                  },
                  error: (err) => {
                    Swal.fire('Error', `No se pudo asignar el rol. ${err.message}`, 'error');
                  }
                });
              }
            });
          },
          error: (err) => {
            Swal.fire('Error', `No se pudieron cargar los roles. ${err.message}`, 'error');
          }
        });
      }
    });
  }
  
  // Abre el modal para editar un usuario
  openEditUserModal(usuario: any): void {
    const dialogRef = this.dialog.open(EditUserComponent, {
      width: '500px',
      data: usuario // Pasa los datos del usuario a editar al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'usuario_editado') {
        this.obtenerUsuarios(); // refresca la lista después de editar
      }
    });
  }
  
  eliminarUsuario(usuario: any): void {
    console.log('Eliminando usuario con ID:', usuario.id); // Agrega este log para verificar el ID
    Swal.fire({
      title: `¿Estás seguro de eliminar al usuario "${usuario.username}"?`,
      text: "Esta acción no puede ser revertida.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.eliminarUsuario(usuario.id).subscribe({
          next: () => {
            Swal.fire('Eliminado!', `El usuario ${usuario.username} ha sido eliminado correctamente.`, 'success');
            this.obtenerUsuarios(); // Refrescar lista después de eliminar
          },
          error: (err) => {
            Swal.fire('Error!', `No se pudo eliminar al usuario. ${err.message}`, 'error');
          }
        });
      }
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
