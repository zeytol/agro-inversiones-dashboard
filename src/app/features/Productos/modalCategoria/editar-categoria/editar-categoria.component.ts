import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryProductsService } from '../../../../services/category-products.service';

export interface Categoria {
  id: number;
  name: string;
  description: string;
  image: string;
}

@Component({
  selector: 'app-editar-categoria',
  templateUrl: './editar-categoria.component.html',
  styleUrls: ['./editar-categoria.component.css']
})
export class EditarCategoriaComponent {
  @Input() categoriaSeleccionada!: Categoria;  
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();  
  @Output() categoriaEditada: EventEmitter<Categoria> = new EventEmitter();  

  selectedFile: any = null; 
  imagePreview: string | ArrayBuffer | null = null;  

  constructor(private http: HttpClient, private categoryProductsService: CategoryProductsService) {}

  ngOnInit(): void {
    // Verifica si la categoría tiene imagen y se muestra una imagen predeterminada si no tiene imagen
    if (this.categoriaSeleccionada.image && this.categoriaSeleccionada.image !== '') {
      this.imagePreview = this.categoriaSeleccionada.image;
    } else {
      this.imagePreview = 'ruta_por_defecto'; // Cambia esto por una imagen predeterminada si no hay imagen
    }
  }

  // Manejo de archivo de imagen seleccionado
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      // Verifica el tipo de archivo (si es una imagen válida)
      if (file.type === 'image/jpeg' || file.type === 'image/png') {
        this.selectedFile = file;

        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        reader.readAsDataURL(file);
      } else {
        alert('Por favor, selecciona una imagen válida (JPEG o PNG)');
      }
    }
  }

  editarCategoria(): void {
    // Validación de campos
    if (!this.categoriaSeleccionada.name || !this.categoriaSeleccionada.description) {
      console.error('Por favor, completa todos los campos obligatorios.');
      alert('Todos los campos son obligatorios');
      return;
    }

    const formData = new FormData();
    
    // Si se seleccionó una nueva imagen, la usamos, si no, usamos la imagen actual de la categoría
    const categoriaData = {
      name: this.categoriaSeleccionada.name,
      description: this.categoriaSeleccionada.description,
      image: this.selectedFile ? this.imagePreview : this.categoriaSeleccionada.image,
    };
  
    console.log('Categoría a editar:', categoriaData);
    formData.append('category', new Blob([JSON.stringify(categoriaData)], { type: 'application/json' }));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories/edit/${this.categoriaSeleccionada.id}`;

    // Realiza la solicitud PUT al backend
    this.http.put(url, formData, {
      observe: 'response',
      responseType: 'json'
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta:', response);
        if (response.status === 200 || response.status === 201) {
          this.categoriaEditada.emit(response.body);
          this.cerrarEditarCategoriaModal();
        } else {
          // Si la respuesta no es 200 o 201, mostramos un mensaje de error
          alert('Error al editar la categoría');
        }
      },
      error: (err) => {
        console.error('Error completo:', err);
        if (err.status === 400) {
          alert('Hubo un error al editar la categoría. Verifica los datos.');
        } else {
          alert('Error inesperado. Intenta nuevamente más tarde.');
        }
      }
    });
  }

  cerrarEditarCategoriaModal(): void {
    this.cerrarModal.emit();
  }
}
