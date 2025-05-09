import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface Documento {
  fechaEmision: string;
  tipoDocumento?: string;
  numeroDocumento: string;
  cliente: string;
  montoTotal: number;
  estado: string;
  urlDocumento: string;
}

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/documents';

  constructor(private http: HttpClient) {}

  getDocumentos(): Observable<Documento[]> {
    return this.http.get<Documento[]>(this.apiUrl, {withCredentials: true});
  }
}
