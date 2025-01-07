import { Component, EventEmitter, Input, Output } from '@angular/core';
import jsPDF from 'jspdf';
import 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-exportar-reporte',
  templateUrl: './exportar-reporte.component.html',
  styleUrls: ['./exportar-reporte.component.css']
})
export class ExportarReporteComponent {
  @Input() tableData: any[] = []; // Recibe los datos de la tabla
  @Output() onClose = new EventEmitter<void>();

  // Exportar a PDF
  exportToPDF() {
    const doc = new jsPDF();
    doc.text('Reporte de Datos', 10, 10);
    (doc as any).autoTable({
      head: [['Nombre', 'Tipo', 'Fecha', 'Dirección', 'Permisos', 'Estado', 'Categoría']],
      body: this.tableData.map(item => [
        item.name,
        item.type,
        item.date,
        item.address,
        item.permission,
        item.status,
        item.category
      ])
    });
    doc.save('reportes.pdf');
    this.closeModal();
  }

  // Exportar a Excel
  exportToExcel() {
    const worksheet = XLSX.utils.json_to_sheet(this.tableData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Reportes');
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data: Blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'reportes.xlsx');
    this.closeModal();
  }

  closeModal() {
    this.onClose.emit();
  }
}
