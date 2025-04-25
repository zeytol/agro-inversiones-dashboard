import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.css']
})
export class EliminarCategoriaComponent {
  showDeleteModal: boolean = false;  // Controlar si el modal está visible
  categoriaSeleccionada = { id: 1, name: 'Categoría de ejemplo' };  // Datos de la categoría a eliminar

  constructor(private http: HttpClient) { }

  mostrarDeleteModal(): void {
    this.showDeleteModal = true;  // Mostrar el modal de eliminación
  }

  cerrarDeleteModal(): void {
    this.showDeleteModal = false;  // Cerrar el modal
  }

}
