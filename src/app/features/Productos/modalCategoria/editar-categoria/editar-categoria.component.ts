import { Component, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryEditService } from '../../../../services/category-edit.service';
import Swal from 'sweetalert2';

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

  constructor(
    private http: HttpClient,
    private categoryEditService: CategoryEditService
  ) { }

  ngOnInit(): void {
    // Mostrar la imagen actual o una por defecto si no existe
    if (this.categoriaSeleccionada.image && this.categoriaSeleccionada.image !== '') {
      this.imagePreview = this.categoriaSeleccionada.image;
    } else {
      this.imagePreview = 'ruta_por_defecto'; // Cambia esto por una imagen por defecto si lo deseas
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
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
    const datosCategoria: any = {
      name: this.categoriaSeleccionada.name,
      description: this.categoriaSeleccionada.description,
      image: this.selectedFile ? '' : this.categoriaSeleccionada.image  // envía la URL si no hay nueva imagen
    };
  
    const formData = new FormData();
    formData.append(
      'CatProduct',
      new Blob([JSON.stringify(datosCategoria)], { type: 'application/json' })
    );
  
    // Solo agregamos el archivo de imagen si hay una nueva seleccionada
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    Swal.fire({
      title: 'Editando categoría...',
      html: 'Por favor, espera mientras se completa el registro.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });
  
    this.categoryEditService.editarCategoria(
      this.categoriaSeleccionada.id,
      formData
    ).subscribe({
      next: (response) => {
        Swal.fire({
          title: 'Categoría editada',
          text: 'La categoría se ha editado con éxito.',
          icon: 'success',
          confirmButtonText: 'Aceptar'
        }).then(() => {
          window.location.reload();
        });
        this.categoriaEditada.emit(this.categoriaSeleccionada);
      },
      error: (error) => {
        console.error('Error al actualizar la categoría:', error);
        Swal.fire({
          title: 'Error',
          text: 'No se pudo editar la categoría.',
          icon: 'error',
          confirmButtonText: 'Reintentar'
        });
      }
    });
  }  

  cerrarEditarCategoriaModal(): void {
    this.cerrarModal.emit();
  }
}
