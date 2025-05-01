import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InventarioService {
  private apiUrl = 'https://agroinversiones-api-ffaxcadua6gwf0fs.canadacentral-01.azurewebsites.net/api/products';

  constructor() {}

  getApiUrl(): string {
    return this.apiUrl;
  }
}
