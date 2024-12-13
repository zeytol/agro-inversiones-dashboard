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
  
}
