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

  nuevoProducto: any = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    amount: 0,
    type: '',
    image: '',
    supplierId: 0,
    categoriesProductsId: 0,
    codeProduct: '',
    salePrice: 0,
    purchasePrice: 0,
    state: '',
    composicionIsoprothiolane: '',
    composicionAditivos: '',
    descuento: 0,
    modelo: '',
    fechaIngreso: '',
    ubicacion: ''
  }; 
  productos: any[] = []; // Lista de productos

  constructor(private http: HttpClient) { 
    this.agregarProducto();
  }

  // Método para cargar los productos desde el archivo JSON
  registrarProducto(producto: any) {
    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/register';
  
    this.http.post<any>(url, producto).subscribe({
      next: (response) => {
        console.log('Producto registrado con éxito:', response);
        this.productos.push(response); // Agrega el producto registrado a la lista local
      },
      error: (err) => {
        console.error('Error al registrar el producto:', err);
      }
    });
  }

  // Método para cerrar el modal
  cerrar() {
    this.cerrarModal.emit();
  }

  // Método para agregar un nuevo producto
  // agregarProducto(): void {
  //   console.log('Producto agregado:', this.nuevoProducto);
  
  //   // Agregar el nuevo producto al arreglo de productos
  //   this.productos.push(this.nuevoProducto);
  
  //   // Emitir el evento para agregar el producto en el componente padre
  //   this.agregarProductoEvent.emit(this.nuevoProducto);
  
  //   // Cerrar el modal y limpiar el formulario
  //   this.cerrar();
  //   this.nuevoProducto = {}; // Limpiar el formulario
  
  //   // Emitir el evento de producto agregado
  //   this.productoAgregado.emit(this.nuevoProducto);
  
  //   // Simular la actualización de los productos en la consola
  //   this.actualizarProductosSimulado();
  // }
  agregarProducto(): void {
    if (!this.nuevoProducto.name || !this.nuevoProducto.description || !this.nuevoProducto.codeProduct) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/register';
  
    this.http.post<any>(url, this.nuevoProducto).subscribe({
      next: (response) => {
        console.log('Producto registrado con éxito:', response);
        this.productos.push(response); // Actualiza la lista local
        this.nuevoProducto = {}; // Limpia el formulario
        this.cerrar(); // Cierra el modal
      },
      error: (err) => {
        console.error('Error al registrar el producto:', err);
      }
    });
  }
  
  
  // Método simulado para "guardar" los productos actuales en el cliente
  actualizarProductosSimulado(): void {
    // Aquí imprimimos los productos actuales en consola como simulación
    console.log('Productos actuales:', this.productos);
  }
  
  
onFileSelected(event: any): void {
  const file: File = event.target.files[0];
  if (file) {
    console.log('Archivo seleccionado:', file);
    
    this.nuevoProducto.image = file.name;
  }
}
}