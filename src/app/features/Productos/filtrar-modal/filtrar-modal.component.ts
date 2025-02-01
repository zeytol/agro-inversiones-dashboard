import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CategoryProductsService } from '../../../services/category-products.service';
import { HttpClient } from '@angular/common/http';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-filtrar-modal',
  templateUrl: './filtrar-modal.component.html',
  styleUrls: ['./filtrar-modal.component.css']
})
export class FiltrarModalComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() aplicarModal = new EventEmitter<any>(); // Evento para aplicar el filtro


  // Variables para gestión de categorías
  agregarCategoriaModalVisible: boolean = false;
  editarCategoriaModalVisible: boolean = false;
  categoriaSeleccionada: any = null;
  categorias: any[] = []; // Lista de categorías
  showDeleteModal: boolean = false;

  constructor(
    private categoryService: CategoryProductsService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.cargarCategorias();
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.routeConfig?.path === 'productos') {
          this.cargarCategorias();

        }
      }
    });
  }

  cargarCategorias(): void {
    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories';
    this.http.get<any[]>(url).subscribe({
      next: (data) => {
        this.categorias = data; // Asigna los datos a la lista de categorías
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      },
    });
  }



  // Métodos del modal de filtro
  cerrarFiltroModal(): void {
    this.cerrarModal.emit(); // Emitir evento para cerrar
  }
  cerrarDeleteModal(): void {
    this.showDeleteModal = false;  // Cerrar el modal
  }

  // Métodos para manejo de modales de categorías
  abrirAgregarCategoriaModal(): void {
    this.agregarCategoriaModalVisible = true;
  }

  cerrarAgregarCategoriaModal(): void {
    this.agregarCategoriaModalVisible = false;
  }

  abrirEditarCategoriaModal(categoria: any): void {
    this.categoriaSeleccionada = categoria;
    this.editarCategoriaModalVisible = true;
  }

  cerrarEditarCategoriaModal(): void {
    this.editarCategoriaModalVisible = false;
  }


  eliminarCategoria(categoriaSeleccionada: any): void {
    if (!categoriaSeleccionada || !categoriaSeleccionada.id) {
      console.error('La categoría seleccionada es inválida o no tiene un ID.');
      return;
    }
  
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories/delete/${categoriaSeleccionada.id}`;
  
    Swal.fire({
      title: 'Eliminando...',
      text: 'Por favor, espera mientras se elimina la categoría.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });
  
    // Configuración de respuesta como texto
    this.http.delete(url, { responseType: 'text' }).subscribe({
      next: (response) => {
        // Verificamos si la respuesta es adecuada (puede ser un mensaje o un código de estado)
        Swal.fire({
          title: 'Categoría Eliminada',
          text: 'La categoría se ha eliminado correctamente.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
  
        // Filtramos la categoría eliminada de la lista
        this.categorias = this.categorias.filter(c => c.id !== categoriaSeleccionada.id);
  
        // Cerramos el modal de eliminación
        this.cerrarDeleteModal();
      },
      error: (err) => {
        // Mensaje de error en caso de falla
        Swal.fire({
          title: 'Error',
          text: 'No se pudo eliminar la categoría. Intenta nuevamente.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
  
        // Consola de errores para depuración
        console.error('Error al eliminar la categoría:', err);
        console.log('Detalles del error:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          message: err.message,
        });
      }
    });
  }
  

}
