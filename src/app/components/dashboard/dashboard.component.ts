import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexStroke } from 'ng-apexcharts';
import { DashboardService } from '../../services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarVisible = true;
  charts: any[] = [];
  constructor(private dashboardService: DashboardService){}
  

  ngOnInit(): void {
    this.dashboardService.getDashboardData().subscribe(data => {
      console.log('Datos del API:', data);
      this.transformDataToCharts(data);
    });
    //this.initCharts();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300); 
  }

  private transformDataToCharts(data: any) {
    this.charts = [
      {
        title: 'Total de Ventas por Mes',
        
        series: [{ name: 'Ventas', data: data.ventasPorMes }],
        chart: { type: 'line', height: '90%' },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] },
        stroke: { curve: 'smooth' }
      },
      {
        title: 'Facturas Pendientes',
        series: data.facturasPendientes,
        chart: { type: 'donut', height: '90%' },
        labels: ['0-30 días', '30-60 días', '60-90 días', '90+ días']
      },
      {
        title: 'Pagos Recientes',
        series: [{ name: 'Pagos', data: data.pagosRecientes.map((p: any) => p.num) }],
        chart: { type: 'bar', height: '90%' },
        xaxis: { categories: data.pagosRecientes.map((p: any) => p.string) },
        plotOptions: { bar: { horizontal: true } }
      },
      {
        title: 'Clientes Nuevos por Mes',
        series: [{ name: 'Clientes Nuevos', data: data.clientesNuevos }],
        chart: { type: 'bar', height: '90%' },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] }
      },
      {
        title: 'Facturas Emitidas',
        series: [{ name: 'Facturas', data: data.facturasEmitidas }],
        chart: { type: 'area', height: '90%' },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] },
        stroke: { curve: 'smooth' }
      },
      {
        title: 'Top Clientes',
        series: [{ name: 'Compras', data: data.topClientes.map((c: any) => c.num) }],
        chart: { type: 'bar', height: '90%' },
        xaxis: { categories: data.topClientes.map((c: any)=> c.string) },
        plotOptions: { bar: { horizontal: true } }
      },
      {
        title: 'Productos Más Vendidos',
        series: [{ name: 'Ventas', data: data.productosMasVendidos.map((p: any) => p.num) }],
        chart: { type: 'bar', height: '90%' },
        xaxis: { categories: data.productosMasVendidos.map((p: any) => p.string) }
      },
      {
        title: 'Conversión de Clientes',
        series: [{ name: 'Conversión', data: data.conversionClientes }],
        chart: { type: 'line', height: '90%' },
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] },
        stroke: { curve: 'smooth' }
      },
      {
        title: 'Distribución de Clientes por Región',
        series: data.distribucionClientes.map((r: any) => r.num),
        chart: { type: 'donut', height: '90%' },
        labels: data.distribucionClientes.map((r: any) => r.string.trim())
      }
    ];
  }
  

  private updateChartsSize() {
    // Aquí puedes actualizar las opciones de los gráficos si es necesario
    this.charts.forEach(chart => chart.chart.redraw());
  }
  
  
}
