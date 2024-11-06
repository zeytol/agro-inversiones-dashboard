import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-proveedores',
  templateUrl: './proveedores.component.html',
  styleUrls: ['./proveedores.component.css']
})
export class ProveedoresComponent implements OnInit {
  isSidebarVisible = true;
  searchTerm: string = '';
  selectedCategory: string = 'all';
  // Estado de los checkboxes para activos e inactivos
  isActive: boolean = false; // Desactivado por defecto
  isInactive: boolean = false; // Desactivado por defecto

  categories: string[] = ['Fungicidas', 'Pesticidas', 'Repelentes'];
  proveedores: any[] = []; // Inicializamos como un array vacío

  newProveedor = {
    ruc: '',
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    categoria: '',
    fechaRegistro: '',
    estado: 'Activo',
    selected: false
  };

  selectedProveedor: any = null;

  // Modals visibility
  showAddModal = false;
  showEditModal = false;
  showDeleteModal = false;
  showViewModal = false;

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible;
    setTimeout(() => this.updateChartsSize(), 300);
  }

  private updateChartsSize() {
    // Aquí puedes actualizar las opciones de los gráficos si es necesario
  }

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.loadProveedores();
  }

  loadProveedores() {
    this.http.get<any[]>('assets/dataProveedores.json').subscribe(data => {
      this.proveedores = data;
    }, error => {
      console.error('Error loading data:', error);
    });
  }

  openAddModal() {
    this.showAddModal = true;
    this.resetNewProveedor();
  }

  openEditModal() {
    const selected = this.proveedores.find(proveedor => proveedor.selected);
    if (selected) {
      this.selectedProveedor = { ...selected };
      this.showEditModal = true;
    }
  }

  openDeleteModal() {
    const selected = this.proveedores.find(proveedor => proveedor.selected);
    if (selected) {
      this.selectedProveedor = selected;
      this.showDeleteModal = true;
    }
  }

  openViewModal() {
    const selected = this.proveedores.find(proveedor => proveedor.selected);
    if (selected) {
      this.selectedProveedor = selected;
      this.showViewModal = true;
    }
  }

  closeModal() {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showViewModal = false;
    this.selectedProveedor = null;
    this.resetNewProveedor();
  }

  addProveedor() {
    this.proveedores.push({ ...this.newProveedor, fechaRegistro: new Date(this.newProveedor.fechaRegistro) });
    this.closeModal();
  }

  editProveedor() {
    const index = this.proveedores.findIndex(proveedor => proveedor.ruc === this.selectedProveedor.ruc);
    if (index !== -1) {
      this.proveedores[index] = { ...this.selectedProveedor };
    }
    this.closeModal();
  }

  deleteProveedor() {
    this.proveedores = this.proveedores.filter(proveedor => !proveedor.selected);
    this.closeModal();
  }

  hasSelectedProveedor() {
    return this.proveedores.some(proveedor => proveedor.selected);
  }

  selectProveedor(proveedor: any) {
    this.proveedores.forEach(p => p.selected = false);
    proveedor.selected = true;
  }

  toggleAll(event: Event) {
    const checked = (event.target as HTMLInputElement).checked;
    this.proveedores.forEach(proveedor => proveedor.selected = checked);
  }

  get filteredProveedores() {
    return this.proveedores.filter(proveedor => {
      const matchesCategory = this.selectedCategory === 'all' || proveedor.categoria === this.selectedCategory;
      const matchesState = (!this.isActive && !this.isInactive) || // Si ambos están desactivados, muestra todos
                            (this.isActive && proveedor.estado === 'Activo') || 
                            (this.isInactive && proveedor.estado === 'Inactivo');
      const matchesSearch = proveedor.ruc.includes(this.searchTerm) || proveedor.email.includes(this.searchTerm);
      return matchesCategory && matchesState && matchesSearch;
    });
  }

  resetNewProveedor() {
    this.newProveedor = {
      ruc: '',
      nombre: '',
      email: '',
      telefono: '',
      direccion: '',
      categoria: '',
      fechaRegistro: '',
      estado: 'Activo',
      selected: false
    };
  }
}
