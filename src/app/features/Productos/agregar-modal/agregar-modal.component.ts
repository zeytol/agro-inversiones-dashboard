import { Component, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';

interface Producto {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  type: string;
  image: string;
  supplierId: number;
  categoriesProductsId: number;
  codeProduct: string;
  salePrice: number;
  purchasePrice: number;
  state: string;
  composicionIsoprothiolane: string;
  composicionAditivos: string;
  descuento: number;
  modelo: string;
  fechaIngreso: string;
  ubicacion: string;
}

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent {
  @Output() cerrarModal: EventEmitter<void> = new EventEmitter();
  @Output() agregarProductoEvent: EventEmitter<any> = new EventEmitter();
  @Output() productoAgregado = new EventEmitter<any>();

  nuevoProducto: Producto = {
    id: 0,
    name: '',
    description: '',
    price: 0,
    amount: 0,
    type: '',
    image: '',
    supplierId: 0,
    categoriesProductsId: 0,
    codeProduct: '',
    salePrice: 0,
    purchasePrice: 0,
    state: '',
    composicionIsoprothiolane: '',
    composicionAditivos: '',
    descuento: 0,
    modelo: '',
    fechaIngreso: '',
    ubicacion: ''
  };

  productos: Producto[] = [];
  selectedFile: any = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private http: HttpClient) {}

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

  agregarProducto(): void {
    if (!this.nuevoProducto.name || !this.nuevoProducto.description || !this.nuevoProducto.codeProduct || !this.selectedFile) {
      console.error('Por favor, completa todos los campos obligatorios.');
      return;
    }
  
    const formData = new FormData();
   
    formData.append('products', new Blob([JSON.stringify(this.nuevoProducto)], {
      type: 'application/json'
    }));
    formData.append('image', this.selectedFile);
  
    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/register';
  
   
    this.http.post(url, formData, {
      observe: 'response',  
      responseType: 'json'  
    }).subscribe({
      next: (response: any) => {
        console.log('Respuesta completa:', response);
        if (response.status === 201) {
          console.log('Producto registrado con éxito');
          this.productos.push(response.body);
          this.productoAgregado.emit(response.body);
          this.resetForm();
          this.cerrar();
        }
      },
      error: (err) => {
        console.error('Error completo:', err);
     
        if (err.status === 201) {
       
          console.log('Producto probablemente registrado con éxito');
          this.resetForm();
          this.cerrar();
        } else {
         
          console.error('Error al registrar el producto:', err.message);
        }
      }
    });
  }

  resetForm(): void {
    this.nuevoProducto = {
      id: 0,
      name: '',
      description: '',
      price: 0,
      amount: 0,
      type: '',
      image: '',
      supplierId: 0,
      categoriesProductsId: 0,
      codeProduct: '',
      salePrice: 0,
      purchasePrice: 0,
      state: '',
      composicionIsoprothiolane: '',
      composicionAditivos: '',
      descuento: 0,
      modelo: '',
      fechaIngreso: '',
      ubicacion: ''
    };
    this.selectedFile = null;
    this.imagePreview = null;
  }

  cerrar(): void {
    this.cerrarModal.emit();
  }
}