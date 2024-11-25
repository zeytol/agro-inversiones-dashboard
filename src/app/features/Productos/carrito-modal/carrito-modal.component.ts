import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent {
  @Input() carrito: any[] = []; // Recibe el carrito desde el componente padre
  @Input() totalCarrito: number = 0; // Recibe el total del carrito desde el componente padre
  @Output() cerrarCarritoModal = new EventEmitter<void>(); // Emite evento para cerrar el modal
  carritoVisible: boolean = true// Método para cerrar el carrito
  constructor(private router: Router) {}
  cerrarCarrito() {
    this.cerrarCarritoModal.emit(); // Emite el evento para cerrar el carrito
  }
  aceptarCarrito() {
    this.router.navigate(['/ventas']); // Redirige a la ruta '/ventas'
    console.log("Carrito cerrado y redirigido a /ventas");
  }

  // Método para eliminar un producto del carrito
  eliminarProducto(producto: any) {
    // Elimina el producto utilizando el nombre del producto
    this.carrito = this.carrito.filter(item => item.nombre !== producto.nombre);
    this.actualizarTotal(); // Actualiza el total después de eliminar
    console.log(`Producto con nombre "${producto.nombre}" eliminado`);
  }

  // Método para actualizar el total
calcularTotal() {
  this.totalCarrito = this.carrito.reduce((acc, item) => acc + item.cantidad * parseFloat(item.precio.replace('$', '')), 0);
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
}
