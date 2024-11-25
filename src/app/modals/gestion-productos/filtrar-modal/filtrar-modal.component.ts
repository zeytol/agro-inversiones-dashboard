import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-filtrar-modal',
  templateUrl: './filtrar-modal.component.html',
  styleUrls: ['./filtrar-modal.component.css']
})
export class FiltrarModalComponent {
  @Output() cerrarModal = new EventEmitter<void>(); // Emitir evento para cerrar el modal
  @Output() aplicarModal = new EventEmitter<any>(); // Emitir evento para aplicar el filtro con datos
  filterModalVisible: boolean = true;
  // Variables para almacenar los filtros seleccionados
  precio: number = 12; // Valor inicial para el precio
  proveedor: string = ''; // Valor inicial para el proveedor
  categorias: string[] = []; // Array para almacenar las categorías seleccionadas
  plaga: string = ''; // Valor inicial para la plaga/objetivo

  // Método para cerrar el modal
  cerrarFiltroModal() {
    this.cerrarModal.emit(); // Emitir evento para cerrar el modal
  }

  // Método para aplicar el filtro
  aplicarFiltroModal() {
    // Emitir evento con los valores de los filtros
    this.aplicarModal.emit({
      precio: this.precio,
      proveedor: this.proveedor,
      categorias: this.categorias,
      plaga: this.plaga
    });
  }

  // Método para manejar el cambio en las categorías seleccionadas
  onCategoriaChange(categoria: string, event: any) {
    if (event.target.checked) {
      this.categorias.push(categoria); // Añadir categoría al array
    } else {
      this.categorias = this.categorias.filter(c => c !== categoria); // Eliminar categoría del array
    }
  }
}
