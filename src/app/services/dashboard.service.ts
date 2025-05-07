import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private apiUrl = 'https://api-agroinversiones-gzdgf3cydydde6gm.canadacentral-01.azurewebsites.net/api/reports/graficosDashboard';

  constructor(private http: HttpClient) {}

  getDashboardData(): Observable<any> {
    const token = localStorage.getItem('token'); // o sessionStorage
    
    return this.http.get<any>(this.apiUrl, {withCredentials: true});
  }
}
