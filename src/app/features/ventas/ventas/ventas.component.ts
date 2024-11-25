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
  mostrarAgregarCliente = false;
  mostrarConfirmacionDni = false;  

  dniModal: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  frecuencia: string = '';
  selectedImage: File | null = null;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
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
          this.abrirAgregarCliente();
        }
      });
    }
  }

  private verificarClienteExistente(dni: string): boolean {
    return false; 
  }

  abrirAgregarCliente() {
    this.mostrarAgregarCliente = true;
  }

  cerrarAgregarCliente() {
    this.mostrarAgregarCliente = false;
    this.resetForm(); 
  }

  agregarCliente() {
    if (!this.dniModal || !this.nombre || !this.apellido) {
      this.mostrarError("Todos los campos son obligatorios. Por favor, complete toda la información del cliente.");
      return;
    }

    if (this.selectedImage) {
      const formData = new FormData();
      formData.append('image', this.selectedImage, this.selectedImage.name);
      console.log(`Imagen subida: ${this.selectedImage.name}`);
    }

    console.log(`Cliente agregado: ${this.nombre}, DNI: ${this.dniModal}`);
    this.cerrarAgregarCliente();

    Swal.fire({
      icon: 'success',
      title: 'Registro guardado',
      text: 'El cliente ha sido guardado correctamente',
      confirmButtonText: 'OK'
    }).then(() => {
      this.mostrarConfirmacionDni = true; 
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
    console.log(`DNI confirmado: ${this.dni}`);
    this.mostrarConfirmacionDni = false; 
  }

  cancelar() {
    this.cerrarAgregarCliente(); 
  }

  private resetForm() {
    this.dniModal = '';
    this.nombre = '';
    this.apellido = '';
    this.direccion = '';
    this.telefono = '';
    this.correo = '';
    this.frecuencia = '';
    this.selectedImage = null;
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.selectedImage = file;
    }
  }
}
