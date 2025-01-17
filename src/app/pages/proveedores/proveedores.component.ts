import { Component, OnInit } from '@angular/core';
import { SuppliersService } from '../../services/suppliers.service';
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
  isActive: boolean = false;
  isInactive: boolean = false;

  categories: any[] = [];
  proveedores: any[] = [];
  filteredProveedores: any[] = [];

  newProveedor = {
    ruc: '',
    name: '',
    contact: '',
    phone: '',
    addres: '',
    categorySuppliers: { id: 0, name: '' },
    registration_date: '',
    state: 'Activo',
    selected: false
  };

  selectedProveedor: any = null;

  // Propiedades para mostrar los modales
  showAddModal: boolean = false;
  showEditModal: boolean = false;
  showDeleteModal: boolean = false;
  showViewModal: boolean = false;
  showIncompleteFieldsModal: boolean = false;
  showSuccessModal: boolean = false;
  showErrorModal: boolean = false;
  showModalEditarExito: boolean = false;
  showModalEditarError: boolean = false;
  showModalEliminarExito: boolean = false;
  showModalEliminarError: boolean = false;

  constructor(private suppliersService: SuppliersService) {}

  ngOnInit(): void {
    this.loadProveedores();
    this.loadCategories();
    this.applyFilters();
  }

  loadProveedores(): void {
    this.suppliersService.getSuppliers().subscribe(
      (data) => {
        console.log('Proveedores recibidos:', data);
        this.proveedores = data;
  
        // Extraer categorías únicas de los proveedores (como string, no como objetos)
        this.categories = Array.from(
          new Set(this.proveedores.map((proveedor) => proveedor.categorySuppliers))
        ).filter((category) => category !== undefined);
  
        this.applyFilters();
      },
      (error) => {
        console.error('Error al cargar proveedores:', error);
      }
    );
  }

  loadCategories(): void {
    this.suppliersService.getCategories().subscribe(
      (data) => {
        console.log('Categorías recibidas:', data);
        this.categories = data;
      },
      (error) => {
        console.error('Error al cargar las categorías:', error);
      }
    );
  }

  applyFilters(): void {
    this.filteredProveedores = this.proveedores.filter(proveedor => {
      // Filtro por búsqueda (RUC o email)
      const matchesSearchTerm = this.searchTerm
      ? (proveedor.ruc && proveedor.ruc.toLowerCase().includes(this.searchTerm.toLowerCase())) ||
        (proveedor.contact && proveedor.contact.toLowerCase().includes(this.searchTerm.toLowerCase()))
      : true;

      // Filtro por categoría
      const matchesCategory = this.selectedCategory === 'all' || proveedor.categorySuppliers?.name === this.selectedCategory;

      // Filtro por estado
      const isActiveMatch = this.isActive ? proveedor.state === 'Activo' : true;
      const isInactiveMatch = this.isInactive ? proveedor.state === 'Inactivo' : true;

      return matchesSearchTerm && matchesCategory && isActiveMatch && isInactiveMatch;
    });
  }

  onFilterChange(): void {
    this.applyFilters();
  }

  // Método para seleccionar o desmarcar todos los proveedores
  toggleAll(event: any): void {
    const isChecked = event.target.checked;
    this.proveedores.forEach(proveedor => proveedor.selected = isChecked);
  }

  validateFields(): boolean {
    const { ruc, name, contact, phone, addres, categorySuppliers } = this.newProveedor;
    return !!(ruc && name && contact && phone && addres && categorySuppliers.id); // Verifica que todos los campos estén llenos
  }

  addProveedor(): void {
    // Verificar si los campos están completos y correctos
    if (!this.validateFields()) {
      this.showIncompleteFieldsModal = true; // Muestra el modal de advertencia
      return;
    }
  
    const newProveedor = {
      ...this.newProveedor,
      registration_date: new Date().toISOString(),
      categorySuppliers: { id: this.newProveedor.categorySuppliers.id }
    };
  
    // Llamar al servicio para agregar el proveedor
    this.suppliersService.addSupplier(newProveedor).subscribe(
      (response) => {
        console.log('Proveedor agregado con éxito:', response);
        if (response) {
          // Agrega el proveedor a la lista original y filtrada
          this.proveedores.push(response);
          this.filteredProveedores = [...this.proveedores]; // Actualiza la lista filtrada
          this.resetNewProveedor();
          this.closeModal();
          this.showSuccessModal = true;  // Mostrar el modal de éxito
          
          // Cerrar el modal de éxito después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showSuccessModal = false; // Cerrar el modal de éxito
            window.location.reload(); // Recargar la página
          }, 3000); // 3000 ms = 3 segundos
        }
      },
      (error) => {
        console.error('Error al agregar proveedor:', error);
        this.showErrorModal = true;  // Mostrar el modal de error
        
        // Cerrar el modal de error después de 3 segundos y refrescar la página
        setTimeout(() => {
          this.showErrorModal = false; // Cerrar el modal de error
          window.location.reload(); // Recargar la página
        }, 3000); // 3000 ms = 3 segundos
      }
    );
  }
  
  
  closeIncompleteFieldsModal(): void {
    this.showIncompleteFieldsModal = false;
  }

  // Método de validación del formulario
  isFormValid() {
    return (
      this.newProveedor.ruc && this.newProveedor.ruc.length === 11 &&
      this.newProveedor.name && this.newProveedor.name.length <= 50 &&
      this.newProveedor.contact && this.newProveedor.contact.includes('@') &&
      this.newProveedor.phone && this.newProveedor.phone.length === 9 &&
      this.newProveedor.addres && this.newProveedor.addres.length <= 30 &&
      this.newProveedor.categorySuppliers.id &&
      this.newProveedor.registration_date &&
      this.newProveedor.state
    );
  }

  resetNewProveedor(): void {
    this.newProveedor = {
      ruc: '',
      name: '',
      contact: '',
      phone: '',
      addres: '',
      categorySuppliers: { id: 0, name: '' },
      registration_date: '',
      state: 'Activo',
      selected: false
    };
  }

  // Métodos para abrir y cerrar modales
  openAddModal(): void {
    this.showAddModal = true;
    this.loadCategories();
  }

  openEditModal(): void {
    if (this.selectedProveedor) {
      this.showEditModal = true;
    }
  }

  openDeleteModal(): void {
    if (this.selectedProveedor) {
      this.showDeleteModal = true;
    }
  }

  openViewModal(): void {
    if (this.selectedProveedor) {
      this.showViewModal = true;
    }
  }

  // Método para cerrar el modal de éxito
  closeSuccessModal() {
    this.showSuccessModal = false;
  }

  // Método para cerrar el modal de error
  closeErrorModal() {
    this.showErrorModal = false;
  }

  closeModal(): void {
    this.showAddModal = false;
    this.showEditModal = false;
    this.showDeleteModal = false;
    this.showViewModal = false;
  }

  // Método para editar proveedor
editProveedor(): void {
  if (this.selectedProveedor) {
    const proveedorEditado = { ...this.selectedProveedor }; 
    const proveedorId = this.selectedProveedor.id; 

    this.suppliersService.editSupplier(proveedorId, proveedorEditado).subscribe(
      (response) => {
        console.log('Proveedor editado con éxito:', response);

        // Actualizar los datos de los proveedores en el array local
        const index = this.proveedores.findIndex(prov => prov.id === proveedorId);
        if (index !== -1) {
          this.proveedores[index] = response;
          this.filteredProveedores[index] = response;
        }

        // Mostrar el modal de éxito
        this.showModalEditarExito = true;

        // Cerrar el modal de edición
        this.closeModal();

        // Cerrar el modal de éxito después de 3 segundos y refrescar la página
        setTimeout(() => {
          this.showModalEditarExito = false; // Cerrar el modal de éxito
          window.location.reload(); // Recargar la página
        }, 3000); // 3000 ms = 3 segundos
      },
      (error) => {
        console.error('Error al editar proveedor:', error);

        // Mostrar el modal de error
        this.showModalEditarError = true;

        // Cerrar el modal de edición
        this.closeModal();

        // Cerrar el modal de error después de 3 segundos y refrescar la página
        setTimeout(() => {
          this.showModalEditarError = false; // Cerrar el modal de error
          window.location.reload(); // Recargar la página
        }, 3000); // 3000 ms = 3 segundos
      }
    );
  }
}

  openModalEditarExito() {
    this.showModalEditarExito = true;
  }

  openModalEditarError() {
    this.showModalEditarError = true;
  }

  openModalEliminarExito() {
    this.showModalEliminarExito = true;
  }

  openModalEliminarError() {
    this.showModalEliminarError = true;
  }

  // Método para eliminar proveedor
  deleteProveedor(): void {
    if (this.selectedProveedor && this.selectedProveedor.id) {
      const proveedorId = this.selectedProveedor.id;
  
      this.suppliersService.deleteSupplier(proveedorId).subscribe(
        (response) => {
          console.log('Proveedor eliminado con éxito:', response);
  
          // Elimina el proveedor de las listas locales
          this.proveedores = this.proveedores.filter(prov => prov.id !== proveedorId);
          this.filteredProveedores = this.filteredProveedores.filter(prov => prov.id !== proveedorId);
  
          this.closeModal(); // Cierra el modal de eliminación
  
          // Mostrar el modal de éxito
          this.showModalEliminarExito = true;
  
          // Cerrar el modal de éxito después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showModalEliminarExito = false; // Cerrar el modal de éxito
            window.location.reload(); // Recargar la página
          }, 3000); // 3000 ms = 3 segundos
        },
        (error) => {
          console.error('Error al eliminar proveedor:', error);
  
          // Mostrar el modal de error
          this.showModalEliminarError = true;
  
          // Cerrar el modal de error después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showModalEliminarError = false; // Cerrar el modal de error
            window.location.reload(); // Recargar la página
          }, 3000); // 3000 ms = 3 segundos
        }
      );
    }
  }

  // Verifica si hay un proveedor seleccionado
  hasSelectedProveedor(): boolean {
    return this.selectedProveedor !== null;
  }

  // Asigna un proveedor como seleccionado
  selectProveedor(proveedor: any): void {
    this.selectedProveedor = proveedor;
  }

  toggleSidebar(): void {
    this.isSidebarVisible = !this.isSidebarVisible;
  }
}
