import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private productos: any[] = [];
  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/products';

  constructor(private http: HttpClient) {}

  getProductos(): Observable<any[]> {
    if (this.productos.length > 0) {
      return new Observable((observer) => {
        observer.next(this.productos);
        observer.complete();
      });
    } else {
      return this.http.get<any[]>(this.apiUrl, {withCredentials: true});
    }
  }

  eliminarProducto(productId: number): Observable<string> {
    const url = `https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/products/delete/${productId}`;
  
    return this.http.delete<string>(url, { responseType: 'text' as 'json', withCredentials: true });
  }

}
