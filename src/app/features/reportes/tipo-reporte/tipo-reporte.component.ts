import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tipo-reporte',
  templateUrl: './tipo-reporte.component.html',
  styleUrls: ['./tipo-reporte.component.css']
})
export class TipoReporteComponent {
  @Input() selectedReportType: string = '';
  @Input() tableData: any[] = []; // Recibe los datos de la tabla principal
  @Output() onClose = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

 
  // Solo los tipos de reporte "Finanzas" y "Venta"
  reportTypes = [
    { name: 'Finanzas' },
    { name: 'Ventas' }
  ];

  filteredData: any[] = [];
  //selectedReportType: string = '';

  // Filtra los datos según el tipo seleccionado
  selectReportType(reportType: string) {
    this.selectedReportType = reportType;
  
    if (reportType === 'Ventas') {
      this.filteredData = this.tableData;
    } else if (reportType === 'Finanzas') {
      this.filteredData = []; // Asegurarse de que la tabla de ventas esté vacía
      console.log("Seleccionado 'Finanzas', pero no se ha cargado ningún dato aún.");

    }

    console.log("Datos filtrados:", this.filteredData);

    // Emitir tipo seleccionado inmediatamente
    this.onSelect.emit(reportType); // Emitir para cargar los datos
  }

  // Confirmar selección
  confirmSelection() {
    this.onSelect.emit(this.selectedReportType); // Envía solo el tipo de reporte seleccionado
    this.closeModal();
  }


  // Cerrar modal
  closeModal() {
    this.onClose.emit();
  }
}
