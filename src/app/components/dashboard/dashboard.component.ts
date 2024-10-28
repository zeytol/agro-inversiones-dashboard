import { Component, OnInit } from '@angular/core';
import { ApexChart, ApexAxisChartSeries, ApexXAxis, ApexPlotOptions, ApexStroke } from 'ng-apexcharts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  isSidebarVisible = true;
  charts: any[] = [];

  ngOnInit(): void {
    this.initCharts();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300); 
  }

  private initCharts() {
    this.charts = [
      {
        title: 'Total de Ventas',
        series: [{ name: "Ventas", data: [50, 70, 80, 90, 100, 130, 150] }],
        chart: { type: 'line', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul'] },
        stroke: { curve: 'smooth' }
      },
      {
        title: 'Facturas Pendientes',
        series: [40, 25, 15, 20],
        chart: { type: 'donut', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        labels: ['0-30 días', '30-60 días', '60-90 días', '90+ días']
      },
      {
        title: 'Pagos Recientes',
        series: [{ name: "Pagos", data: [10, 20, 15, 25, 30] }],
        chart: { type: 'bar', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['01 Sep', '05 Sep', '10 Sep', '15 Sep', '20 Sep'] },
        plotOptions: { bar: { horizontal: true } }
      },
      {
        title: 'Total de Clientes Nuevos',
        series: [{ name: "Clientes Nuevos", data: [5, 10, 15, 20, 25] }],
        chart: { type: 'bar', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] }
      },
      {
        title: 'Facturas Emitidas',
        series: [{ name: "Facturas Emitidas", data: [30, 40, 35, 50, 45] }],
        chart: { type: 'area', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] }
      },
      {
        title: 'Top Clientes',
        series: [{ name: "Compras", data: [100, 90, 80, 70, 60] }],
        chart: { type: 'bar', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Cliente A', 'Cliente B', 'Cliente C', 'Cliente D', 'Cliente E'] },
        plotOptions: { bar: { horizontal: true } }
      },
      {
        title: 'Ventas por Producto',
        series: [{ name: "Ventas", data: [200, 150, 300, 400, 250] }],
        chart: { type: 'bar', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Producto A', 'Producto B', 'Producto C', 'Producto D', 'Producto E'] }
      },
      {
        title: 'Tasa de Conversión de Clientes',
        series: [{ name: "Conversión", data: [2, 3, 4, 5, 6] }],
        chart: { type: 'line', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May'] },
        stroke: { curve: 'smooth' }
      },
      {
        title: 'Distribución de Clientes por Región',
        series: [30, 25, 15, 20, 10],
        chart: { type: 'donut', height: '90%' }, // Cambia aquí para hacer más grande el gráfico
        labels: ['Región A', 'Región B', 'Región C', 'Región D', 'Región E']
      }
    ];
}

  private updateChartsSize() {
    // Aquí puedes actualizar las opciones de los gráficos si es necesario
    this.charts.forEach(chart => chart.chart.redraw());
  }
}
