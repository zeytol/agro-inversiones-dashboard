import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html'
})
export class UsersComponent implements OnInit {
  usuarios: any[] = [];
  isSidebarVisible = true;
  error: string = '';

  constructor(private userService: UserService, private router: Router) {}

  ngOnInit(): void {
    this.obtenerUsuarios();
  }

  // Navegar a la página de usuarios
  goToPermissions() {
    this.router.navigate(['/roles']);
  }

  obtenerUsuarios(): void {
    this.userService.getUsuarios().subscribe({
      next: (data) => {
        this.usuarios = data.map((usuario: any) => ({
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
  

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}