import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productos: any[] = [];
  private apiUrl = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    if (this.productos.length > 0) {
      return new Observable((observer) => {
        observer.next(this.productos);
        observer.complete();
      });
    } else {
      return this.http.get<any[]>(this.apiUrl);
    }
  }
  

  setProductos(productos: any[]) {
    this.productos = productos;
  }

  // Método para eliminar un producto
  eliminarProducto(productId: number): Observable<string> {
    const url = `https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products/delete/${productId}`;
  
    return this.http.delete<string>(url, { responseType: 'text' as 'json' });
  }

  // Método para editar un producto
  editarProducto(productId: number, producto: any, selectedFile: File | null): Observable<string> {
    const url = `${this.apiUrl}/edit/${productId}`;

    // Crear un objeto FormData
    const formData = new FormData();
    
    // Agregar los campos del producto
    formData.append('products', new Blob([JSON.stringify(producto)], { type: 'application/json' }));
    
    // Si hay una imagen seleccionada, agregarla al FormData
    if (selectedFile) {
      formData.append('image', selectedFile, selectedFile.name);
    }

    // Enviar la solicitud PUT con FormData
    return this.http.put<string>(url, formData);
  }
}
