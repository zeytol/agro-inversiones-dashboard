import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ProductsService } from '../../../services/products.service';
import { HttpClient } from '@angular/common/http';

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
  
  selectedFile: any = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private productService: ProductsService, private http: HttpClient) {}

  cerrarEditarModal(): void {
    this.cerrarModal.emit();
  }
  ngOnInit() {
    if (this.productoSeleccionado?.image) {
      this.imagePreview = this.productoSeleccionado.image;
    }
  }

  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.selectedFile = file;
      
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  editarProducto(): void {

    if (!this.productoSeleccionado.name || !this.productoSeleccionado.description || !this.productoSeleccionado.codeProduct) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const formData = new FormData();
    
    const productoData = {
      supplier: { id: this.productoSeleccionado.supplier?.id },
      categoryProducts: { id: this.productoSeleccionado.categoryProducts?.id },
      image: this.productoSeleccionado.image,
      name: this.productoSeleccionado.name,
      description: this.productoSeleccionado.description,
      price: this.productoSeleccionado.price,
      amount: this.productoSeleccionado.amount,
      type: this.productoSeleccionado.type,
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
    formData.append('products', new Blob([JSON.stringify(productoData)], { type: 'application/json' }));
  
    if (this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
  
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/edit/${this.productoSeleccionado.id}`;

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