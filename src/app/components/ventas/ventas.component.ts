import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent {
  isSidebarVisible = true;
  dni: string = '';
  showModal = false;
  showDniModal = false;  // Controla la visibilidad del segundo modal

  // Propiedades para el formulario de cliente en el modal
  dniModal: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  frecuencia: string = '';

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
    // Aquí puedes actualizar las opciones de los gráficos si es necesario
  }

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
          this.showModal = true; // Muestra el modal para agregar un nuevo cliente
        }
      });
    }
  }

  private verificarClienteExistente(dni: string): boolean {
    // Implementa la lógica de verificación del cliente
    return false; // Esto es solo un ejemplo; cámbialo por la lógica real
  }

  agregarCliente() {
    if (!this.dniModal || !this.nombre || !this.apellido) {
      this.mostrarError("Todos los campos son obligatorios. Por favor, complete toda la información del cliente.");
      return;
    }

    // Lógica para agregar el cliente
    console.log(`Cliente agregado: ${this.nombre}, DNI: ${this.dniModal}`);
    this.showModal = false; // Cierra el modal de agregar cliente
    this.resetForm(); // Resetea el formulario

    // Muestra un mensaje de éxito y el segundo modal
    Swal.fire({
      icon: 'success',
      title: 'Registro guardado',
      text: 'El cliente ha sido guardado correctamente',
      confirmButtonText: 'OK'
    }).then(() => {
      this.showDniModal = true; // Muestra el segundo modal para ingresar el DNI
    });
  }

  mostrarError(mensaje: string) {
    Swal.fire({
      icon: 'error',
      title: 'Error',
      text: mensaje,
      confirmButtonText: 'OK',
      confirmButtonColor: '#d33'
    });
  }

  confirmarDniCliente() {
    // Lógica para confirmar el DNI e iniciar la venta
    console.log(`DNI confirmado: ${this.dni}`);
    this.showDniModal = false; // Cierra el modal de confirmación
  }

  cancelar() {
    this.showModal = false; // Cierra el modal de agregar cliente
    this.resetForm();
  }

  private resetForm() {
    // Resetea todos los campos del formulario
    this.dniModal = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
    this.correo = '';
    this.frecuencia = '';
  }
}
