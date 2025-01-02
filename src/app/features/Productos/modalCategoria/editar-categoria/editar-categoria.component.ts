import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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

  constructor(private http: HttpClient) {}

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
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/categories/edit/${this.categoriaSeleccionada.id}`;

    const formData = new FormData();
    formData.append('CatProduct', new Blob([JSON.stringify({
      name: this.categoriaSeleccionada.name,
      description: this.categoriaSeleccionada.description,
      image: '' // Se puede incluir la imagen si se sube
    })], { type: 'application/json' }));

    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }

    // Enviar los datos con multipart/form-data
    this.http.put(url, formData).subscribe({
      next: (response) => {
        alert('Categoría actualizada con éxito');
        this.categoriaEditada.emit(this.categoriaSeleccionada);
      },
      error: (error) => {
        console.error('Error al actualizar la categoría:', error);
        alert('Error al actualizar la categoría');
      }
    });
  }

  cerrarEditarCategoriaModal(): void {
    this.cerrarModal.emit();
  }
}
