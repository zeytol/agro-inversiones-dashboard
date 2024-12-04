import { Component, OnInit, Output,EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  productos: any[] = [];
  productosPorPagina: number = 7;
  paginaActual: number = 1;
  totalPaginas: number = 0;
  isAddModalOpen: boolean = false;
  isEditModalOpen = false;
  isViewModalOpen = false;
  productoAVisualizar: any = {};
  filtroNombre: string = '';
  isSidebarVisible: boolean = true; 
  @Output() sidebarToggle = new EventEmitter<void>();

  
  productosJson: any[] = []; // Productos cargados desde JSON
  codigoProducto: string = ''; // Código del producto que se ingresa
  productoSeleccionado: any = null; // Producto seleccionado para agregar a la tabla
  productoAEditar: any = {};


  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.loadProductsFromJson(); // Cargar los productos desde JSON
    this.loadProductsFromLocalStorage();
  }
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; 
    this.sidebarToggle.emit();
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
    this.isViewModalOpen = false;
    this.isEditModalOpen = true;
    this.productoAEditar = { ...producto };  // Uso de spread operator para copiar el objeto
    console.log('Producto a editar: ', this.productoAEditar);
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
    const codigoIngresado = this.codigoProducto.trim().toUpperCase(); // Normalizar el código ingresado
  
    // Verificar si el producto ya está en la lista
    const productoExistente = this.productos.find(
      (producto) => producto.codigo === codigoIngresado
    );
  
    if (productoExistente) {
      // Mostrar alerta si el producto ya está agregado

      Swal.fire({
        title: 'Producto ya agregado',
        text: 'Este producto ya está en la lista.',
        icon: 'info',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#3085d6',
      });
      return; // Detener la ejecución si el producto ya está en la lista
    }
  
    // Buscar el producto en el JSON
    const productoEncontrado = this.productosJson.find(
      (producto) => producto.codigo === codigoIngresado
    );
  
    if (productoEncontrado) {
      // Agregar el producto si no está en la lista y existe en el JSON
      const nuevoProducto = {
        total: productoEncontrado.total,
        nombre: productoEncontrado.nombre,
        codigo: codigoIngresado,
        fechaRegistro: new Date().toISOString(),
        precioUnitario: productoEncontrado.precioUnitario,
        precioTotal: productoEncontrado.precioUnitario * productoEncontrado.total,
      };
      this.productos.push(nuevoProducto); // Agregar el producto
      this.saveProductsToLocalStorage(); // Guardar en el almacenamiento local
      this.closeAddModal(); // Cerrar el modal
      this.calculateTotalPages(); // Recalcular la paginación
      // Mostrar alerta de éxito
    Swal.fire({
      title: 'Producto agregado',
      text: `El producto "${productoEncontrado.nombre}" ha sido agregado exitosamente.`,
      icon: 'success',
      confirmButtonText: 'Aceptar',
      confirmButtonColor: '#28a745',
    });

    this.closeAddModal(); // Cerrar el modal después de agregar
    } else {
      // Mostrar alerta si el producto no se encuentra
      Swal.fire({
        title: 'Código no encontrado',
        text: 'El código ingresado no corresponde a ningún producto.',
        icon: 'error',
        confirmButtonText: 'Aceptar',
        confirmButtonColor: '#d33',
      });
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
    Swal.fire({
      title: '¿Estás seguro que desea eliminar?',
      text: "Esta acción no se puede deshacer",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Eliminar el producto de la lista
        this.productos = this.productos.filter((p) => p !== producto);
        this.calculateTotalPages(); // Actualizar la paginación
        this.saveProductsToLocalStorage(); // Guardar cambios en LocalStorage
        Swal.fire(
          'Eliminado',
          'El producto ha sido eliminado.',
          'success'
        );
      }
    });
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
    if (index !== -1) {
      // Usar spread operator para asegurarse de que no se muten otras propiedades no deseadas
      this.productos[index] = { ...this.productoAEditar }; 
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
