import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-siderbang',
  templateUrl: './siderbang.component.html',
  styleUrls: ['./siderbang.component.css'] // Cambia 'styleUrl' por 'styleUrls'
})
export class SiderbangComponent {
  activeLink: string;

  constructor(private router: Router, private authService: AuthService,) {
    this.activeLink = this.router.url; // Establece el enlace activo al cargar el componente
  }

  isActive(link: string): boolean {
    return this.activeLink === link; // Verifica si el enlace es el activo
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
