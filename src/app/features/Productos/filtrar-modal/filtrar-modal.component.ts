import { Component, Output, EventEmitter, OnInit } from '@angular/core';
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
 // Variables para la notificación
 notificacionVisible: boolean = false;
 notificacionMensaje: string = '';
 notificacionTipo: 'success' | 'error' = 'success'; // 'success' o 'error'

  constructor(
    private categoryService: CategoryProductsService,
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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
    
    this.http.delete(url).subscribe({
      next: () => {
        console.log('Categoría eliminada correctamente.');
        this.categorias = this.categorias.filter(c => c.id !== categoriaSeleccionada.id);
        
        // Mostrar la notificación de éxito
        this.mostrarNotificacion('Categoría eliminada correctamente!', 'success');
      },
      error: (err) => {
        console.error('Error al eliminar la categoría:', err);
        // Mostrar la notificación de error
        this.mostrarNotificacion('Error al eliminar la categoría.', 'error');
        console.log('Detalles del error:', {
          status: err.status,
          statusText: err.statusText,
          url: err.url,
          message: err.message,
        });
      }
    });
  }

  mostrarNotificacion(mensaje: string, tipo: 'success' | 'error'): void {
    this.notificacionMensaje = mensaje;
    this.notificacionTipo = tipo;
    this.notificacionVisible = true;
    
    // Ocultar la notificación después de 3 segundos
    setTimeout(() => {
      this.notificacionVisible = false;
    }, 3000);
  }
}
  

