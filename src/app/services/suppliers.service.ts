import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SuppliersService {
  private suppliers: any[] = []; 
  private apiUrl = 'http://localhost:8091/api/suppliers';

  constructor(private http: HttpClient) {}

  getSuppliers(): Observable<any[]> {
    if (this.suppliers.length > 0) {
      
      return new Observable((observer) => {
        observer.next(this.suppliers);
        observer.complete();
      });
    } else {
      
      return this.http.get<any[]>(this.apiUrl);
    }
  }

  setSuppliers(suppliers: any[]): void {
    this.suppliers = suppliers;
  }
}
