import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ReportesService } from '../../../services/reportes.service';


@Component({
  selector: 'app-editar-reporte',
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.css']
})

export class EditarReporteComponent {
  // Datos actuales del reporte para editar
  @Input() report: any = {
    name: '',
    type: '',
    date: '',
    address: '',
    permission: '',
    status: '',
    category: '',
    description: '',
    subTotal: 0,
    igv: 0,
    total: 0
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<any>();
  isTipoReporteModalOpen: boolean = false;
  selectedReportType: string = '';
  tableData: any[] = [];

  constructor(private reportesService: ReportesService) { }


  ngOnInit() {
    this.selectedReportType = this.report.type;
    this.loadReportData(this.report.type.toLowerCase());
  }


  // Manejar la selección del tipo de reporte
  handleReportTypeSelection(type: string) {
    this.selectedReportType = type;
    this.report.type = type;

    // Actualizar la categoría según el tipo de reporte
    if (type.toLowerCase() === 'ventas') {
      this.report.category = 'Ventas';
    } else if (type.toLowerCase() === 'finanzas') {
      this.report.category = 'Finanzas';
    }

    // Vaciar la tabla y cargar los datos correspondientes al tipo de reporte
    this.tableData = [];
    this.loadReportData(type.toLowerCase());
  }


  activeTab: 'facturas' | 'boletas' | 'resumen' = 'facturas';


  openTipoReporteModal() { this.isTipoReporteModalOpen = true; }

  closeTipoReporteModal() { this.isTipoReporteModalOpen = false; }


  // Cargar datos según el tipo de reporte
  loadReportData(reportType: string) {
    const type = reportType.toLowerCase();
    const now = new Date();
    const mes = String(now.getMonth() + 1).padStart(2, '0');
    const anio = now.getFullYear();
    const periodo = `${mes}-${anio}`;

    if (type === 'ventas') {
      this.reportesService.getReporteVentas(periodo).subscribe({
        next: (data: any) => {
          const ventas: any[] = data.ventasDelMes || [];
          console.log("Datos de ventas:", ventas);

          this.tableData = ventas;

          // Subtotal solo para facturas (base para IGV)
          const subtotalFacturas = ventas.reduce((sum, venta) =>
            venta.documentType === 'FACTURA' ? sum + (venta.subTotal || 0) : sum, 0);

          // IGV calculado sobre el subtotal de facturas
          const igv = subtotalFacturas * 0.18;

          // Total solo de facturas
          const totalFacturas = ventas.reduce((sum, venta) =>
            venta.documentType === 'FACTURA' ? sum + (venta.total || 0) : sum, 0);

          // Total solo de boletas
          const totalBoletas = ventas.reduce((sum, venta) =>
            venta.documentType === 'BOLETA' ? sum + (venta.total || 0) : sum, 0);

          // Total general (facturas + boletas)
          const totalGeneral = totalFacturas + totalBoletas;

          this.report.subTotal = parseFloat(subtotalFacturas.toFixed(2));
          this.report.igv = parseFloat(igv.toFixed(2));
          this.report.totalFacturas = parseFloat(totalFacturas.toFixed(2));
          this.report.totalBoletas = parseFloat(totalBoletas.toFixed(2));
          this.report.total = parseFloat(totalGeneral.toFixed(2));
        },
        error: (err) => {
          console.error("Error al generar reporte de ventas:", err);
          alert("Error al obtener las ventas del mes.");
        }
      });
    }

    // Si el tipo es "finanzas", puedes implementar lo siguiente:
    else if (type === 'finanzas') {
      this.reportesService.getReporteFinanzas(periodo).subscribe({
        next: (data: any) => {
          const finanzas: any[] = data.productosVendidos || [];
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

  // Actualizar reporte
  updateReport() {
    if (!this.report.name || !this.report.type || !this.report.date) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Emitir el evento con los datos actualizados
    this.onUpdate.emit(this.report);
    this.closeModal();
  }

  // Cerrar el modal
  closeModal() {
    this.onClose.emit();
  }
}
