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

  // Simula la carga de usuarios desde el archivo JSON
  getUsers(): Observable<any[]> {
    if (this.users.length === 0) {
      return this.http.get<any[]>(this.jsonUrl).pipe(
        map((data) => {
          this.users = data; // Guarda los usuarios en memoria
          return this.users;
        })
      );
    } else {
      return of(this.users); // Devuelve los usuarios ya cargados
    }
  }

  // Simula agregar un nuevo usuario
  addUser(newUser: any): Observable<any> {
    newUser.id = this.generateId(); // Genera un ID único
    this.users.push(newUser);
    return of(newUser); // Simula la respuesta del servidor
  }

  // Simula actualizar un usuario existente
  updateUser(editingUser: any): Observable<any> {
    const index = this.users.findIndex((user) => user.id === editingUser.id);
    if (index > -1) {
      this.users[index] = editingUser;
      return of(editingUser);
    }
    throw new Error('Usuario no encontrado');
  }

  // Simula eliminar un usuario
  deleteUser(id: number): Observable<any> {
    this.users = this.users.filter((user) => user.id !== id);
    return of({ message: 'Usuario eliminado con éxito' });
  }

  // Generador de ID único (puedes usar una lógica más compleja si lo necesitas)
  private generateId(): number {
    return this.users.length > 0
      ? Math.max(...this.users.map((user) => user.id)) + 1
      : 1;
  }
}
