import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

  // Llamar a cargar productos cuando el modal se abre
  ngOnInit() {
    this.cargarProductos();
  }

  // Cargar productos desde el archivo JSON
  cargarProductos() {
    this.getProductos().subscribe(data => {
      this.productos = data; 
    });
  }

  // Obtener los productos del archivo JSON
  getProductos() {
    return this.http.get<any[]>('assets/data/data.Productos.json');
  }

  // Cerrar el modal
  cerrarDetallesModal() {
    this.detallesModalAbierto = false;
    this.cerrarModal.emit();
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
  // Abrir el modal de eliminación
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

  // Eliminar el producto
  eliminarProducto() {
    if (this.productoSeleccionado && this.productoSeleccionado.id) {
      console.log('Producto eliminado:', this.productoSeleccionado);
      
      // Eliminar el producto de la lista de productos
      this.productos = this.productos.filter(p => p.id !== this.productoSeleccionado.id);
      
      // Cerrar el modal después de eliminar
      this.cerrarEliminarModal();
      
      // Mostrar un mensaje de éxito
      alert('Producto eliminado correctamente.');
    } else {
      console.error('No se puede eliminar: Producto no válido');
    }
  }
  onActualizarProducto(productoActualizado: any) {
    console.log('Producto actualizado:', productoActualizado);
    // Lógica para actualizar el producto en la base de datos o lista
  }
  
}
