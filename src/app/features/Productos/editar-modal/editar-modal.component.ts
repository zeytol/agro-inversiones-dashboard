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
  ngOnInit() {
    if (this.productoSeleccionado?.image) {
      this.imagePreview = this.productoSeleccionado.image;
    }
  }
  //Método para manejar la selección de archivo
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
    // Verificar que todos los campos obligatorios estén completados
    if (!this.productoSeleccionado.name || !this.productoSeleccionado.description || !this.productoSeleccionado.codeProduct) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const formData = new FormData();
    
    // Preparar los datos del producto
    const productoData = {
      image: this.productoSeleccionado.image,
      name: this.productoSeleccionado.name,
      description: this.productoSeleccionado.description,
      price: this.productoSeleccionado.price,
      amount: this.productoSeleccionado.amount,
      type: this.productoSeleccionado.type,
      supplierId: this.productoSeleccionado.supplierId,
      categoriesProductsId: this.productoSeleccionado.categoriesProductsId,
      codeProduct: this.productoSeleccionado.codeProduct,
      salePrice: this.productoSeleccionado.salePrice,
      purchasePrice: this.productoSeleccionado.purchasePrice,
      state: this.productoSeleccionado.state,
      composicionIsoprothiolane: this.productoSeleccionado.composicionIsoprothiolane,
      composicionAditivos: this.productoSeleccionado.composicionAditivos,
      descuento: this.productoSeleccionado.descuento,
      modelo: this.productoSeleccionado.modelo,
      fechaIngreso: this.productoSeleccionado.fechaIngreso,
      ubicacion: this.productoSeleccionado.ubicacion
    };
  
    console.log('Producto a editar:', productoData);
    
    // Agregar los datos del producto como JSON
    formData.append('products', new Blob([JSON.stringify(productoData)], { type: 'application/json' }));
  
    //Solo agregar la imagen si hay un archivo seleccionado
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/edit/${this.productoSeleccionado.id}`;
  
    // Realizar la solicitud PUT
    this.http.put(url, formData, {
      observe: 'response',
      responseType: 'json'
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta:', response);
        if (response.status === 200 || response.status === 201) {
          this.productoEditado.emit(response.body);
          this.cerrarEditarModal();
        }
      },
      error: (err) => {
        console.error('Error completo:', err);
        if (err.status === 200 || err.status === 201) {
          this.cerrarEditarModal();
        }
      }
    });
  }
  
}
