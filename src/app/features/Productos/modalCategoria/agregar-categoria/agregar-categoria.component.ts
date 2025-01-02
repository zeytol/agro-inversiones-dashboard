import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export interface Categoria {
  id: number;
  name: string;
  description: string;

  image: string;
}

@Component({
  selector: 'app-agregar-categoria',
  templateUrl: './agregar-categoria.component.html',
  styleUrls: ['./agregar-categoria.component.css']
})
export class AgregarCategoriaComponent {
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() categoriaAgregada: EventEmitter<any> = new EventEmitter();

  nuevaCategoria: Categoria = {
    id: 0,
    name: '',
    description: '',
    image: ''
  };

  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  imageError: string | null = null;

  constructor(private http: HttpClient) {}

  // Método para seleccionar archivo
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Validar tipo de archivo
      if (file.type !== 'image/jpeg' && file.type !== 'image/png') {
        this.imageError = 'Solo se permiten imágenes JPEG o PNG';
        this.selectedFile = null;
        this.imagePreview = null;
        return;
      } else {
        this.imageError = null;
      }

      this.selectedFile = file;

      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }

  // Método para registrar la categoría
  agregarCategoria(): void {
    if (!this.nuevaCategoria.name || !this.nuevaCategoria.description) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    

    const formData = new FormData();
    const categoryData = {
      name: this.nuevaCategoria.name,
      description: this.nuevaCategoria.description,
      image: ''
    };

    formData.append('CatProduct', new Blob([JSON.stringify(categoryData)], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories/register';

    this.http.post(url, formData).subscribe({
      next: (response) => {
        alert('Categoría registrada con éxito.');
        this.categoriaAgregada.emit(response);
        this.resetForm();
        this.cerrar();
      },
      error: (err) => {
        console.error('Error al registrar la categoría:', err);
        alert('Ocurrió un error al registrar la categoría.');
      }
    });
  }

  // Método para resetear el formulario
  resetForm(): void {
    this.nuevaCategoria = {
      id: 0,
      name: '',
      description: '',
      image: ''
    };
    this.selectedFile = null;
    this.imagePreview = null;
    this.imageError = null;
  }

  // Método para cerrar el modal
  cerrar(): void {
    this.cerrarModal.emit();
  }
}
