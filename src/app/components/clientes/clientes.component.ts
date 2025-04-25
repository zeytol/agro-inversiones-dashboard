import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ClienteService } from '../../services/cliente.service';
import { ConfirmDeleteModalComponent } from '../../features/clientes/confirm-delete-modal/confirm-delete-modal.component'; 
import { AgregarUsuarioComponent } from '../../features/clientes/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from '../../features/clientes/editar-cliente/editar-cliente.component'; 
import { ClienteDetalleComponent } from '../../features/clientes/cliente-detalle/cliente-detalle.component';
import { customers } from '../../models/client.model';
import Swal from 'sweetalert2';

 
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  isSidebarVisible = true;
  clientes: customers[] = [];
  clientesFiltrados: customers[] = [];
  
  filtroNombre: string = '';
  filtroDocumento: string = '';
  filtroTipo: string = '';

  currentPage: number = 1;
  pageSize: number = 10; // Número de clientes por página
   

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService 
  ) {}

  ngOnInit(): void {
    this.listarClientes();
  }

   listarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (clientes: customers[]) => {
        this.clientes = clientes;
        this.clientesFiltrados = [...clientes];
      },
      (error) => {
        console.error('Error al obtener clientes:', error);
      }
    );
  }

  filtrarClientes(): void {
    this.clientesFiltrados = this.clientes.filter((cliente) => {
      const coincideNombre =
        this.filtroNombre.trim() === '' ||
        cliente.name.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const coincideDocumento =
        this.filtroDocumento.trim() === '' ||
        cliente.documentNumber.includes(this.filtroDocumento);
      const coincideTipo =
        this.filtroTipo.trim() === '' || cliente.typeCustomer === this.filtroTipo;

      return coincideNombre && coincideDocumento && coincideTipo;
    });
  }

  openConfirmDeleteModal(clienteId: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: 'No podrás recuperar este cliente después de eliminarlo.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteCliente(clienteId);
      } else {
        Swal.fire('Cancelado', 'El cliente no ha sido eliminado', 'info');
      }
    });
  }

  deleteCliente(clienteId: number): void {
    Swal.fire({
      title: 'Eliminando...',
      text: 'Por favor, espera mientras se elimina el cliente.',
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      }
    });

    this.clienteService.eliminarCliente(clienteId).subscribe(
      (response) => {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
        this.clientesFiltrados = this.clientesFiltrados.filter(cliente => cliente.id !== clienteId);
        Swal.fire('Eliminado', 'El cliente ha sido eliminado correctamente', 'success');
      },
      (error) => {
        Swal.fire('Error', 'No se pudo eliminar el cliente', 'error');
        console.error('Error al eliminar cliente:', error);
      }
    );
  }
   
  onClienteAdded(): void {
    this.listarClientes();  
  }
  
  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  openAgregarUsuarioModal(): void {
    const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
      width: '400px',  
    });

    dialogRef.componentInstance.clienteAdded.subscribe(() => {
      this.onClienteAdded(); 
    });
  }

  openEditarClienteModal(cliente: customers): void {
    const dialogRef = this.dialog.open(EditarClienteComponent, {
      width: '400px',
      data: cliente
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.id) {
          this.clienteService.actualizarCliente(result.id, result).subscribe(
            (response) => {
              this.listarClientes(); 
            },
            (error) => {
              console.error('Error al actualizar cliente:', error);
            }
          );
        } else {
          console.error('El cliente no tiene un ID válido');
        }
      }
    });
  }

  openDetalleClienteModal(cliente: customers): void {
    this.dialog.open(ClienteDetalleComponent, {
      width: '400px',
      data: cliente 
    });
  }

  getClientesPorPagina(): customers[] {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.clientesFiltrados.slice(startIndex, endIndex);
  }

  cambiarPagina(direccion: 'anterior' | 'siguiente'): void {
    if (direccion === 'anterior' && this.currentPage > 1) {
      this.currentPage--;
    } else if (direccion === 'siguiente' && this.currentPage < this.getTotalPaginas()) {
      this.currentPage++;
    }
  }
  
  getTotalPaginas(): number {
    return Math.ceil(this.clientesFiltrados.length / this.pageSize);
  }
}
