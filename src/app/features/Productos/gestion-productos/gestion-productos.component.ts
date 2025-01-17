import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CategoryProductsService } from '../../../services/category-products.service';

@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  isSidebarVisible: boolean = true;
  modalVisible: boolean = false;
  filterModalVisible: boolean = false;
  carritoVisible: boolean = false;
  carrito: any[] = [];
  totalCarrito: number = 0;
  precioMinimo: number = 12;
  precioMaximo: number = 500;
  successModalVisible: boolean = false;
  actualizarModalEditar: boolean = false;
  proveedoresSeleccionados: string[] = [];
  editarModalVisible: boolean = false;
  productoSeleccionado: any = {};
  productoVerDetalle: any = {};
  newProduct: any = {};
  categorias: any[] = [];
  productos: any[] = [];
  detallesModalAbierto: boolean = false;
  selectedCategoria: string | null = null;
  productosFiltrados: any[] = [];
  itemsPerPage = 4;
  currentPage = 1;
  filtro: string = '';
  
// Variables para los modales de categorías
agregarCategoriaModalVisible: boolean = false;
editarCategoriaModalVisible: boolean = false;
eliminarCategoriaModalVisible: boolean = false;
categoriaSeleccionada: any = null;

// Métodos para manejar los modales de categorías
abrirAgregarCategoriaModal(): void {
  this.agregarCategoriaModalVisible = true;
}

cerrarAgregarCategoriaModal(): void {
  this.agregarCategoriaModalVisible = false;
}

abrirEditarCategoriaModal(categoria?: any): void {
  this.categoriaSeleccionada = categoria || null;
  this.editarCategoriaModalVisible = true;
}

cerrarEditarCategoriaModal(): void {
  this.editarCategoriaModalVisible = false;
}

abrirEliminarCategoriaModal(categoria?: any): void {
  this.categoriaSeleccionada = categoria || null;
  this.eliminarCategoriaModalVisible = true;
}

cerrarEliminarCategoriaModal(): void {
  this.eliminarCategoriaModalVisible = false;
}
  constructor(
    private http: HttpClient,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService,
    private categoryProductsService: CategoryProductsService
  ) {}

  filtrarPorCategoria(categoria: string) {
    this.selectedCategoria = categoria;
    this.productosFiltrados = this.productos.filter(producto => producto.categoria === categoria);
  }

  mostrarTodosLosProductos() {
    this.selectedCategoria = null;
    this.productosFiltrados = this.productos;
  }

  getCategoriasFiltradas() {
    return this.categorias.filter(categoria =>
      categoria.name.toLowerCase().includes(this.filtro.toLowerCase())
    );
  }

  getPages(): number[] {
    return Array(Math.ceil(this.categorias.length / this.itemsPerPage))
      .fill(0)
      .map((_, i) => i + 1);
  }

  setPage(page: number) {
    this.currentPage = page;
  }

  categoriasPaginadas() {
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.categorias.slice(start, start + this.itemsPerPage);
  }

  @Output() cerrarModal = new EventEmitter<void>();
  @Output() productoAgregado = new EventEmitter<any>();

  abrirModal() {
    this.modalVisible = true;
  }

  cerrar() {
    this.cerrarModal.emit();
  }

  cerrarModals() {
    this.modalVisible = false;
  }

  cerrarSuccessModal() {
    this.successModalVisible = false;
    this.resetForm();
  }

  resetForm() {
    this.newProduct = {
      id: 0,
      name: "string",
      description: "string",
      price: 0,
      amount: 0,
      type: "string",
      image: "string",
      supplierId: 0,
      categoriesProductsId: 0,
      codeProduct: "string",
      salePrice: 0,
      purchasePrice: 0,
      state: "string",
      composicionIsoprothiolane: "string",
      composicionAditivos: "string",
      descuento: 0,
      modelo: "string",
      fechaIngreso: "string",
      ubicacion: "string"
    };
  }

  agregarProducto(): void {
    this.productos.push(this.newProduct);
    this.productoAgregado.emit(this.newProduct);
    this.modalVisible = false;
    this.successModalVisible = true;
    this.newProduct = {};
    this.resetForm();
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      this.newProduct.imagen = file;
    }
  }

  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productoSeleccionado.imagen = URL.createObjectURL(file);
    }
  }

  ngOnInit(): void {
    this.loadProducts();
    this.cargarCategorias();
    this.productosFiltrados = this.productos;
    this.productsService.getProductos().subscribe({
      next: (productos) => {
        this.productos = productos;
        this.productosFiltrados = productos;
        this.productsService.setProductos(productos);
      },
      error: (err) => {
        console.error('Error al cargar productos:', err);
      },
    });
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (this.activatedRoute.snapshot.routeConfig?.path === 'productos') {
          this.cargarCategorias();
          this.loadProducts();
        }
      }
    });
  }

  loadProducts(): void {
    this.productsService.getProductos().subscribe(
      (data) => {
        this.productos = data;
      },
      (error) => {
        console.error('Error loading products', error);
      }
    );
  }

  cargarCategorias() {
    this.categoryProductsService.getcategoryProducts().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
        this.categoryProductsService.setcategoryProducts(categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  abrirFiltroModal() {
    this.filterModalVisible = true;
  }

  cerrarFiltroModal() {
    this.filterModalVisible = false;
  }

  aplicarFiltroModal() {
    this.cerrarFiltroModal();
  }

  abrirEditarModal(producto: any) {
    this.productoSeleccionado = { ...producto };
    this.editarModalVisible = true;
  }

  cerrarEditarModal() {
    this.editarModalVisible = false;
  }

  actualizarProducto(producto: any) {
    this.productos = this.productos.map(p => p.id === producto.id ? producto : p);
    this.mostrarConfirmarModal();
    this.cerrarEditarModal();
  }

  mostrarConfirmarModal() {
    this.actualizarModalEditar = true;
  }

  cerrarConfirmarModal() {
    this.actualizarModalEditar = false;
  }

  realizarPago() {
    console.log("El pago ha sido realizado.");
  }

  abrirCarrito() {
    this.carritoVisible = true;
  }

  cerrarCarritoModal() {
    this.carritoVisible = false;
  }

  calcularTotal() {
    this.totalCarrito = this.carrito.reduce((acc, item) => acc + item.cantidad * parseFloat(item.precio.replace('$', '')), 0);
  }

  aplicarFiltros() {
    console.log('Aplicando filtros:', this.precioMinimo, this.precioMaximo, this.proveedoresSeleccionados);
  }

  // Método para agregar productos al carrito
agregarACarrito(producto: any) {
  const productoEnCarrito = this.carrito.find(prod => prod.id === producto.id);

  if (!producto.salePrice) {
    console.warn(`El producto "${producto.name}" no tiene un precio válido.`);
    return;
  }

  if (productoEnCarrito) {
    productoEnCarrito.cantidad++;
  } else {
    this.carrito.push({ ...producto, cantidad: 1 });
  }
}

  abrirDetallesModal(producto: any) {
    this.productoSeleccionado = producto;
    this.detallesModalAbierto = true;
  }

  cerrarDetallesModal() {
    this.detallesModalAbierto = false;
    this.productoSeleccionado = null;
  }


}