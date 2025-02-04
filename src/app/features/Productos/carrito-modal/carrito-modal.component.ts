import { Component, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { CarritoService } from '../../../shared/carrito.service';

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.css']
})
export class CarritoModalComponent {  
  @Input() carrito: any[] = []; // Lista de productos en el carrito
  @Input() totalCarrito: number = 0; // Total calculado del carrito
  @Output() cerrarCarritoModal = new EventEmitter<void>(); // Evento para cerrar el modal
  @Output() carritoActualizado = new EventEmitter<any[]>(); // Evento para actualizar el carrito en el componente padre

  carritoVisible: boolean = true;

  constructor(private router: Router, private cdr: ChangeDetectorRef,    private carritoService: CarritoService
  ) {}

  // Cerrar el modal del carrito
  cerrarCarrito() {
    this.cerrarCarritoModal.emit();
  }

  // Incrementar cantidad de un producto
  incrementarCantidad(producto: any) {
    producto.cantidad++;
    this.actualizarTotal();
  }

  // Decrementar cantidad de un producto
  decrementarCantidad(producto: any) {
    if (producto.cantidad > 1) {
      producto.cantidad--;
      this.actualizarTotal();
    } else {
      this.eliminarProducto(producto);
    }
  }

  // Eliminar producto del carrito
  eliminarProducto(producto: any) {
    const index = this.carrito.indexOf(producto);
    if (index > -1) {
      this.carrito.splice(index, 1); 
      this.actualizarTotal();
      this.carritoActualizado.emit(this.carrito); // Notificar cambios al componente padre
    }
  }

  // Calcular subtotal
  subtotal(): number {
    return this.carrito.reduce((acc, producto) => {
      const precio = parseFloat(producto.salePrice || '0'); // Asegurar que el precio es un número
      return acc + precio * producto.cantidad;
    }, 0);
  }

  // Actualizar total del carrito
  actualizarTotal() {
    this.totalCarrito = this.subtotal();
    this.carritoActualizado.emit(this.carrito); // Notificar cambios al total
  }

  realizarCompra() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    alert(`Compra realizada con éxito. Total: S/. ${this.totalCarrito.toFixed(2)}`);

    // Guardar los productos seleccionados en el servicio
    this.carritoService.setProductos(this.carrito);

    // Reiniciar el carrito
  
    this.carritoActualizado.emit(this.carrito);

    // Navegar a la página de ventas
    this.router.navigate(['/ventas']);
  }
}
