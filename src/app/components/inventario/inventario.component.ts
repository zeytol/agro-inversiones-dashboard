import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';

const apiUrl = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products';

interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  amount: number;
  type: string;
  image: string;
  supplierId: string;
  categoryProducts: { name: string }[];
  codeProduct: string;
  salePrice: number;
  purchasePrice: number;
  state?: string;
  composicionIsoprothiolane?: string;
  composicionAditivos?: string;
  descuento?: string;
  modelo?: string;
  fechaIngreso?: string;
  ubicacion?: string;
}

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  allProducts: Product[] = []; // Todos los productos cargados de la API
  displayedProducts: Product[] = []; // Productos añadidos a la tabla
  productIdsInTable = new Set<number>(); // Para evitar duplicados en la tabla
  searchCode: string = ''; // Código de producto buscado
  isSidebarVisible: boolean = true;

  @Output() sidebarToggle = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchProducts();
    this.loadDisplayedProducts();
  }

  // Obtener los productos desde la API
  fetchProducts(): void {
    this.http.get<Product[]>(apiUrl).subscribe(
      (data) => {
        this.allProducts = data;
        console.log('Datos cargados correctamente: ', this.allProducts);
      },
      (error) => {
        console.error('Error:', error);
        Swal.fire('Error', 'Error al cargar los datos. Intente nuevamente más tarde.', 'error');
      }
    );
  }

  // Agregar un producto a la tabla
  addRowToTable(product: Product): void {
    if (this.productIdsInTable.has(product.id)) {
      Swal.fire('Aviso', 'El producto ya está en la tabla.', 'warning');
      return;
    }

    this.productIdsInTable.add(product.id);
    this.displayedProducts.push(product); // Agrega el producto a la lista de productos mostrados
    this.saveDisplayedProducts();
    Swal.fire('Éxito', 'Producto añadido a la tabla.', 'success');
  }
  saveDisplayedProducts(): void{
    localStorage.setItem('displayedProducts', JSON.stringify(this.displayedProducts));
  }
  loadDisplayedProducts(): void {
    const savedProducts = localStorage.getItem('displayedProducts');
    if(savedProducts) {
      this.displayedProducts = JSON.parse(savedProducts);
      this.productIdsInTable = new Set(this.displayedProducts.map((product) => product.id));
    }
  }

  // Alternar visibilidad del sidebar
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarToggle.emit();
  }

  // Obtener las categorías del producto
  getCategoryProducts(product: Product): { name: string }[] {
    return Array.isArray(product.categoryProducts) ? product.categoryProducts : [product.categoryProducts];
  }
  //getSupplier(product: Product): { name: string }[] {
    //return Array.isArray(product.supplier) ? product.supplier : [product.supplier];
  //}

  // Buscar producto por código
  searchProduct(): void {
    if (!this.searchCode.trim()) {
      Swal.fire('Aviso', 'Por favor, ingrese un código de producto.', 'warning');
      return;
    }

    const product = this.allProducts.find(
      (p) => p.codeProduct.toLowerCase() === this.searchCode.trim().toLowerCase()
    );

    if (product) {
      this.addRowToTable(product);
    } else {
      Swal.fire('No encontrado', 'Producto no encontrado.', 'info');
    }
  }
}
