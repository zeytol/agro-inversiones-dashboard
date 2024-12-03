import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
  @Input() showModal: boolean = false;
  showConfirmationModal: boolean = false; 

  dni: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  frecuencia: string = '';
  imagen: File | null = null; 

  onFileChange(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.imagen = input.files[0];
    }
  }

  agregarCliente() {
    console.log("Cliente agregado:", {
      dni: this.dni,
      nombre: this.nombre,
      apellido: this.apellido,
      direccion: this.direccion,
      telefono: this.telefono,
      correo: this.correo,
      frecuencia: this.frecuencia,
      imagen: this.imagen 
    });
    
    this.showConfirmationModal = true;

    this.dni = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
    this.correo = '';
    this.frecuencia = '';
    this.imagen = null; 
  }

  cancelar() {
    this.showModal = false;
  }

  closeConfirmation() {
    this.showConfirmationModal = false; 
    this.cancelar(); 
  }
}
