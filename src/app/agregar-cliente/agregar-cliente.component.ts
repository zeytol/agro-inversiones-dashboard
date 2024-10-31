import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-cliente',
  templateUrl: './agregar-cliente.component.html',
  styleUrls: ['./agregar-cliente.component.css']
})
export class AgregarClienteComponent {
  showModal = false;

  // Propiedades del formulario de cliente
  dni: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  frecuencia: string = '';

  // Muestra el modal de SweetAlert y, si el usuario confirma, abre el formulario de agregar cliente
  buscarCliente() {
    const clienteEncontrado = this.verificarClienteExistente(this.dni);

    if (!clienteEncontrado) {
      Swal.fire({
        icon: 'error',
        title: 'Cliente no encontrado!',
        text: 'El cliente no existe. ¿Desea agregar un nuevo cliente?',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.showModal = true; // Muestra el modal
        }
      });
    }
  }

  // Verifica si el cliente ya existe en el sistema (simulado)
  private verificarClienteExistente(dni: string): boolean {
    // Implementa aquí la lógica real para verificar si el cliente existe
    return false; // En este caso, siempre devuelve falso para abrir el modal
  }

  // Lógica para agregar un nuevo cliente
  agregarCliente() {
    // Aquí se puede agregar la lógica para guardar el cliente en una base de datos o API
    console.log(`Cliente agregado: ${this.nombre}, DNI: ${this.dni}`);
    
    // Restablece los campos del formulario
    this.dni = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
    this.correo = '';
    this.frecuencia = '';

    // Cierra el modal
    this.showModal = false;
  }

  // Cierra el modal sin agregar un cliente
  cancelar() {
    this.showModal = false;
  }
}
