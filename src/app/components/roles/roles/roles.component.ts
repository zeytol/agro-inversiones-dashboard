import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {
isModalOpen: any;
closeModal() {
throw new Error('Method not implemented.');
}
  roles: any[] = [];
  filteredRoles: any[] = [];
  searchRole: string = '';
  user: any;

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    // Obtener el usuario seleccionado desde el estado de la navegación
    this.user = this.router.getCurrentNavigation()?.extras.state?.['user'];
    this.loadRoles();
  }

  loadRoles(): void {
    this.http.get<any[]>('assets/datUsers.json').subscribe((data) => {
      this.roles = data;
      this.filteredRoles = data;

      // Filtrar los roles del usuario seleccionado
      this.filteredRoles = this.filteredRoles.filter(role => this.user.roles.includes(role.name));
    });
  }

  filterRoles(): void {
    this.filteredRoles = this.roles.filter(role => {
      return role.name.toLowerCase().includes(this.searchRole.toLowerCase());
    });
  }

  // Otras acciones como ver permisos, editar y eliminar roles...
}