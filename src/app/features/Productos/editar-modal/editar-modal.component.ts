import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent {
  @Input() productoSeleccionado: any; 
  @Input() editarModalVisible: boolean = false;
  @Output() cerrarModal = new EventEmitter<void>(); 
  @Output() productoEditado = new EventEmitter<any>(); 

  selectedFile: File | null = null; 
  imagePreview: string | ArrayBuffer | null = null; 
  constructor(private productsService: ProductsService) {}

  // Método para cerrar el modal
  cerrarEditarModal(): void {
    this.cerrarModal.emit(); // Notifica al padre que se cerró el modal
  }

  ngOnInit() {
    if (this.productoSeleccionado?.image) {
      this.imagePreview = this.productoSeleccionado.image;
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];


      // Genera la vista previa de la imagen seleccionada
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

  // Método para editar el producto
  editarProducto(): void {

    // Validación básica de campos requeridos
    if (!this.productoSeleccionado.name || 
        !this.productoSeleccionado.description || 
        !this.productoSeleccionado.codeProduct) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    // Llama al servicio para editar el producto
    this.productsService.editarProducto(this.productoSeleccionado.id, this.productoSeleccionado, this.selectedFile).subscribe({
      next: (response: string) => {
        console.log('Respuesta del servidor:', response);

        this.productoEditado.emit(this.productoSeleccionado);

        // Cierra el modal tras éxito
        this.cerrarEditarModal();
      },
      error: (error) => {
        console.error('Error al editar el producto:', error);

      }
    });
  }
  
}
