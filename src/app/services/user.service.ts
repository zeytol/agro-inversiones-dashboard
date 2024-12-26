import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private jsonUrl = 'assets/dataUsers.json';
  private users: any[] = [];

  constructor(private http: HttpClient) {}

  getUsers(): Observable<any[]> {
    if (this.users.length === 0) {
      return this.http.get<any[]>(this.jsonUrl).pipe(
        map((data) => {
          this.users = data; 
          return this.users;
        })
      );
    } else {
      return of(this.users);
    }
  }

  addUser(newUser: any): Observable<any> {
    newUser.id = this.generateId(); 
    this.users.push(newUser);
    return of(newUser);
  }

  updateUser(editingUser: any): Observable<any> {
    const index = this.users.findIndex((user) => user.id === editingUser.id);
    if (index > -1) {
      this.users[index] = editingUser;
      return of(editingUser);
    }
    throw new Error('Usuario no encontrado');
  }

  deleteUser(id: number): Observable<any> {
    this.users = this.users.filter((user) => user.id !== id);
    return of({ message: 'Usuario eliminado con éxito' });
  }

  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 1;
  }
}
