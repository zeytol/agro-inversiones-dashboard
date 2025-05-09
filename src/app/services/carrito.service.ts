import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carritoKey = 'carrito';
  constructor(){}

  setCarrito(items: any[]):void {
    localStorage.setItem(this.carritoKey,JSON.stringify(items));
  }

  getCarrito(): any[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }
  

  /*calcularSubtotal(): number {
    return this.calcularTotal() / 1.18;
  }

  calcularIGV(): number {
    return this.calcularTotal() - this.calcularSubtotal();
  }

  calcularTotal(): number {
    const carrito = this.getCarrito();
    return carrito.reduce((acc, item) => acc + item.cantidad * item.salePrice, 0);

  }*/

  calcularSubtotal(): number {
    const carrito = this.getCarrito();
    // El Subtotal es el precio unitario por la cantidad
    return carrito.reduce((acc, item) => acc + item.cantidad * item.salePrice, 0);
  }
  
  // Método para calcular el IGV (18% del Subtotal)
  calcularIGV(): number {
    return this.calcularSubtotal() * 0.18;  // IGV es el 18% del Subtotal
  }
  
  calcularTotalConIGV(): number {
    return this.calcularSubtotal() + this.calcularIGV();  // Total con IGV: Subtotal + IGV
  }

  calcularTotalSinIGV(): number {
    return this.calcularSubtotal();  // Total sin IGV: Solo el Subtotal
  }

  // Método para calcular el Total (Subtotal + IGV)
  calcularTotal(): number {
    return this.calcularSubtotal() + this.calcularIGV();  // Total es Subtotal más IGV
  }

  agregarProducto(producto: any): void {
    let carrito = this.getCarrito();
    carrito.push(producto);
    localStorage.setItem('carrito', JSON.stringify(carrito));
  }

  // En CarritoService
  actualizarCarrito(carrito: any[]) {
    localStorage.setItem('carrito', JSON.stringify(carrito)); // O el método que estés utilizando para guardar el carrito
  }
  
  eliminarProducto(index: number): void {
    const carrito = this.getCarrito();
    carrito.splice(index, 1); // Elimina el producto en esa posición
    this.setCarrito(carrito); // Actualiza localStorage
  }
  
  // Método para limpiar el carrito
  limpiarCarrito(): void {
    localStorage.removeItem(this.carritoKey); // Elimina el carrito del localStorage
  }
  
  
 
}