import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ReportesService } from '../../../services/reportes.service';


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
    description: '',
    total: 0,
    subTotal: 0,
    igv: 0
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onSave = new EventEmitter<any>();
  isTipoReporteModalOpen: boolean = false;
  selectedReportType: string = '';
  tableData: any[] = [];

  constructor(private http: HttpClient, private reportesService: ReportesService ) { }

  ngOnInit() {
    const today = new Date();
    this.report.date = today.toISOString().split('T')[0];
  }

  // Recibe el tipo de reporte seleccionado desde el componente TipoReporteComponent
  @Input() set reportType(type: string) {
    this.selectedReportType = type;
    this.report.type = type;
    this.tableData = [];
    this.loadReportData(type);
  }

  openTipoReporteModal() { this.isTipoReporteModalOpen = true; }

  closeTipoReporteModal() { this.isTipoReporteModalOpen = false; }

   // Manejar selección del tipo de reporte
   handleReportTypeSelection(selectedType: string) {
    this.selectedReportType = selectedType;
    this.report.type = selectedType;

      if (selectedType.toLowerCase() === 'ventas') {
        this.report.category = 'Ventas';
      } else if (selectedType.toLowerCase() === 'finanzas') {
        this.report.category = 'Finanzas';
      } else {
        this.report.category = '';
      }

    this.loadReportData(selectedType);
  }

   // Cargar datos según el tipo de reporte
  loadReportData(reportType: string) {
  const type = reportType.toLowerCase();

    if (type === 'ventas') {
      this.reportesService.getReporteVentas('05-2025').subscribe({
        next: (data: any) => {
          const ventas: any[] = data.ventasDelMes || [];
          console.log("Datos de ventas:", ventas);

          this.tableData = ventas;

          const total = ventas.reduce((sum, venta) => sum + venta.total, 0);
          const subtotal = ventas.reduce((sum, venta) => sum + venta.subTotal, 0);
          const igv = ventas.reduce((sum, venta) => sum + venta.igv, 0);

          this.report.total = total;
          this.report.subTotal = subtotal;
          this.report.igv = igv;
      },
      error: (err) => {
        console.error("Error al generar reporte de ventas:", err);
        alert("Error al obtener las ventas del mes.");
      }
    });
  }

    // Si el tipo es "finanzas", puedes implementar lo siguiente:
    else if (type === 'finanzas') {
      this.reportesService.getReporteFinanzas('12-2024').subscribe({
        next: (data: any) => {
          const finanzas: any[] = data.finanzasDelMes || [];
          console.log("Datos de finanzas:", finanzas);  

          this.tableData = finanzas;

          const total = finanzas.reduce((sum, finanza) => sum + finanza.total, 0);
          const subtotal = finanzas.reduce((sum, finanza) => sum + finanza.subTotal, 0);
          const igv = finanzas.reduce((sum, finanza) => sum + finanza.igv, 0);

          this.report.total = total;
          this.report.subTotal = subtotal;
          this.report.igv = igv;
      },
      error: (err) => {
        console.error("Error al generar reporte de finanzas:", err);
        alert("Error al obtener las finanzas del mes.");
      }
    });
  }
}

  // Guardar reporte
  saveReport() {
    if (!this.report.name || !this.selectedReportType || !this.report.date) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }
  
    // Obtener reportes actuales del localStorage
    const savedReports = JSON.parse(localStorage.getItem('savedReports') || '[]');
    savedReports.push(this.report);
  
    // Guardar el nuevo array en localStorage
    localStorage.setItem('savedReports', JSON.stringify(savedReports));
  
    this.onSave.emit(this.report);
    this.closeModal();
  }

  closeModal() {
    this.onClose.emit();
  }
}
