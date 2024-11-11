import { Component, Output, EventEmitter  } from '@angular/core';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent {
  modalVisible: boolean = false; // Estado del modal para agregar productos
  successModalVisible: boolean = false; // Para controlar la visibilidad del modal de éxito
  nuevoProducto: any = {};  
  // Método para alternar la visibilidad de la barra lateral
  @Output() cerrarModal = new EventEmitter<void>();

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
