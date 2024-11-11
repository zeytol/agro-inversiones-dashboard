import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';




@Component({
  selector: 'app-gestion-productos',
  templateUrl: './gestion-productos.component.html',
  styleUrls: ['./gestion-productos.component.css']
})
export class GestionProductosComponent {
  isSidebarVisible: boolean = false; // Inicializa la propiedad para la barra lateral
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
  nuevoProducto: any = {};  
  constructor(private http: HttpClient,private router: Router) {}
  

  categorias: any[] = [];
  productos: any[] = [];

  mostrarModalAgregarProducto: boolean = false;

  abrirModalAgregarProducto() {
    this.mostrarModalAgregarProducto = true; // Esto debería mostrar el modal
  }

  cerrarModalAgregarProducto() {
    this.mostrarModalAgregarProducto = false; // Esto debería ocultar el modal
  }
  ngOnInit() {
    this.cargarCategorias();
    this.cargarProductos();
  }

  cargarCategorias() {
    this.getCategorias().subscribe(data => {
      this.categorias = data;
    });
  }

  cargarProductos() {
    this.getProductos().subscribe(data => {
      this.productos = data;
    });
  }

  getCategorias(): Observable<any> {
    return this.http.get('assets/data/data.Categorias.json');
  }

  getProductos(): Observable<any> {
    return this.http.get('assets/data/data.Productos.json');
  }

  // Método para alternar la visibilidad de la barra lateral
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  abrirModal() {
    this.modalVisible = true; // Abre el modal para agregar productos
  }

  cerrarModal() {
    
    this.modalVisible = false; // Cierra el modal
  }

  abrirFiltroModal() {
    this.filterModalVisible = true; // Abre el modal para aplicar filtros
  }

  cerrarFiltroModal() {
    this.filterModalVisible = false; // Cierra el modal de filtros
    
  }

  // Método para abrir el modal de edición y asignar el producto seleccionado
  abrirEditarModal(producto: any) {
    this.productoSeleccionado = { ...producto }; // Clona el producto seleccionado
    this.editarModalVisible = true;
  }

  // Método para cerrar el modal de edición
  cerrarEditarModal() {
    this.editarModalVisible = false;
  }

  cerrarSuccessModal() {
    this.successModalVisible = false; // Cierra el modal de éxito
    this.resetForm(); // Reinicia el formulario
    this.actualizarModalEditar = false;
  }

  resetForm() {
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      costoPrecio: 0,
      ventaPrecio: 0,
      stock: 0,
      imagen: '',
      categoria: '',
      descuento: 0,
    };
  }

  // Método para editar el producto
  editarProducto() {
    // Aquí debes implementar la lógica para actualizar el producto en tu servicio
    console.log('Producto actualizado:', this.productoSeleccionado);
    this.modalVisible = false;

    // Simular un éxito en la actualización
    this.actualizarModalEditar = true; // Muestra el modal de éxito

    // Cerrar el modal de editar después de un tiempo (opcional)
    setTimeout(() => {
      this.cerrarEditarModal();
      this.actualizarModalEditar = false; // Oculta el modal de éxito después de cerrarlo
    }, 1000); // Cerrar después de 2 segundos, puedes ajustar este tiempo
    this.resetForm();
  }

  // Método para realizar el pago
  realizarPago() {
    console.log("El pago ha sido realizado.");
    // Implementa más lógica según sea necesario.
  }

  // Método para cerrar el carrito
  cerrarCarrito() {
    this.carritoVisible = false; // Cambia el estado del carrito a no visible
    console.log("El carrito ha sido cerrado."); // Mensaje de cierre
  }

  abrirCarrito() {
    this.carritoVisible = true; // Cambia el estado del carrito a visible
    console.log("El carrito ha sido abierto."); // Mensaje de apertura
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

  agregarProducto() {
    // Lógica para agregar el nuevo producto
    console.log('Producto agregado:', this.nuevoProducto);

    // Cierra el modal de agregar producto
    this.modalVisible = false;

    // Muestra el modal de éxito
    this.successModalVisible = true;

    // Limpia el objeto nuevoProducto si es necesario
    this.nuevoProducto = {};
    
    // Resetea el formulario después de agregar el producto
    this.resetForm();
  }
  

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    if (file) {
      console.log('Archivo seleccionado:', file);
      // Almacena la imagen en `nuevoProducto`
      this.nuevoProducto.imagen = file; // Asumiendo que tienes un campo `imagen` en `nuevoProducto`
    }
  }
}
