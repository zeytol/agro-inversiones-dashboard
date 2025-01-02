import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-eliminar-categoria',
  templateUrl: './eliminar-categoria.component.html',
  styleUrls: ['./eliminar-categoria.component.css']
})
export class EliminarCategoriaComponent {
  showDeleteModal: boolean = false;  // Controlar si el modal está visible
  categoriaSeleccionada = { id: 1, name: 'Categoría de ejemplo' };  // Datos de la categoría a eliminar

  constructor(private http: HttpClient) {}

  mostrarDeleteModal(): void {
    this.showDeleteModal = true;  // Mostrar el modal de eliminación
  }

  cerrarDeleteModal(): void {
    this.showDeleteModal = false;  // Cerrar el modal
  }

  eliminarCategoria(): void {
    // URL para la eliminación de categoría basada en su ID
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories/${this.categoriaSeleccionada.id}`;

    // Enviar la solicitud DELETE
    this.http.delete(url).subscribe({
      next: (response) => {
        console.log('Categoría eliminada:', response);
        this.cerrarDeleteModal();  // Cerrar el modal después de eliminar
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
      }
    });
  }
}
