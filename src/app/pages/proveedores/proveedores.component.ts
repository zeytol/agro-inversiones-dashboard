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
  p: number = 1;
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
  showInProgressModal: boolean = false;
  showInProgressModalEditar: boolean = false;
  showInProgressModalEliminar: boolean = false;


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
  
        // Obtener categorías únicas usando un Map
        this.categories = Array.from(
          new Map(
            this.proveedores
              .filter((proveedor) => proveedor.categorySuppliers) // Filtrar proveedores válidos
              .map((proveedor) => [
                proveedor.categorySuppliers.id,
                proveedor.categorySuppliers,
              ]) // Crear pares [id, objeto categoría]
          ).values() // Obtener solo los valores únicos
        );
  
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
      const matchesCategory =
      this.selectedCategory === 'all' ||
      (proveedor.categorySuppliers && proveedor.categorySuppliers.name === this.selectedCategory);

      // Filtro por estado
      const isActiveMatch = this.isActive ? proveedor.state === 'Activo' : true;
      const isInactiveMatch = this.isInactive ? proveedor.state === 'Inactivo' : true;

      return matchesSearchTerm && matchesCategory && isActiveMatch && isInactiveMatch;
    });
    this.p = 1; 
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
    if (!this.validateFields()) {
      this.showIncompleteFieldsModal = true; // Muestra el modal de advertencia
      return;
    }
  
    // Mostrar el modal "En proceso"
    this.showInProgressModal = true;
  
    const newProveedor = {
      ...this.newProveedor,
      registration_date: new Date().toISOString(),
      categorySuppliers: { id: this.newProveedor.categorySuppliers.id }
    };
  
    this.suppliersService.addSupplier(newProveedor).subscribe(
      (response) => {
        console.log('Proveedor agregado con éxito:', response);
        if (response) {
          this.proveedores.push(response);
          this.filteredProveedores = [...this.proveedores]; // Actualiza la lista filtrada
          this.resetNewProveedor();
          this.closeModal();
          this.showInProgressModal = false; // Ocultar el modal "En proceso"
          this.showSuccessModal = true; // Mostrar el modal de éxito
          
          // Cerrar el modal de éxito después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showSuccessModal = false; // Cerrar el modal de éxito
            window.location.reload(); // Recargar la página
          }, 3000); // 3000 ms = 3 segundos
        }
      },
      (error) => {
        console.error('Error al agregar proveedor:', error);
        this.showInProgressModal = false; // Ocultar el modal "En proceso"
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

      if (proveedorEditado.registration_date) {
        proveedorEditado.registration_date = new Date(proveedorEditado.registration_date).getTime();
      }

      const proveedorId = this.selectedProveedor.id;

      // Mostrar el modal "En proceso"
      this.showInProgressModalEditar = true;

      this.suppliersService.editSupplier(proveedorId, proveedorEditado).subscribe(
        (response) => {
          console.log('Proveedor editado con éxito:', response);

          // Actualizar la lista de proveedores
          const index = this.proveedores.findIndex(prov => prov.id === proveedorId);
          if (index !== -1) {
            this.proveedores[index] = response;
            this.filteredProveedores[index] = response;
          }

          // Ocultar el modal "En proceso" y mostrar el de éxito
          this.showInProgressModal = false;
          this.showModalEditarExito = true;

          this.closeModal();

          // Cerrar el modal de éxito después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showModalEditarExito = false;
            window.location.reload(); // Recargar la página
          }, 3000);
        },
        (error) => {
          console.error('Error al editar proveedor:', error);

          // Ocultar el modal "En proceso" y mostrar el de error
          this.showInProgressModal = false;
          this.showModalEditarError = true;

          this.closeModal();

          // Cerrar el modal de error después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showModalEditarError = false;
            window.location.reload(); // Recargar la página
          }, 3000);
        }
      );
    }
  }

  // Método para formatear la fecha en el formato 'YYYY-MM-DD'
  get formattedRegistrationDate(): string {
    const date = new Date(this.selectedProveedor.registration_date);
    return date.toISOString().split('T')[0]; // Obtiene el formato 'YYYY-MM-DD'
  }

  // Método para actualizar la fecha cuando se edita
  set formattedRegistrationDate(value: string) {
    // Convierte la fecha seleccionada en el input 'YYYY-MM-DD' al formato de milisegundos
    this.selectedProveedor.registration_date = new Date(value).getTime();
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

      // Mostrar el modal "En proceso"
      this.showInProgressModalEliminar = true;

      this.suppliersService.deleteSupplier(proveedorId).subscribe(
        (response) => {
          console.log('Proveedor eliminado con éxito:', response);

          // Elimina el proveedor de las listas locales
          this.proveedores = this.proveedores.filter(prov => prov.id !== proveedorId);
          this.filteredProveedores = this.filteredProveedores.filter(prov => prov.id !== proveedorId);

          // Ocultar el modal "En proceso"
          this.showInProgressModalEliminar = false;

          // Mostrar el modal de éxito
          this.showModalEliminarExito = true;

          this.closeModal(); // Cierra el modal de eliminación

          // Cerrar el modal de éxito después de 3 segundos y refrescar la página
          setTimeout(() => {
            this.showModalEliminarExito = false; // Cerrar el modal de éxito
            window.location.reload(); // Recargar la página
          }, 3000); // 3000 ms = 3 segundos
        },
        (error) => {
          console.error('Error al eliminar proveedor:', error);

          // Ocultar el modal "En proceso"
          this.showInProgressModalEliminar = false;

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
