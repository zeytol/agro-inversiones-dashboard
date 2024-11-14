import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { HttpClient } from '@angular/common/http';
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component'; 
import { AgregarUsuarioComponent } from '../../modals/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from '../../modals/editar-cliente/editar-cliente.component'; 
import { DetalleClienteComponent } from '../../modals/detalle-cliente/detalle-cliente.component'; 

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

  constructor(private dialog: MatDialog, private http: HttpClient) {}

  ngOnInit(): void {
    this.loadClientes();
  }

  loadClientes(): void {
    this.http.get<Cliente[]>('assets/datacliente.json').subscribe(
      data => {
        this.clientes = data;
      },
      error => {
        console.error('Error loading client data:', error);
        
      }
    );
  }

  openConfirmDeleteModal(clienteNombre: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent, {
      width: '400px',
      data: { clienteNombre } // Pasa el nombre del cliente al modal
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente(result); // El cliente fue confirmado para eliminar, eliminamos de la lista
      }
    });
  }

  deleteCliente(clienteNombre: string): void {
    this.clientes = this.clientes.filter(cliente => cliente.nombre !== clienteNombre);
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openAgregarUsuarioModal(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '400px',
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Se agrega el nuevo cliente a la lista de clientes
        this.clientes.push(result);
      }
    });
  }

  openDetalleClienteModal(cliente: Cliente): void {
    this.dialog.open(DetalleClienteComponent, {
      width: '400px',
      data: cliente
    });
  }

  openEditarClienteModal(cliente: Cliente): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '400px',
      data: cliente
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const index = this.clientes.findIndex(c => c.nombre === cliente.nombre);
        if (index !== -1) {
          this.clientes[index] = result;
        }
      }
    });
  }
}
