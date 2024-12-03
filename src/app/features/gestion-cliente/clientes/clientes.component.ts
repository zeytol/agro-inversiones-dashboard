import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { HttpClient } from '@angular/common/http';
import { ConfirmDeleteModalComponent } from '../../gestion-cliente/modals/confirm-delete-modal/confirm-delete-modal.component'; 
import { AgregarUsuarioComponent } from '../../gestion-cliente/modals/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from '../../gestion-cliente/modals/editar-cliente/editar-cliente.component'; 
import { DetalleClienteComponent } from '../../gestion-cliente/modals/detalle-cliente/detalle-cliente.component'; 

interface Cliente {
  nombre: string;
  tipoCliente: string;
  tipoDocumento: string;
  dniRuc: string;
  direccion: string;
  telefono: string;
  correo: string;
  estado: string;
  fotoUrl: string;
}

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit {
  isSidebarVisible = true;
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  
  // Variables de filtrado
  filtroNombre: string = '';
  filtroDocumento: string = '';
  filtroTipo: string = '';

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.http.get<Cliente[]>('assets/datacliente.json').subscribe(
      data => {
        this.clientes = data;
        this.clientesFiltrados = data; // Inicia con todos los clientes
      },
      error => {
        console.error('Error loading client data:', error);
      }
    );
  }

  // Método para aplicar el filtrado
  aplicarFiltro(): void {
    this.clientesFiltrados = this.clientes.filter(cliente => {
      const nombreMatch = cliente.nombre.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const documentoMatch = cliente.dniRuc.includes(this.filtroDocumento);
      const tipoMatch = this.filtroTipo ? cliente.tipoCliente === this.filtroTipo : true;
      
      return nombreMatch && documentoMatch && tipoMatch;
    });
  }

  openConfirmDeleteModal(clienteNombre: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: { clienteNombre } // Pasa el nombre del cliente al modal
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente(result); // Llama a deleteCliente con el nombre confirmado
      }
    });
  }
  
  deleteCliente(clienteNombre: string): void {
    // Elimina el cliente basado en el nombre
    this.clientes = this.clientes.filter(cliente => cliente.nombre !== clienteNombre);
    console.log('Cliente eliminado:', clienteNombre); // Agregar esta línea para verificar si se está eliminando correctamente
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openAgregarUsuarioModal(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '800px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se agrega el nuevo cliente a la lista de clientes
        this.clientes.push(result);
        this.aplicarFiltro(); // Re-aplicar el filtro después de agregar un cliente
      }
    });
  }

  openDetalleClienteModal(cliente: Cliente): void {
    console.log('fotoUrl:', cliente.fotoUrl);  // Verifica si la URL está bien pasada
    this.dialog.open(DetalleClienteComponent, {
      width: '800px',
      data: {
        nombre: cliente.nombre,
        tipoCliente: cliente.tipoCliente,
        tipoDocumento: cliente.tipoDocumento,
        numeroDocumento: cliente.dniRuc,
        direccion: cliente.direccion,
        telefono: cliente.telefono,
        correo: cliente.correo,
        fotoUrl: cliente.fotoUrl,  // Aquí debes asegurarte de que esto sea el dato correcto
      }
    });
  }

  openEditarClienteModal(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '800px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.clientes.findIndex(c => c.nombre === cliente.nombre);
        if (index !== -1) {
          this.clientes[index] = result;
          this.aplicarFiltro(); // Re-aplicar el filtro después de editar un cliente
        }
      }
    });
  }
}
