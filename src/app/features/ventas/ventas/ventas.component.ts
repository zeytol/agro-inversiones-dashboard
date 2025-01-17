import { Component, EventEmitter, Output, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CarritoService } from '../../../shared/carrito.service';
import { ClienteService } from '../../../shared/cliente.service';

@Component({
  selector: 'app-ventas',
  templateUrl: './ventas.component.html',
  styleUrls: ['./ventas.component.css']
})
export class VentasComponent implements OnInit {
  isSidebarVisible = true;
  mostrarAgregarCliente = false;
  mostrarConfirmacionDni = false;
  clienteNoEncontrado = false; 
  clienteEncontrado = false;    
  cliente: any = {};            
  numeroDocumento: string = '';
  carrito: any[] = [];

  productos: any[] = [];



  totalCarrito: number = 0;

  @Output() finalizarCompraEvento = new EventEmitter<any[]>();

  constructor(private router: Router,private carritoService: CarritoService,private clienteService : ClienteService) {}

  ngOnInit(): void {
    this.productos = this.carritoService.getProductos();  

  };
  
  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
    // Implementación de ajuste de gráficos si es necesario
  }

  subtotal(): number {
    return this.productos.reduce((acc, producto) => acc + producto.salePrice * producto.cantidad, 0);
  }

  igv(): number {
    return this.subtotal() * 0.18;  // Cálculo del IGV (18%).
  }

  total(): number {
    return this.subtotal() + this.igv();
  }

  eliminarProducto(producto: any) {
    const index = this.productos.indexOf(producto);
    if (index > -1) {
      this.productos.splice(index, 1); // Eliminar producto.
      Swal.fire({
        icon: 'success',
        title: 'Producto eliminado',
        text: `${producto.name} ha sido eliminado del carrito.`,
        confirmButtonText: 'OK'
      });
    }
  }

  finalizarCompra() {
    if (this.productos.length === 0) {
      Swal.fire({
        icon: 'error',
        title: 'Carrito vacío',
        text: 'No hay productos en el carrito para finalizar la compra.',
        confirmButtonText: 'OK'
      });
      return;
    }

    const totalAPagar = this.total().toFixed(2); 

    Swal.fire({
      icon: 'success',
      title: 'Compra realizada',
      text: `Total a pagar: S/. ${totalAPagar}`,
      confirmButtonText: 'OK'
    });

    this.carrito = []; 
    this.totalCarrito = 0;
  }

   buscarCliente() {
  // Llamada al servicio para obtener todos los clientes
  this.clienteService.getTodosClientes().subscribe({
    next: (clientes) => {
      // Buscar el cliente que coincida con el numeroDocumento
      const clienteEncontrado = clientes.find(cliente => cliente.numeroDocumento === this.numeroDocumento);

      if (clienteEncontrado) {
        this.cliente = clienteEncontrado;
        this.clienteEncontrado = true;
        this.clienteNoEncontrado = false;
      } else {
        this.clienteEncontrado = false;
        this.clienteNoEncontrado = true;
        Swal.fire({
          icon: 'error',
          title: 'Cliente no encontrado',
          text: 'El cliente no existe. Verifique el DNI ingresado.',
          confirmButtonText: 'OK',
        });
      }
    },
    error: () => {
      this.clienteEncontrado = false;
      this.clienteNoEncontrado = true;
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Hubo un error al obtener los clientes. Intente nuevamente.',
        confirmButtonText: 'OK',
      });
    }
  });
}
validarSoloNumeros() {
  this.numeroDocumento = this.numeroDocumento.replace(/[^0-9]/g, '');  // Reemplaza todo lo que no sea número
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
    console.log(`DNI confirmado: ${this.numeroDocumento}`);
    this.mostrarConfirmacionDni = false;
  }
}