import { Component,Output,EventEmitter } from '@angular/core';
import Swal from 'sweetalert2';

interface Documento {
  fecha: string;
  tipo?: string; // Tipo de documento (opcional)
  numero: string;
  cliente: string;
  monto: number;
  estado: number;
}
@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  selectedDate: string = ''; // Fecha seleccionada en formato 'yyyy-MM-dd'
  formattedDate: string = ''; // Fecha formateada en formato 'mm/dd/yyyy'
  isSidebarVisible: boolean = true;
    @Output() sidebarToggle = new EventEmitter<void>();


    documents: Documento[] = [
      {
        fecha: '01/02/2001',
        tipo: 'Factura',
        numero: '12345678901',
        cliente: 'contacto@tubermix.com',
        monto: 23,
        estado: 23
      },
      {
        fecha: '01/02/2001',
        numero: '20546789012',
        cliente: 'contacto@construtec.com',
        monto: 40,
        estado: 40
      },
      {
        fecha: '01/02/2001',
        numero: '20487654321',
        cliente: 'ventas@insumosagri.com',
        monto: 56,
        estado: 56
      },
      {
        fecha: '01/02/2001',
        numero: '20123456789',
        cliente: 'info@metalesperu.com',
        monto: 12,
        estado: 12
      },
      {
        fecha: '01/02/2001',
        numero: '20348789021',
        cliente: 'distribu@industriales.com',
        monto: 25,
        estado: 25
      },
      {
        fecha: '01/02/2001',
        numero: '20678901234',
        cliente: 'contacto@electroglobal.com',
        monto: 56,
        estado: 56
      },
      {
        fecha: '01/02/2001',
        numero: '20234567890',
        cliente: 'admin@tecnoco.com',
        monto: 4,
        estado: 4
      }
    ];
    constructor() { }

    ngOnInit(): void {
    }
    updateFormattedDate(): void {
      if (this.selectedDate) {
        const [year, month, day] = this.selectedDate.split('-');
        this.formattedDate = `${day}/${month}/${year}`; // Formato 'dd/mm/yyyy'
      } else {
        this.formattedDate = '';
      }
    }
    openDatePicker(): void {
      // Aquí iría la lógica para abrir el selector de fecha
      // Puedes usar un componente de datepicker de Angular Material o similar
    }
  
    
    clearDate(): void {
      this.selectedDate = '';
      this.formattedDate = '';
    }
  
    confirmDate(): void {
      console.log('Fecha confirmada:', this.formattedDate);
    }

    buscarDocumentos(termino: string): void {
      console.log('Buscando:', termino);
      // Implementar lógica de búsqueda
    }
    
    filtrarPorFecha(fecha: string): void {
      console.log('Filtrando por fecha:', fecha);
      // Implementar lógica de filtrado por fecha
    }
    
    agregarDocumento(): void {
      console.log('Agregar nuevo documento');
      // Implementar lógica para agregar documento
    }
    
    descargarDocumento(documento: Documento): void {
      Swal.fire({
        title: '¿Desea descargar este registro?',
        text: `Documento: ${documento.numero || 'sin número'}`,
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire({
            title: 'Descargado!',
            text: 'El documento se ha descargado correctamente.',
            icon: 'success',
            timer: 2000,
            showConfirmButton: false,
            allowOutsideClick: false,
            didOpen: () => {
              // Aquí puedes colocar tu lógica real de descarga:
              console.log('Descargando documento:', documento);
    
              // Simulación o llamada real a servicio de descarga:
              // this.servicioDescarga.descargar(documento).subscribe(...)
            }
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelado',
            text: 'La descarga ha sido cancelada.',
            icon: 'error',
            showConfirmButton: false,
            timer: 2000
          });
        }
      });
    }
    
    eliminarDocumento(documento: Documento): void {
      console.log('Eliminando documento:', documento);
      // Implementar lógica de eliminación
    }
    
    editarDocumento(documento: Documento): void {
      console.log('Editando documento:', documento);
      // Implementar lógica de edición
    }
    
    enviarDocumento(documento: Documento): void {
      console.log('Enviando documento:', documento);
      // Implementar lógica de envío
    }
    
    cambiarPagina(pagina: number): void {
      console.log('Cambiando a página:', pagina);
      // Implementar lógica de paginación
    }
  

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
    this.sidebarToggle.emit();
  }

}
