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
  private porcentajeIGV: number = 0;

  setPorcentajeIGV(valor: number): void {
    this.porcentajeIGV = valor;
  }
  
  getCarrito(): any[] {
    const carrito = localStorage.getItem(this.carritoKey);
    return carrito ? JSON.parse(carrito) : [];
  }
  

  calcularSubtotal(): number {
    return this.calcularTotal() / 1.18;
  }

  calcularIGV(): number {
    return this.calcularTotal() - this.calcularSubtotal();
  }

  calcularTotal(): number {
    const carrito = this.getCarrito();
    return carrito.reduce((acc, item) => acc + item.cantidad * item.salePrice, 0);
  }
  eliminarProducto(index: number): void {
    const carrito = this.getCarrito();
    carrito.splice(index, 1); // Elimina el producto en esa posición
    this.setCarrito(carrito); // Actualiza localStorage
  }
  
  
 
}
