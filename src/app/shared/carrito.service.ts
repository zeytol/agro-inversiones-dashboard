import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CarritoService {
  private productosSeleccionados: any[] = [];

  constructor() {}

  setProductos(productos: any[]) {
    this.productosSeleccionados = productos;
  }

  getProductos(): any[] {
    return this.productosSeleccionados;
  }
}
