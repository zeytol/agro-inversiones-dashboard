import { Component, OnInit, OnDestroy } from '@angular/core';
import { ApexChart, ApexXAxis, ApexPlotOptions, ApexStroke } from 'ng-apexcharts';
import { ReportesService } from '../../services/reportes.service';
import { Subscription } from 'rxjs';

interface ReporteDashboard {
  ventasPorMes: number[];
  facturasPendientes: number[];
  pagosRecientes: { num: number; string: string }[];
  clientesNuevos: number[];
  facturasEmitidas: number[];
  topClientes: { num: number; string: string }[];
  productosMasVendidos: { num: number; string: string }[];
  conversionClientes: number[];
  distribucionClientes: { num: number; string: string }[];
}

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit, OnDestroy {
  isSidebarVisible = true;
  charts: any[] = [];
  private subscription: Subscription | undefined;

  constructor(private reportesService: ReportesService) {}

  ngOnInit(): void {
    //this.getGraficosDashboard();
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    //setTimeout(() => this.updateChartsSize(), 300);
  }

  /*private getGraficosDashboard() {
    this.subscription = this.reportesService.getReporteGraficosDashboard().subscribe((data: ReporteDashboard) => {
      this.charts = [
        {
          title: 'Total de Ventas',
          series: [{ name: "Ventas", data: data.ventasPorMes }],
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
          series: [{ name: "Pagos", data: data.pagosRecientes.map((item: { num: number }) => item.num) }],
          chart: { type: 'bar', height: '90%' },
          xaxis: { categories: data.pagosRecientes.map((item: { string: string }) => item.string) },
          plotOptions: { bar: { horizontal: true } }
        },
        {
          title: 'Total de Clientes Nuevos',
          series: [{ name: "Clientes Nuevos", data: data.clientesNuevos }],
          chart: { type: 'bar', height: '90%' },
          xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] }
        },
        {
          title: 'Facturas Emitidas',
          series: [{ name: "Facturas Emitidas", data: data.facturasEmitidas }],
          chart: { type: 'area', height: '90%' },
          xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] }
        },
        {
          title: 'Top Clientes',
          series: [{ name: "Compras", data: data.topClientes.map((item: { num: number }) => item.num) }],
          chart: { type: 'bar', height: '90%' },
          xaxis: { categories: data.topClientes.map((item: { string: string }) => item.string) },
          plotOptions: { bar: { horizontal: true } }
        },
        {
          title: 'Ventas por Producto',
          series: [{ name: "Ventas", data: data.productosMasVendidos.map((item: { num: number }) => item.num) }],
          chart: { type: 'bar', height: '90%' },
          xaxis: { categories: data.productosMasVendidos.map((item: { string: string }) => item.string) }
        },
        {
          title: 'Tasa de Conversión de Clientes',
          series: [{ name: "Conversión", data: data.conversionClientes }],
          chart: { type: 'line', height: '90%' },
          xaxis: { categories: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'] },
          stroke: { curve: 'smooth' }
        },
        {
          title: 'Distribución de Clientes por Región',
          series: data.distribucionClientes.map((item: { num: number }) => item.num),
          chart: { type: 'donut', height: '90%' },
          labels: data.distribucionClientes.map((item: { string: string }) => item.string.trim())
        }
      ];
    }, error => {
      console.error('Error obteniendo datos del dashboard:', error);
    });
  }*/

  /*private updateChartsSize() {
    this.charts.forEach(chart => chart.chart?.redraw());
  }*/
}