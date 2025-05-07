import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CarritoService } from '../../../services/carrito.service';
import { ClienteService } from '../../../services/cliente.service';
import { customers } from '../../../models/client.model';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  isSidebarVisible = true;
  dni: string = '';
  mostrarAgregarCliente = false;
  mostrarConfirmacionDni = false;  
  clienteSeleccionado: customers | null = null;
  clientes: customers[] = [];

  dniModal: string = '';
  nombre: string = '';
  apellido: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  frecuencia: string = '';
  selectedImage: File | null = null;
  carrito: any[] = [];

  tipoComprobante: number = 1; 
  porcentajeIGV: number = 18; 
  isLoadingClientes: boolean | undefined;

  constructor(
    private carritoService: CarritoService,
    private clienteService: ClienteService,
  ) {} 

  ngOnInit(): void {
    this.carrito = this.carritoService.getCarrito();
    this.cargarClientes();
  }

  cargarClientes(): void {
    this.isLoadingClientes = true;
    this.clienteService.listarClientes().subscribe({
      next: (response) => {
        this.clientes = response;
        this.isLoadingClientes = false;
        // Eliminado: Toast de clientes cargados
      },
      error: (error) => {
        console.error('Error al cargar clientes:', error);
        this.isLoadingClientes = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No se pudieron cargar los clientes. Por favor, intente nuevamente.',
          confirmButtonText: 'Reintentar',
          showCancelButton: true,
          cancelButtonText: 'Cancelar'
        }).then((result) => {
          if (result.isConfirmed) {
            this.cargarClientes();
          }
        });
      }
    });
  }
  calcularSubtotal(): number {
    return this.carrito.reduce((total, item) => total + item.precio * item.cantidad, 0);
  }

  eliminarItem(item: any): void {
    this.carrito = this.carrito.filter(p => p.name !== item.name);
    this.carritoService.setCarrito(this.carrito);
  }

  eliminarProducto(index: number): void {
    this.carritoService.eliminarProducto(index);
    this.carrito = this.carritoService.getCarrito();
  }

  actualizarIGV(): void {
    console.log("Tipo de comprobante cambiado a:", this.tipoComprobante);
    if (this.tipoComprobante == 1) {
      this.porcentajeIGV = 18; // 18% para facturas
    } else if (this.tipoComprobante == 2) {
      this.porcentajeIGV = 0;  // 0% para boletas
    } else {
      this.porcentajeIGV = 0;  // 0% para notas de venta
    }
    console.log("Porcentaje IGV actualizado a:", this.porcentajeIGV);
    this.carritoService.setPorcentajeIGV(this.porcentajeIGV);
  }

  // Método modificado para calcular el IGV
  igv(): number {
    // Para boletas y notas de venta el IGV es 0, solo se calcula para facturas
    if (this.tipoComprobante == 1) {
      return this.subtotal() * (this.porcentajeIGV / 100);
    } else {
      return 0;
    }
  }

  total(): number {
    return this.subtotal() + this.igv();
  }

  subtotal(): number {
    if (!this.carrito || this.carrito.length === 0) {
      return 0;
    }
    
    return this.carrito.reduce((total, item) => {
      return total + (item.cantidad * item.salePrice);
    }, 0);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
  }

  setPorcentajeIGV(porcentaje: number): void {
    this.porcentajeIGV = porcentaje;
  }
  
  calcularIGV(): number {
    return this.calcularSubtotal() * (this.porcentajeIGV / 100);
  }

  buscarCliente() {
    if (!this.dni) {
      Swal.fire({
        icon: 'warning',
        title: 'Campo vacío',
        text: 'Por favor ingrese un número de documento para buscar',
        confirmButtonText: 'OK'
      });
      return;
    }

    const clienteEncontrado = this.verificarClienteExistente(this.dni);

    if (clienteEncontrado) {
      this.clienteSeleccionado = clienteEncontrado;
      // Eliminado: Modal de cliente encontrado
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Cliente no encontrado',
        text: 'El cliente no existe. ¿Desea agregar un nuevo cliente?',
        showCancelButton: true,
        confirmButtonText: 'Sí, agregar',
        cancelButtonText: 'No, cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33'
      }).then((result) => {
        if (result.isConfirmed) {
          this.dniModal = this.dni;
          this.abrirAgregarCliente();
        }
      });
    }
  }

  private verificarClienteExistente(dni: string): customers | null {
    return this.clientes.find(cliente => String(cliente.documentNumber).trim() === dni.trim()) || null;
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