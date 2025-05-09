import { Component,Output,EventEmitter, OnInit } from '@angular/core';
import { DocumentService, Documento } from '../../services/document.service';
import Swal from 'sweetalert2';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';


@Component({
  selector: 'app-gestion',
  templateUrl: './gestion.component.html',
  styleUrls: ['./gestion.component.css']
})
export class GestionComponent {
  selectedDate: string = ''; 
  formattedDate: string = ''; 
  isSidebarVisible: boolean = true;
  paginaActual: number = 1;
  documentosPorPagina: number = 10;
  documentosPaginados: Documento[] = [];
  documentosFiltrados: Documento[] = [];  
  documents: Documento[] = [];
  searchTerm: string = '';

    @Output() sidebarToggle = new EventEmitter<void>();

    constructor(private documentService: DocumentService) {}

    ngOnInit(): void {
      this.cargarDocumentos();
    }
    cargarDocumentos(): void {
      this.documentService.getDocumentos().subscribe({
        next: (data) => {
          this.documents = data;
          this.documentosFiltrados = data; // Inicialmente muestra todos
          this.paginaActual = 1;
          this.actualizarDocumentosPaginados();
        },
        error: (err) => {
          console.error('Error al cargar documentos:', err);
        }
      });
    }
    actualizarDocumentosPaginados(): void {
      const inicio = (this.paginaActual - 1) * this.documentosPorPagina;
      const fin = inicio + this.documentosPorPagina;
      this.documentosPaginados = this.documentosFiltrados.slice(inicio, fin);
    }
    filtrarPorBusqueda(): Documento[] {
      if (!this.searchTerm) {
        return this.documents; // Si no hay término de búsqueda, devuelve todos los documentos
      }
      return this.documents.filter(doc =>
        doc.cliente.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        doc.numeroDocumento.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
    buscarDocumentos(): void {
      const termino = this.searchTerm.trim().toLowerCase();
      if (!termino) {
        this.documentosFiltrados = this.documents;
      } else {
        this.documentosFiltrados = this.documents.filter(doc =>
          doc.cliente?.toLowerCase().includes(termino)
        );
      }
      this.paginaActual = 1;
      this.actualizarDocumentosPaginados();
    }
    /*updateFormattedDate(): void {
      if (this.selectedDate) {
        const date = new Date(this.selectedDate);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        this.formattedDate = `${day}/${month}/${year}`; // Formato 'dd/mm/yyyy'
      } else {
        this.formattedDate = '';
      }
    }*/
    clearDate(): void {
      this.selectedDate = '';
      this.formattedDate = '';
    }
    confirmDate(): void {
      console.log('Fecha confirmada:', this.formattedDate);
    }
    
    filtrarPorFecha(fecha: string): void {
      if (!fecha) {
        this.documentosFiltrados = this.documents; // Si no hay fecha, muestra todos los documentos
      } else {
        const fechaSeleccionada = new Date(fecha);
        this.documentosFiltrados = this.documents.filter(doc => {
          const fechaDocumento = new Date(doc.fechaEmision); // Asegúrate de que `doc.fecha` sea una propiedad válida
          return (
            fechaDocumento.getDate() === fechaSeleccionada.getDate() &&
            fechaDocumento.getMonth() === fechaSeleccionada.getMonth() &&
            fechaDocumento.getFullYear() === fechaSeleccionada.getFullYear()
          );
        });
      }
      this.paginaActual = 1; // Reinicia a la primera página
      this.actualizarDocumentosPaginados();
    }
    
    agregarDocumento(): void {
      console.log('Agregar nuevo documento');
      // Implementar lógica para agregar documento
    }
    descargarDocumento(documento: Documento): void {
      Swal.fire({
        title: '¿Desea descargar este registro?',
        text: `Documento:'sin número'}`,
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
      this.paginaActual = pagina;
      this.actualizarDocumentosPaginados();
    }
    cambiarPaginaSiguiente(): void {
      const totalPaginas = this.totalPaginas();
      if (this.paginaActual < totalPaginas) {
        this.paginaActual++;
        this.actualizarDocumentosPaginados();
        console.log('Cambiando a la siguiente página:', this.paginaActual);
      }
    }
    cambiarPaginaAnterior(): void {
      if (this.paginaActual > 1) {
        this.paginaActual--;
        this.actualizarDocumentosPaginados();
        console.log('Cambiando a la página anterior:', this.paginaActual);
      }
    }
    pageNumbers(): number[] {
      const totalPaginas = this.totalPaginas();
      return Array.from({ length: totalPaginas }, (_, i) => i + 1);
    }
  
    // Calcular el total de páginas
    totalPaginas(): number {
      return Math.ceil(this.documents.length / this.documentosPorPagina);
    }

    toggleSidebar(): void {
      this.isSidebarVisible = !this.isSidebarVisible;
      this.sidebarToggle.emit();
    }

}
