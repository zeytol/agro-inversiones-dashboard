import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-tipo-reporte',
  templateUrl: './tipo-reporte.component.html',
  styleUrls: ['./tipo-reporte.component.css']
})
export class TipoReporteComponent {
  @Input() tableData: any[] = []; // Recibe los datos de la tabla principal
  @Output() onClose = new EventEmitter<void>();
  @Output() onSelect = new EventEmitter<string>();

  reportTypes = [
    { name: 'Informe Financiero' },
    { name: 'Reporte de Inventario' },
    { name: 'Análisis de Clientes' },
    { name: 'Reporte de Proveedores' }
  ];

  filteredData: any[] = [];
  selectedReportType: string = '';

  // Filtra los datos según el tipo seleccionado
  selectReportType(reportType: string) {
    this.selectedReportType = reportType;
    this.filteredData = this.tableData.filter((item) => item.type === reportType);
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
