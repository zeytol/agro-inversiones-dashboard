import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private carrito: any[] = [];

  setCarrito(items: any[]) {
    this.carrito = items;
  }

  getCarrito(): any[] {
    return this.carrito;
  }

  calcularSubtotal(): number {
    return this.calcularTotal() / 1.18;
  }

  calcularIGV(): number {
    return this.calcularTotal() - this.calcularSubtotal();
  }

  calcularTotal(): number {
    return this.carrito.reduce((acc, item) => acc + item.cantidad * item.salePrice, 0);
  }
}
