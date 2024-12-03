import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productosPorPagina: number = 12;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  isAddModalOpen: boolean = false;
  isEditModalOpen = false;
  isViewModalOpen = false;
  productoAVisualizar: any = {};
  filtroNombre: string = '';

  productosJson: any[] = []; // Productos cargados desde JSON
  codigoProducto: string = ''; // Código del producto que se ingresa
  productoSeleccionado: any = null; // Producto seleccionado para agregar a la tabla
  productoAEditar: any = {};


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductsFromJson(); // Cargar los productos desde JSON
    this.loadProductsFromLocalStorage();
  }
  loadProductsFromLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {  // Verifica que estamos en un navegador
      const productosGuardados = localStorage.getItem('productos');
      if (productosGuardados) {
        this.productos = JSON.parse(productosGuardados);
        this.calculateTotalPages();
      }
    }
  }
  

  // Cargar productos desde el archivo JSON
  loadProductsFromJson(): void {
    this.http.get<any[]>('assets/data.json').subscribe(
      (data) => {
        this.productosJson = data;
        this.calculateTotalPages();
      },
      (error) => console.error('Error cargando productos:', error)
    );
  }
   // Método para filtrar productos según el nombre
   getProductosFiltrados(): any[] {
    return this.productos
      .filter((producto) => 
        producto.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase())
      )
      .slice(
        (this.paginaActual - 1) * this.productosPorPagina,
        this.paginaActual * this.productosPorPagina
      );
  }
  editProduct(producto: any) {
    this.isViewModalOpen=false;
    this.isEditModalOpen = true;
    this.productoAEditar = JSON.parse(JSON.stringify(producto));
    console.log('Producto editado: ', this.productoAEditar);
  }
  openAddModal(){
    this.isAddModalOpen = true;
    this.codigoProducto = '';
  }
  closeAddModal(){
    this.isAddModalOpen = false;
  }

  // Agregar un producto por su código
  confirmarCodigo() {
    const productoExistente = this.productos.find(
      (producto) => producto.codigo === this.codigoProducto.trim().toUpperCase()
    );
  
    if (!productoExistente) {
      const productoEncontrado = this.productosJson.find(
        (producto) => producto.codigo === this.codigoProducto.trim().toUpperCase()
      );
      if (productoEncontrado) {
        const nuevoProducto = {
          total: productoEncontrado.total,
          nombre: productoEncontrado.nombre,
          fechaRegistro: new Date().toISOString(),
          precioUnitario: productoEncontrado.precioUnitario,
          precioTotal: productoEncontrado.precioUnitario * productoEncontrado.total
        };
        this.productos.push(nuevoProducto);
        this.saveProductsToLocalStorage(); // Guardamos después de agregar el producto
        this.closeAddModal();
        this.calculateTotalPages();
      } else {
        alert('Producto no encontrado');
      }
    } else {
      alert('Este producto ya está en la lista');
    }
  }
  
  saveProductsToLocalStorage(): void {
    if (typeof window !== 'undefined' && window.localStorage) {
      localStorage.setItem('productos', JSON.stringify(this.productos));
    }
  }
  

  // Calcular el total de páginas para la paginación
  calculateTotalPages(): void {
    this.totalPaginas = Math.ceil(this.productos.length / this.productosPorPagina);
  }

  // Obtener los productos para mostrar solo los de la página actual
  getProductosPorPagina(): any[] {
    const startIndex = (this.paginaActual - 1) * this.productosPorPagina;
    const endIndex = startIndex + this.productosPorPagina;
    return this.productos.slice(startIndex, endIndex);
  }

  // Eliminar un producto de la tabla
  deleteProduct(producto: any) {
    this.productos = this.productos.filter((p) => p !== producto);
    this.calculateTotalPages();
  }

  // Ver información de un producto
  viewProduct(producto: any): void {
    this.isEditModalOpen=false;
    this.productoAVisualizar = { ...producto};
    this.isViewModalOpen = true;
    ;
  }
  closeViewModal():void{
    this.isViewModalOpen = false;
  }

  closeEditModal(){
    this.isEditModalOpen = false;
  }
  updatePriceTotal(){
    const total = this.productoAEditar.total || 0;
  const precioUnitario = this.productoAEditar.precioUnitario || 0;
  this.productoAEditar.precioTotal = total * precioUnitario;
  }
  updateProduct() {
    const index = this.productos.findIndex(p => p.codigo === this.productoAEditar.codigo);
    console.log('Index encontrado:', index);
    if (index !== -1) {
      console.log('Producto antes de actualizar:', this.productos[index]);
      this.productos[index] = { ...this.productoAEditar };
      console.log('Producto actualizado:', this.productos[index]);
      this.saveProductsToLocalStorage();
      this.calculateTotalPages();
      this.isEditModalOpen = false;
    }
  }
  
  // Navegar a la página anterior
  prevPage() {
    if (this.paginaActual > 1) {
      this.paginaActual--;
    }
  }

  // Navegar a la página siguiente
  nextPage() {
    if (this.paginaActual < this.totalPaginas) {
      this.paginaActual++;
    }
  }
}
