import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent {
  @Input() productoSeleccionado: any; // Producto pasado desde el componente principal
  @Input() editarModalVisible: boolean = false; // Visibilidad del modal
  @Output() cerrarModal = new EventEmitter<void>(); // Emitir evento para cerrar el modal
  @Output() actualizarProducto = new EventEmitter<any>(); // Emitir evento para actualizar el producto
  actualizarModalEditar : boolean = false

  // Método para cerrar el modal de edición
  cerrarEditarModal() {
    this.cerrarModal.emit(); // Emitir evento de cierre
  }

  // Método para editar el producto
  editarProducto() {
    this.actualizarProducto.emit(this.productoSeleccionado); // Emitir el producto actualizado
    this.cerrarEditarModal(); // Cerrar el modal después de actualizar
  }

  // Manejar la selección de una imagen
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productoSeleccionado.imagen = URL.createObjectURL(file);
    }
  }
  mostrarConfirmarModal() {
    this.actualizarModalEditar = true;
  }
  
  // Método para cerrar el modal de confirmación
  cerrarConfirmarModal() {
    this.actualizarModalEditar = false;
  }
}
