import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent {
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() agregarProductoEvent: EventEmitter<any> = new EventEmitter();
  @Output() productoAgregado = new EventEmitter<any>();

  nuevoProducto: any = {}; // Para almacenar el nuevo producto
  productos: any[] = []; // Lista de productos

  constructor(private http: HttpClient) { 
    this.cargarProductos();
  }

  // Método para cargar los productos desde el archivo JSON
  cargarProductos() {
    this.http.get<any[]>('assets/data/data.Productos.json').subscribe((productos) => {
      this.productos = productos;

      if (this.productos.length > 0) {
        this.nuevoProducto = { ...this.productos[-1] }; 
      }
    });
  }

  // Método para cerrar el modal
  cerrar() {
    this.cerrarModal.emit();
  }

  // Método para agregar un nuevo producto
  agregarProducto(): void {
    console.log('Producto agregado:', this.nuevoProducto);
  
    // Agregar el nuevo producto al arreglo de productos
    this.productos.push(this.nuevoProducto);
  
    // Emitir el evento para agregar el producto en el componente padre
    this.agregarProductoEvent.emit(this.nuevoProducto);
  
    // Cerrar el modal y limpiar el formulario
    this.cerrar();
    this.nuevoProducto = {}; // Limpiar el formulario
  
    // Emitir el evento de producto agregado
    this.productoAgregado.emit(this.nuevoProducto);
  
    // Simular la actualización de los productos en la consola
    this.actualizarProductosSimulado();
  }
  
  // Método simulado para "guardar" los productos actuales en el cliente
  actualizarProductosSimulado(): void {
    // Aquí imprimimos los productos actuales en consola como simulación
    console.log('Productos actuales:', this.productos);
  }
  
  

  // Método para manejar la selección de un archivo
  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      this.nuevoProducto.imagen = file.name; // Guardar solo el nombre del archivo
    }
  }
}
