import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class CategoryProductsService {
  private categoryProducts: any[] = [];
  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/categories';

  constructor(private http: HttpClient) {}

  getcategoryProducts(): Observable<any[]> {
    if (this.categoryProducts.length > 0) {
      return new Observable((observer) => {
        observer.next(this.categoryProducts);
        observer.complete();
      });
    } else {
      return this.http.get<any[]>(this.apiUrl, {withCredentials: true});
    }
  }

  setcategoryProducts(categoryProducts: any[]) {
    this.categoryProducts = categoryProducts;
  }

}
