import { Component, OnInit } from '@angular/core';
import { ReportesService } from '../../services/reportes.service'; // Asegúrate de que la ruta sea correcta

@Component({
  selector: 'app-reportes',
  templateUrl: './reportes.component.html',
  styleUrls: ['./reportes.component.css']
})
export class ReportesComponent implements OnInit {
  isSidebarVisible = true;
  isFilterModalOpen = false;

  // Filtros
  filterStatus: string = '';
  filterCategory: string = '';

  // Datos originales y filtrados
  reports: any[] = [];
  filteredReports: any[] = [];

  // Configuración del gráfico de línea
  lineChartOptions: any = {
    series: [], // Se actualizará dinámicamente
    chart: {
      type: 'line',
      height: 350
    },
    title: {
      text: 'Ventas Mensuales',
      align: 'center'
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic']
    }
  };

  // Configuración del gráfico circular
  pieChartOptions: any = {
    series: [],
    chart: {
      type: 'pie',
      height: 250 // Altura reducida
    },
    labels: ['Ventas', 'Inventario', 'Clientes', 'Proveedores', 'Finanzas'],
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 180
          },
          legend: {
            position: 'bottom'
          }
        }
      }
    ]
  };

  // Configuración del gráfico radial para "Suma Total de Ventas"
  radialBarChartOptions: any = {
    series: [], // Se actualizará dinámicamente
    chart: {
      type: 'radialBar',
      height: 350
    },
    plotOptions: {
      radialBar: {
        hollow: { size: '70%' }
      }
    },
    labels: ['Ganancia del Mes']
  };

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    
    this.loadReportes();
  }

  loadReportes(): void {

    //const fechaActual = new Date().toISOString().split('T')[0]; // Obtiene la fecha actual en formato YYYY-MM-DD

    const fechaActual = new Date();
    const mes = String(fechaActual.getMonth() + 1).padStart(2, '0'); // Asegurar formato "01", "02", etc.
    const anio = fechaActual.getFullYear();
    const fecha = `${anio}-${mes}`; // Formato "YYYY-MM"
    
    this.reportesService.getReporteVentas('01-2025').subscribe((data) => {
      console.log(data);
  });
  
    this.reportesService.getReporteClientes(1).subscribe((data) => {    
      this.reports = data.ventasDeCliente;  
      this.filteredReports = data.ventasDeCliente;
    });
    
    
    this.reportesService.getReporteGraficos().subscribe((data) => {
      console.log(data);
    });
    
    
    this.reportesService.getReporteGraficos().subscribe((data) => {
      console.log(data); // Asegúrate de ver qué datos llegan desde la API
  
      // Validar datos antes de asignarlos para evitar errores con NaN
      this.pieChartOptions.series = [
        Number(data.ventas) || 0,
        Number(data.inventario) || 0,
        Number(data.clientes) || 0,
        Number(data.proveedores) || 0,
        Number(data.finanzas) || 0
      ];
  
      this.lineChartOptions.series = [
        {
          name: 'Ventas por Mes',
          data: data.ventasPorMes || []
        }
      ];
  
      this.radialBarChartOptions.series = [
        Number(data.gan1Month) || 0
      ];
    });
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
  }

  // Abrir el modal
  openFilterModal() {
    this.isFilterModalOpen = true;
  }

  // Cerrar el modal
  closeFilterModal() {
    this.isFilterModalOpen = false;
  }

  // Aplicar filtros
  applyFilters() {
    this.filteredReports = this.reports.filter((report) => {
      const matchesStatus = this.filterStatus
        ? report.status === this.filterStatus
        : true;
      const matchesCategory = this.filterCategory
        ? report.category.toLowerCase().includes(this.filterCategory.toLowerCase())
        : true;
      return matchesStatus && matchesCategory;
    });
    this.closeFilterModal();
  }

  isAddReportModalOpen = false;

  openAddReportModal() {
    this.isAddReportModalOpen = true;
  }

  closeAddReportModal() {
    this.isAddReportModalOpen = false;
  }

  addReportToTable(newReport: any) {
    this.reports.push(newReport);
    this.filteredReports = [...this.reports];
  }

  isEditModalOpen = false;
  selectedReport: any = null;

  openEditModal(report: any) {
    this.selectedReport = { ...report }; // Crear una copia del reporte seleccionado
    this.isEditModalOpen = true;
  }

  closeEditModal() {
    this.isEditModalOpen = false;
    this.selectedReport = null;
  }

  updateReport(updatedReport: any) {
    const index = this.reports.findIndex((r) => r.name === updatedReport.name);
    if (index !== -1) {
      this.reports[index] = updatedReport;
      this.filteredReports = [...this.reports]; // Actualizar tabla filtrada
    }
    this.closeEditModal();
  }

  deleteReport(index: number) {
    const confirmed = confirm('¿Estás seguro de que deseas eliminar este reporte?');
    if (confirmed) {
      this.reports.splice(index, 1); // Elimina el reporte del array principal
      this.filteredReports = [...this.reports]; // Actualiza la tabla filtrada
    }
  }

  isExportModalOpen: boolean = false;

  openExportModal() {
    this.isExportModalOpen = true;
  }

  closeExportModal() {
    this.isExportModalOpen = false;
  }
}
