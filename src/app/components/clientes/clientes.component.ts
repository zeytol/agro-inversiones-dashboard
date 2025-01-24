import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ClienteService } from '../../services/cliente.service';
import { ConfirmDeleteModalComponent } from '../../features/clientes/confirm-delete-modal/confirm-delete-modal.component'; 
import { AgregarUsuarioComponent } from '../../features/clientes/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from '../../features/clientes/editar-cliente/editar-cliente.component'; 
import { ClienteDetalleComponent } from '../../features/clientes/cliente-detalle/cliente-detalle.component';
import { Cliente } from '../../models/client.model';
 
@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent {
  isSidebarVisible = true;
  clientes: Cliente[] = [];
  clientesFiltrados: Cliente[] = [];
  
  filtroNombre: string = '';
  filtroDocumento: string = '';
  filtroTipo: string = '';

  currentPage: number = 1;
  pageSize: number = 6; // Número de clientes por página
   

  constructor(
    private dialog: MatDialog,
    private clienteService: ClienteService 
  ) {}

  ngOnInit(): void {
    this.listarClientes();
  }

   listarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (clientes: Cliente[]) => {
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
        cliente.razonSocial.toLowerCase().includes(this.filtroNombre.toLowerCase());
      const coincideDocumento =
        this.filtroDocumento.trim() === '' ||
        cliente.numeroDocumento.includes(this.filtroDocumento);
      const coincideTipo =
        this.filtroTipo.trim() === '' || cliente.tipoCliente === this.filtroTipo;

      return coincideNombre && coincideDocumento && coincideTipo;
    });
  }

  openConfirmDeleteModal(clienteId: number): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente(clienteId);
      }
    });
  }

   deleteCliente(clienteId: number): void {
    this.clienteService.eliminarCliente(clienteId).subscribe(
      (response) => {
        this.clientes = this.clientes.filter(cliente => cliente.id !== clienteId);
        
      },
      (error) => {
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

  openEditarClienteModal(cliente: Cliente): void {
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

  openDetalleClienteModal(cliente: Cliente): void {
    this.dialog.open(ClienteDetalleComponent, {
      width: '400px',
      data: cliente 
    });
  }

  getClientesPorPagina(): Cliente[] {
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
