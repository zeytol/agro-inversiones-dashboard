import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PaymentMethodService {
  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/payment-methods'; 

  constructor(private http: HttpClient) {}

  obtenerMetodosDePago() {
    return this.http.get<any[]>(this.apiUrl, {withCredentials: true});
  }
}
