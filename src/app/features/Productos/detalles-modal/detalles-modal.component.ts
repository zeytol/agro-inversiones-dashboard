import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-detalles-modal',
  templateUrl: './detalles-modal.component.html',
  styleUrls: ['./detalles-modal.component.css']
})
export class DetallesModalComponent implements OnInit {
  productos: any[] = [];

  @Input() producto: any = {};  // Producto recibido desde el componente principal
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() actualizarProducto = new EventEmitter<any>(); // Evento para emitir producto actualizado
  @Input() verDetalleVisible: boolean = true; // Visibilidad del modal
  @Output() eliminarProductoEvento = new EventEmitter<number>();
  eliminarModalAbierto: boolean = false;
  editarModalVisible: boolean = false;
  detallesModalAbierto: boolean = true;
  productoSeleccionado: any = {};

  constructor(private productsService: ProductsService) {}  // Usamos el servicio ProductsService

  // Llamar a cargar productos cuando el modal se abre
  ngOnInit() {
    this.cargarProductos();
  }

  // Cargar productos usando el servicio
  cargarProductos() {
    this.productsService.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  // Método para abrir el modal de edición
  abrirEditarModal(producto: any) {
    this.productoSeleccionado = { ...producto }; // Clona el producto seleccionado
    this.editarModalVisible = true; // Abre el modal de edición
  }

  // Método para cerrar el modal de edición
  cerrarEditarModal() {
    this.editarModalVisible = false;
  }

  // Método para actualizar el producto
  guardarProductoEditado() {
    this.actualizarProducto.emit(this.productoSeleccionado); // Emitir el producto actualizado
    this.cerrarEditarModal(); // Cierra el modal después de actualizar
  }

  // Método para eliminar un producto
  abrirEliminarModal(producto: any) {
    this.productoSeleccionado = producto;
    this.eliminarModalAbierto = true;
  }

  // Método para determinar el estado basado en el stock
  getEstadoPorStock(stock: number): string {
    return stock >= 1 ? 'disponible' : 'no disponible';
  }

  // Método para asignar clases dinámicas según el stock
  getClasePorStock(stock: number): string {
    return stock >= 1 ? 'bg-green-600' : 'bg-red-600';
  }

  // Cerrar el modal de eliminación
  cerrarEliminarModal() {
    this.eliminarModalAbierto = false;
    this.productoSeleccionado = {}; // Limpiar el producto seleccionado
  }

  // Eliminar el producto usando el servicio
  eliminarProducto() {
    if (this.productoSeleccionado && this.productoSeleccionado.id) {
      this.productsService.eliminarProducto(this.productoSeleccionado.id).subscribe({
        next: (response) => {
          // Maneja la respuesta del mensaje como texto
          console.log('Respuesta de la eliminación:', response);
  
          // Opcional: Si quieres actualizar la lista de productos sin recargar
          this.productos = this.productos.filter(p => p.id !== this.productoSeleccionado.id);
  
          // Recarga los productos desde el servidor
          this.cargarProductos();
  
          // Cierra el modal de eliminación
          this.cerrarEliminarModal();
  
          // Muestra el mensaje de éxito
          alert(response); // Aquí el mensaje que viene de la API
  
          // Refresca la página
          window.location.reload(); // Recarga la página para asegurarte de que se refleja la eliminación
        },
        error: (error) => {
          console.error('Error al eliminar el producto:', error);
          alert('No se pudo eliminar el producto. Por favor, inténtalo nuevamente.');
        }
      });
    }
  }

  cerrarDetallesModal() {
    this.cerrarModal.emit();  // Emitir el evento para cerrar el modal
  }

  // Método que se invoca cuando un producto es actualizado
  onActualizarProducto(productoActualizado: any) {
    console.log('Producto actualizado:', productoActualizado);
    // Lógica para actualizar el producto en la base de datos o lista
  }
}