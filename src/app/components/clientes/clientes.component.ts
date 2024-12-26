import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog'; 
import { ConfirmDeleteModalComponent } from '../../modals/confirm-delete-modal/confirm-delete-modal.component'; 
import { AgregarUsuarioComponent } from '../../modals/agregar-usuario/agregar-usuario.component';
import { EditarClienteComponent } from '../../modals/editar-cliente/editar-cliente.component'; 


interface Cliente {
  nombre: string;
  tipoCliente: string; // Nuevo campo
  tipoDocumento: string; // Nuevo campo
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
export class ClientesComponent {
  isSidebarVisible = true;
  clientes: Cliente[] = [
    {
      nombre: 'Miguel',
      tipoCliente: 'Particular', 
      tipoDocumento: 'DNI', 
      dniRuc: '71458957',
      direccion: 'Av. Panama 332',
      telefono: '987654321',
      correo: 'usuario1@gmail.com',
      estado: 'Disponible',
      fotoUrl: 'ruta/a/foto1.jpg'
    },
    {
      nombre: 'Laura',
      tipoCliente: 'Empresa', 
      tipoDocumento: 'RUC', 
      dniRuc: '20456789',
      direccion: 'Calle Ejemplo 123',
      telefono: '912345678',
      correo: 'usuario2@gmail.com',
      estado: 'No Disponible',
      fotoUrl: 'ruta/a/foto2.jpg'
    },
    // Añadir más clientes según sea necesario
  ];

  constructor(private dialog: MatDialog) {}

  // Función para abrir el modal de confirmación
  openConfirmDeleteModal(clienteNombre: string): void {
    const dialogRef = this.dialog.open(ConfirmDeleteModalComponent);

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.deleteCliente(clienteNombre); // Elimina al cliente si se confirma
      }
    });
  }

  // Elimina un cliente de la lista
  deleteCliente(clienteNombre: string): void {
    this.clientes = this.clientes.filter(cliente => cliente.nombre !== clienteNombre);
  }
  
  toggleSidebar() {
      this.isSidebarVisible = !this.isSidebarVisible;
    }

    openAgregarUsuarioModal(): void {
      const dialogRef = this.dialog.open(AgregarUsuarioComponent, {
        width: '400px', // Puedes ajustar el ancho del modal
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Agregar lógica para añadir un nuevo usuario a la lista si es necesario
          this.clientes.push(result); // Asumiendo que el modal retorna el nuevo cliente
        }
      });
    }
    
    openEditarClienteModal(cliente: Cliente): void {
      const dialogRef = this.dialog.open(EditarClienteComponent, {
        width: '400px',
        data: cliente  // Pasamos los datos del cliente seleccionado
      });
  
      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          // Actualiza el cliente en la lista si fue editado
          const index = this.clientes.findIndex(c => c.nombre === cliente.nombre);
          if (index !== -1) {
            this.clientes[index] = result;
          }
        }
      });
    }
}
