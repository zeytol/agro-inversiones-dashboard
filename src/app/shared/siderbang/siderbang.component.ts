import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-siderbang',
  templateUrl: './siderbang.component.html',
  styleUrls: ['./siderbang.component.css'] // Cambia 'styleUrl' por 'styleUrls'
})
export class SiderbangComponent {
  activeLink: string;

  constructor(private router: Router) {
    this.activeLink = this.router.url; // Establece el enlace activo al cargar el componente
  }

  isActive(link: string): boolean {
    return this.activeLink === link; // Verifica si el enlace es el activo
  }
}
