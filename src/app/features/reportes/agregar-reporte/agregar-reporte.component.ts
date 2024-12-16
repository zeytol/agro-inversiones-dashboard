import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-agregar-reporte',
  templateUrl: './agregar-reporte.component.html',
  styleUrls: ['./agregar-reporte.component.css']
})
export class AgregarReporteComponent {
  report = {
    name: '',
    type: '',
    date: '',
    address: '',
    permission: '',
    status: '',
    category: '',
    description: ''
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();

  isTipoReporteModalOpen: boolean = false;
  selectedReportType: string = '';
  tableData: any[] = []; // Almacena los datos cargados desde el JSON

  constructor(private http: HttpClient) {
    this.loadReports(); // Cargar los datos al inicializar el componente
  }

  // Cargar datos desde el archivo JSON
  loadReports() {
    this.http.get<any[]>('assets/reports.json').subscribe((data) => {
      this.tableData = data;
    });
  }

  // Abrir modal de Tipo de Reporte
  openTipoReporteModal() {
    this.isTipoReporteModalOpen = true;
  }

  // Cerrar modal de Tipo de Reporte
  closeTipoReporteModal() {
    this.isTipoReporteModalOpen = false;
  }

  // Manejar selección del tipo de reporte
  handleReportTypeSelection(selectedType: string) {
    this.selectedReportType = selectedType;
    this.report.type = selectedType; // Actualizar el reporte con el tipo seleccionado
    this.closeTipoReporteModal();
  }

  // Guardar reporte
  saveReport() {
    if (!this.report.name || !this.selectedReportType || !this.report.date) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    this.onSave.emit(this.report);
    this.closeModal();
  }

  // Cerrar modal
  closeModal() {
    this.onClose.emit();
  }
}
