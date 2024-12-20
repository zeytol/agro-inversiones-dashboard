import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CategoryProductsService } from '../../../services/category-products.service';

@Component({
  selector: 'app-agregar-modal',
  templateUrl: './agregar-modal.component.html',
  styleUrls: ['./agregar-modal.component.css']
})
export class AgregarModalComponent implements OnInit {
  @Output() cerrarModal = new EventEmitter<void>();
  @Output() productoAgregado = new EventEmitter<any>();

  imagePreview: string | undefined;
  mensajeError: string | null = null;

  nuevoProducto: any = {
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
    state: 'Activo',
    descuento: 0,
    fechaIngreso: new Date().toISOString().split('T')[0],
    ubicacion: ''
  };

  categorias: any[] = [];
  proveedores: any[] = [
    { id: 1, name: 'Proveedor A' },
    { id: 2, name: 'Proveedor B' },
    { id: 3, name: 'Proveedor C' }
  ];

  constructor(
    private http: HttpClient,
    private categoryProductsService: CategoryProductsService
  ) {}

  ngOnInit(): void {
    this.cargarCategorias();
  }

  cargarCategorias(): void {
    this.categoryProductsService.getcategoryProducts().subscribe({
      next: (data) => {
        this.categorias = data;
        console.log('Categorías cargadas:', this.categorias);
      },
      error: (err) => {
        console.error('Error al cargar categorías:', err);
      }
    });
  }

  agregarProducto(): void {
    // Validar que los campos obligatorios estén completos
    if (
      !this.nuevoProducto.name ||
      !this.nuevoProducto.description ||
      !this.nuevoProducto.codeProduct ||
      !this.nuevoProducto.supplierId ||
      !this.nuevoProducto.categoriesProductsId
    ) {
      this.mensajeError = 'Por favor, completa todos los campos obligatorios.';
      console.error(this.mensajeError);
      return;
    }
  
    // Validar precios y cantidades
    if (this.nuevoProducto.salePrice <= 0 || this.nuevoProducto.purchasePrice <= 0 || this.nuevoProducto.amount <= 0) {
      this.mensajeError = 'Los precios y la cantidad deben ser mayores que cero.';
      console.error(this.mensajeError);
      return;
    }
  
    // Validar formato de código de producto
    const regexCodigoProducto = /^[A-Za-z0-9_-]+$/;
    if (!regexCodigoProducto.test(this.nuevoProducto.codeProduct)) {
      this.mensajeError = 'El código del producto solo puede contener letras, números, guiones y guiones bajos.';
      console.error(this.mensajeError);
      return;
    }
  
    this.mensajeError = null; 
    const url = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/register';
  
    // Crear objeto FormData para manejar el envío de datos
    const formData = new FormData();
    Object.keys(this.nuevoProducto).forEach((key) => {
      console.log(key, this.nuevoProducto[key]); // Verifica los valores que se están enviando
      if (key === 'image' && this.nuevoProducto[key]) {
        formData.append(key, this.nuevoProducto[key]);
      } else {
        formData.append(key, this.nuevoProducto[key]);
      }
    });
  
    // Enviar datos al servidor
    this.http.post<any>(url, formData).subscribe({
      next: (response) => {
        console.log('Producto registrado con éxito:', response);
        this.productoAgregado.emit(response); // Emitir evento de producto agregado
        this.cerrar(); // Cerrar el modal
      },
      error: (err) => {
        console.error('Error al registrar el producto:', err);
        if (err.status === 400 && err.error) {
          console.error('Detalles del error:', err.error);
          this.mensajeError = err.error.message || 'Error en la solicitud. Verifica los datos.';
        } else {
          this.mensajeError = 'Hubo un error al registrar el producto. Intenta nuevamente.';
        }
      }
    });
  }
  

  cerrar(): void {
    this.cerrarModal.emit();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input?.files?.length) {
      const file = input.files[0];
      const reader = new FileReader();

      // Actualizar la imagen seleccionada
      reader.onload = () => {
        this.imagePreview = reader.result as string;
        this.nuevoProducto.image = file; // Asignar el archivo seleccionado al campo image
      };

      reader.readAsDataURL(file);
    }
  }
}
 