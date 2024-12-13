import { Component, Output, EventEmitter, OnInit  } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { ProductsService } from '../../../services/products.service';
import { CategoryProductsService } from '../../../services/category-products.service';


@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent implements OnInit {
  isSidebarVisible: boolean = true; // Inicializa la propiedad para la barra lateral
  modalVisible: boolean = false; // Estado del modal para agregar productos
  filterModalVisible: boolean = false; // Estado del modal para filtros
  carritoVisible: boolean = false; // Estado del carrito
  carrito: any[] = []; // Asegúrate de que este sea el tipo correcto
  totalCarrito: number = 0; // Inicializa el total del carrito
  precioMinimo: number = 12; // Valor predeterminado
  precioMaximo: number = 500; // Valor predeterminado
  successModalVisible: boolean = false; // Para controlar la visibilidad del modal de éxito
  actualizarModalEditar : boolean = false //Para controlar la visibilidad del modal editar actualizado 
  proveedoresSeleccionados: string[] = []; // Proveedores seleccionados
  editarModalVisible: boolean = false; // Estado del modal de edición
  productoSeleccionado: any = {}; // Producto seleccionado para editar
  productoVerDetalle : any = {} // producto para ver detalles
  newProduct: any = {};  
  constructor( 
    private http: HttpClient,
    private router: Router, 
    private activatedRoute: ActivatedRoute,
    private productsService: ProductsService, 
    private categoryProductsService: CategoryProductsService ) {}

  categorias: any[] = [];
  productos: any[] = [];
  detallesModalAbierto: boolean = false;
// Para Categorías
selectedCategoria: string | null = null; // Almacena la categoría seleccionada
productosFiltrados: any[] = []; // Productos filtrados por categoría

// Método para filtrar productos al hacer clic en una categoría
filtrarPorCategoria(categoria: string) {
  this.selectedCategoria = categoria;
  this.productosFiltrados = this.productos.filter(producto => producto.categoria === categoria);
}


// Método para mostrar todos los productos al deseleccionar la categoría
mostrarTodosLosProductos() {
  this.selectedCategoria = null;
  this.productosFiltrados = this.productos;
}
itemsPerPage = 4;
currentPage = 1;
filtro: string = ''; // Campo para almacenar el criterio de filtro

// Método para obtener las categorías filtradas según el criterio
getCategoriasFiltradas() {
  return this.categorias.filter(categoria =>
    categoria.name.toLowerCase().includes(this.filtro.toLowerCase())
  );
}

// Método para calcular las páginas según las categorías filtradas
getPages(): number[] {
  return Array(Math.ceil(this.categorias.length / this.itemsPerPage))
    .fill(0)
    .map((_, i) => i + 1);
}
// Método para cambiar la página actual
setPage(page: number) {
  this.currentPage = page;
}

// Método para obtener las categorías paginadas según las categorías filtradas
categoriasPaginadas() {
  const start = (this.currentPage - 1) * this.itemsPerPage;
  return this.categorias.slice(start, start + this.itemsPerPage);
}


  @Output() cerrarModal = new EventEmitter<void>();
  @Output() productoAgregado = new EventEmitter<any>();  // Nombre correcto


  abrirModal() {
    this.modalVisible = true; // Abre el modal para agregar productos
  }

  cerrar() {
    this.cerrarModal.emit();
  }
  cerrarModals() {
    
    this.modalVisible = false; // Cierra el modal
  }

  cerrarSuccessModal() {
    this.successModalVisible = false; // Cierra el modal de éxito
    this.resetForm(); // Reinicia el formulario
  }

  resetForm() {
    this.newProduct = {
      "id": 0,
    "name": "string",
    "description": "string",
    "price": 0,
    "amount": 0,
    "type": "string",
    "image": "string",
    "supplierId": 0,
    "categoriesProductsId": 0,
    "codeProduct": "string",
    "salePrice": 0,
    "purchasePrice": 0,
    "state": "string",
    "composicionIsoprothiolane": "string",
    "composicionAditivos": "string",
    "descuento": 0,
    "modelo": "string",
    "fechaIngreso": "string",
    "ubicacion": "string"
    };
  }
  


  agregarProducto(): void {
    // Lógica para agregar el nuevo producto
    console.log('Producto agregado:', this.newProduct);

    // Agregar el nuevo producto a la lista
    this.productos.push(this.newProduct);

    // Emitir el nuevo producto
    this.productoAgregado.emit(this.newProduct);

    // Cierra el modal de agregar producto
    this.modalVisible = false;

    // Muestra el modal de éxito
    this.successModalVisible = true;

    // Limpia el objeto nuevoProducto si es necesario
    this.newProduct = {};

    // Resetea el formulario después de agregar el producto
    this.resetForm();
  }


  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      // Almacena la imagen en `nuevoProducto`
      this.newProduct.imagen = file; // Asumiendo que tienes un campo `imagen` en `nuevoProducto`
    }
    
  }
  onFileSelected2(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productoSeleccionado.imagen = URL.createObjectURL(file);
    }
  }
 
  ngOnInit(): void  {
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


  getCategorias(): Observable<any> {
    return this.http.get('https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories');
  }

 
  // Método para alternar la visibilidad de la barra lateral
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }


  abrirFiltroModal() {
    this.filterModalVisible = true;
  }

  // Método para cerrar el modal
  cerrarFiltroModal() {
    this.filterModalVisible = false;
  }

  // Método para aplicar el filtro (este puede emitir el filtro seleccionado)
  aplicarFiltroModal() {
    // Lógica para aplicar el filtro
    console.log("Filtro aplicado");
    this.cerrarFiltroModal(); // Cerrar el modal después de aplicar el filtro
  }

// Método para abrir el modal de edición y asignar el producto seleccionado
abrirEditarModal(producto: any) {
  this.productoSeleccionado = { ...producto }; // Clona el producto seleccionado
  this.editarModalVisible = true; // Abre el modal de edición
}

// Método para cerrar el modal de edición
cerrarEditarModal() {
  this.editarModalVisible = false;
}

// Método para recibir el producto actualizado desde el modal
actualizarProducto(producto: any) {
  // Lógica para actualizar el producto
  console.log('Producto actualizado:', producto);
  // Aquí puedes llamar a un servicio para actualizar el producto en la base de datos
  this.productos = this.productos.map(p => p.id === producto.id ? producto : p); // Ejemplo para actualizar el producto en el listado
  this.mostrarConfirmarModal();
  this.cerrarEditarModal(); // Cierra el modal de edición
}
mostrarConfirmarModal() {
  this.actualizarModalEditar = true;
}

// Método para cerrar el modal de confirmación
cerrarConfirmarModal() {
  this.actualizarModalEditar = false;
}


  // Método para realizar el pago
  realizarPago() {
    console.log("El pago ha sido realizado.");
    // Implementa más lógica según sea necesario.
  }

 // Método para abrir el carrito
 abrirCarrito() {
  this.carritoVisible = true;
  console.log("El carrito ha sido abierto.");
}

// Método para cerrar el carrito
cerrarCarritoModal() {
  this.carritoVisible = false;
  console.log("El carrito ha sido cerrado.");
}

// Método para actualizar el total
calcularTotal() {
  this.totalCarrito = this.carrito.reduce((acc, item) => acc + item.cantidad * parseFloat(item.precio.replace('$', '')), 0);
}

  aplicarFiltros() {
    // Lógica para aplicar los filtros
    console.log('Aplicando filtros:');
    console.log('Precio mínimo:', this.precioMinimo);
    console.log('Precio máximo:', this.precioMaximo);
    console.log('Proveedores seleccionados:', this.proveedoresSeleccionados);
  }

  // Método para agregar productos al carrito
  agregarACarrito(producto: any) {
    const itemEnCarrito = this.carrito.find(item => item.nombre === producto.nombre);

    if (itemEnCarrito) {
      itemEnCarrito.cantidad++; // Aumenta la cantidad si el producto ya está en el carrito
    } else {
      this.carrito.push({ ...producto, cantidad: 1 }); // Si no está, lo agrega con cantidad 1
    }

    this.actualizarTotal(); // Actualiza el total después de agregar
    console.log(`${producto.nombre} ha sido agregado al carrito.`);
  }

  // Método para incrementar la cantidad de un producto en el carrito
  incrementarCantidad(item: any) {
    const itemEnCarrito = this.carrito.find(carritoItem => carritoItem.nombre === item.nombre);
    
    if (itemEnCarrito) {
      itemEnCarrito.cantidad++; // Incrementa la cantidad del producto
      this.actualizarTotal(); // Actualiza el total después de incrementar
      console.log(`Cantidad de ${item.nombre} incrementada a ${itemEnCarrito.cantidad}.`);
    }
  }

  // Método para decrementar la cantidad de un producto en el carrito
  decrementarCantidad(item: any) {
    if (item.cantidad > 1) {
      item.cantidad--;
      this.actualizarTotal(); // Actualiza el total después de decrementar
    }
  }

  // Método para actualizar el total del carrito
  actualizarTotal() {
    this.totalCarrito = this.carrito.reduce((acc, item) => acc + item.cantidad * parseFloat(item.precio.replace('$', '')), 0);
  }

  // Método para calcular el subtotal del carrito
  subtotal(): number {
    return this.carrito.reduce((acc, item) => {
      const precioSinSimbolo = parseFloat(item.precio.replace('$', '')); // Elimina el símbolo de moneda
      return acc + (precioSinSimbolo * item.cantidad);
    }, 0);
  }



  finalizarCompra() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío. No se puede finalizar la compra.');
      return;
    }

    // Aquí puedes implementar la lógica para finalizar la compra
    console.log('Finalizando compra con los siguientes artículos:', this.carrito);
    // Limpia el carrito después de finalizar la compra
    this.router.navigate(['/ventas']);
    this.carrito = [];
    this.totalCarrito = 0;
    
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
