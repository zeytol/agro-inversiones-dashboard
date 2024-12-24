import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editar-modal',
  templateUrl: './editar-modal.component.html',
  styleUrls: ['./editar-modal.component.css']
})
export class EditarModalComponent {
  @Input() productoSeleccionado: any; // Producto pasado desde el componente principal
  @Input() editarModalVisible: boolean = false; // Visibilidad del modal
  @Output() cerrarModal = new EventEmitter<void>(); // Emitir evento para cerrar el modal
  @Output() productoEditado = new EventEmitter<any>(); // Emitir el producto editado
  
  selectedFile: any = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productService: ProductsService, private http: HttpClient) {}

  // Método para cerrar el modal
  cerrarEditarModal(): void {
    this.cerrarModal.emit();
  }

  // Método para manejar la selección de archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;

      // Crear vista previa de la imagen
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para enviar el producto editado
  editarProducto(): void {
    if (!this.productoSeleccionado.name || !this.productoSeleccionado.description || !this.productoSeleccionado.codeProduct) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }

    const formData = new FormData();
    // Es importante que el nombre del campo coincida exactamente con lo que espera el backend
    formData.append('products', new Blob([JSON.stringify(this.productoSeleccionado)], {
      type: 'application/json'
    }));
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/edit/${this.productoSeleccionado.id}`;

    this.http.put(url, formData, {
      observe: 'response',
      responseType: 'json'
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta completa:', response);
        if (response.status === 200) { // OK
          console.log('Producto editado con éxito');
          this.productoEditado.emit(this.productoSeleccionado);
          this.cerrarEditarModal();
        }
      },
      error: (err) => {
        console.error('Error completo:', err);
        console.error('Error al editar el producto:', err.message);
      }
    });
  }
}
