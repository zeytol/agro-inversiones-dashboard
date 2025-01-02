import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

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
    series: [
      {
        name: 'Ventas Mensuales',
        data: [50, 70, 40, 80, 100, 60, 90]
      }
    ],
    chart: {
      type: 'line',
      height: 250 // Altura reducida
    },
    title: {
      text: 'Promedio de Ventas por Mes',
      align: 'left'
    },
    xaxis: {
      categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul']
    }
  };

  // Configuración del gráfico circular
  pieChartOptions: any = {
    series: [30, 25, 15, 20, 10],
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
    series: [75], // Porcentaje (por ejemplo, 75%)
    chart: {
      type: 'radialBar',
      height: 200 // Altura reducida
    },
    plotOptions: {
      radialBar: {
        hollow: {
          size: '60%' // Tamaño del círculo interior
        },
        dataLabels: {
          name: {
            show: false
          },
          value: {
            fontSize: '18px', // Tamaño del texto reducido
            color: '#4caf50',
            fontWeight: 'bold'
          }
        }
      }
    },
    labels: ['Total de Ventas']
  };

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Cargar datos desde el archivo JSON
    this.http.get<any[]>('assets/reports.json').subscribe((data) => {
      this.reports = data;
      this.filteredReports = data; // Inicialmente, todos los datos están visibles
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
