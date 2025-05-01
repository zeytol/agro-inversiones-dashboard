import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryEditService {
  private baseUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/categories';

  constructor(private http: HttpClient) {}

 // Registrar nueva categoría
 agregarCategoria(formData: FormData): Observable<any> {
  const url = `${this.baseUrl}/register`;
    return this.http.post(url, formData, {
      observe: 'response',
      responseType: 'text',
      withCredentials: true
    });
  
}

// Editar una categoría existente
editarCategoria(id: number, formData: FormData): Observable<any> {
  const url = `${this.baseUrl}/edit/${id}`;  // URL para editar
  return this.http.put(url, formData, { withCredentials: true });
}
}
