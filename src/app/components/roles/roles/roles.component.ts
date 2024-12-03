import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

export interface Role {
  id: number;
  name: string;
  description: string;
  email: string;
  phone: string;
  state: 'active' | 'inactive';
}

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css'],
})
export class RolesComponent implements OnInit {
configureRole(arg0: number) {
throw new Error('Method not implemented.');
}
  roles: Role[] = [];
  searchQuery: string = '';
  roleName: string = '';
  roleDescription: string = '';
  email: string = '';
  phone: string = '';
  state: 'active' | 'inactive' = 'active';
  isEditing: boolean = false;
  editingRoleId: number | null = null;

  constructor() {
    this.roles = [
      {
        id: 1,
        name: 'Admin',
        description: 'Acceso completo al sistema',
        email: 'admin@example.com',
        phone: '123456789',
        state: 'active',
      },
      {
        id: 2,
        name: 'User',
        description: 'Acceso limitado al sistema',
        email: 'user@example.com',
        phone: '987654321',
        state: 'inactive',
      },
      {
        id: 3,
        name: 'Moderator',
        description: 'Moderación de contenido',
        email: 'mod@example.com',
        phone: '555555555',
        state: 'active',
      },
    ];
  }

  ngOnInit(): void {}

  filteredRoles() {
    return this.roles.filter(
      (role) =>
        role.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        role.description.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  addRole() {
    if (this.isEditing && this.editingRoleId !== null) {
      // Actualiza el rol existente
      const index = this.roles.findIndex(
        (role) => role.id === this.editingRoleId
      );
      if (index !== -1) {
        this.roles[index].name = this.roleName;
        this.roles[index].description = this.roleDescription;
        this.roles[index].email = this.email;
        this.roles[index].phone = this.phone;
        this.roles[index].state = this.state;
        this.isEditing = false;
        this.editingRoleId = null;
      }
    } else {
      // Agrega un nuevo rol
      const newRole: Role = {
        id: this.roles.length + 1,
        name: this.roleName,
        description: this.roleDescription,
        email: this.email,
        phone: this.phone,
        state: this.state,
      };
      this.roles.push(newRole);
    }
    this.resetForm();
  }
  editRole(roleId: number) {
    const role = this.roles.find((r) => r.id === roleId);
    if (role) {
      this.roleName = role.name;
      this.roleDescription = role.description;
      this.email = role.email;
      this.phone = role.phone;
      this.state = role.state;
      this.editingRoleId = roleId;

      Swal.fire({
        title: 'Editar Usuario',
        html: `
        <div class="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
          <div class="bg-white rounded-2xl w-full max-w-3xl mx-4 overflow-hidden rounded-none">
            <div class="flex justify-between items-center px-6 py-4 border-b">
              <h2 class="text-2xl font-semibold text-gray-900">Detalles del Usuario</h2>
              <button id="closeButton" class="text-gray-500 hover:text-gray-700 p-1">
                <svg
                  class="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
              </button>
            </div>
        
            <div class="p-6 bg-gray-100">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div class="flex flex-col items-center justify-start space-y-4">
                  <div class="w-48 h-48 rounded-lg overflow-hidden bg-white">
                    <img
                      src="/api/placeholder/192/192"
                      alt="Profile"
                      class="w-full h-full object-cover"
                    />
                  </div>
                </div>
        
                <div class="space-y-6">
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Nombre de usuario:</label
                    >
                    <input
                      type="text"
                      value="${this.roleName}"
                      class="w-full p-3 rounded-lg border border-gray-200 bg-white"
                      readonly
                    />
                  </div>
        
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Correo:</label
                    >
                    <input
                      type="email"
                      value="${this.email}"
                      class="w-full p-3 rounded-lg border border-gray-200 bg-white"
                      readonly
                    />
                  </div>
        
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Teléfono:</label
                    >
                    <input
                      type="tel"
                      value="${this.phone}"
                      class="w-full p-3 rounded-lg border border-gray-200 bg-white"
                      readonly
                    />
                  </div>
        
                  <div>
                    <label class="block text-sm font-medium text-gray-700 mb-1"
                      >Estado:</label
                    >
                    <select
                      class="w-full p-3 rounded-lg border border-gray-200 bg-white"
                      value="${this.state}"
                    >
                      <option value="">Seleccione un estado</option>
                      <option value="active">Activo</option>
                      <option value="inactive">Inactivo</option>
                    </select>
                  </div>
                </div>
              </div>
        
              <div class="flex flex-col md:flex-row justify-center gap-4 mt-8">
                <button
                  class="flex items-center justify-center gap-2 px-6 py-2.5 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition-colors"
                  id="assignPermissionsButton"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Asignar Permisos
                </button>
                <button
                  class="flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M5 3v18l15-9-15-9z"
                    ></path>
                  </svg>
                  Guardar Cambios
                </button>
                <button
                  class="flex items-center justify-center gap-2 px-6 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                  id="seeDetailsButton"
                >
                  <svg
                    class="w-5 h-5"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 4v16m8-8H4"
                    ></path>
                  </svg>
                  Ver Detalles
                </button>
              </div>
            </div>
          </div>
        </div>
        `,

        showConfirmButton: false,

        willOpen: () => {
          const popup = Swal.getPopup();

          const seeDetailsButton = document.getElementById('seeDetailsButton');

          if (seeDetailsButton) {
            seeDetailsButton.addEventListener('click', () => {
              Swal.fire({
                html: `
      <div class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
        <div class="bg-white p-4 rounded-lg w-1/2 h-full max-h-full relative rounded-none">
            <!-- Close Button -->
            <button id="closeButton" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                ✕
            </button>

            <!-- Header -->
            <h2 class="text-center text-lg font-semibold mb-2">Información del Empleado</h2>

            <!-- Employee Info -->
            <div class="flex items-start gap-2 mb-4">
                <img src="https://via.placeholder.com/150" alt="Empleado" class="w-50 h-45 border-4 border-gray-300 rounded-lg object-cover" />
                <div class="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-gray-700">
    <div>
        <span class="font-semibold">Nombre de usuario:</span>
        <span class="block">Dennis Delgado</span>
    </div>
    <div>
        <span class="font-semibold">Cargo:</span>
        <span class="block">Vendedor</span>
    </div>
    <div>
        <span class="font-semibold">Fecha de Ingreso:</span>
        <span class="block">2021-04-20</span>
    </div>
    <div>
        <span class="font-semibold">Estado:</span>
        <span class="block">Activo</span>
    </div>
     <div class="col-span-2 text-left">
        <span class="font-semibold">Correo:</span>
        <span class="block">example@gmail.com</span>
    </div>
</div>

            </div>

            <!-- Permissions Header -->
            <h3 class="text-center font-semibold mb-2 text-sm">Permisos Asignados</h3>

            <!-- Permissions Tabs -->
            <div class="flex justify-center border-b border-gray-200 mb-3 text-sm text-gray-700">
                <button class="px-3 py-1 text-gray-600 hover:text-blue-500 focus:text-blue-500 border-b-2 border-transparent focus:border-blue-500 text-xs">Clientes</button>
                <button class="px-3 py-1 text-gray-600 hover:text-blue-500 focus:text-blue-500 border-b-2 border-transparent focus:border-blue-500 text-xs">Facturación</button>
                <button class="px-3 py-1 text-blue-500 font-semibold border-b-2 border-blue-500 text-xs">Proveedores</button>
            </div>

            <!-- Permissions List -->
            <div class="text-xs text-gray-600 mb-4 text-sm text-gray-700">
                <ul class="space-y-1">
                    <li class="flex items-center">
                        <input type="checkbox" checked class="mr-2 text-blue-500 focus:ring-blue-500" disabled />
                        <span>Agregar Clientes</span>
                    </li>
                    <li class="flex items-center">
                        <input type="checkbox" checked class="mr-2 text-blue-500 focus:ring-blue-500" disabled />
                        <span>Eliminar Clientes</span>
                    </li>
                    <li class="flex items-center">
                        <input type="checkbox" checked class="mr-2 text-blue-500 focus:ring-blue-500" disabled />
                        <span>Editar Clientes</span>
                    </li>
                </ul>
            </div>

            <!-- Close Button -->
<div class="flex justify-center">
    <button id="modalCloseButton" class="px-10 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 text-base font-semibold">
        Cerrar
    </button>
</div>

        </div>
      </div>
      `,
                customClass: {
                  popup: 'bg-white shadow-lg rounded-lg',
                },
                showConfirmButton: false,
                buttonsStyling: false,
                heightAuto: false,
                didRender: () => {
                  const htmlContainer = Swal.getHtmlContainer();

                  if (htmlContainer) {
                    // Ensure htmlContainer is not null
                    const closeButton =
                      htmlContainer.querySelector('#closeButton');
                    const modalCloseButton =
                      htmlContainer.querySelector('#modalCloseButton');

                    closeButton?.addEventListener('click', () => Swal.close());
                    modalCloseButton?.addEventListener('click', () =>
                      Swal.close()
                    );
                  }
                },
              });
            });
          }

          // Función para el botón "Asignar Permisos"
          const assignPermissionsButton = document.getElementById(
            'assignPermissionsButton'
          );

          if (assignPermissionsButton) {
            assignPermissionsButton.addEventListener('click', () => {
              // Activar SweetAlert personalizado
              Swal.fire({
                html: `
        <div style="position: fixed; inset: 0; display: flex; align-items: center; justify-content: center; background-color: rgba(0, 0, 0, 0.5); z-index: 50;">
  <div style="background-color: white; width: 100%; max-width: 64rem; margin: 0 1rem; rounded-none">

    <!-- Encabezado -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem; border-bottom: 1px solid;">
      <h2 style="font-size: 1.5rem; font-weight: 600; color: #1f2937;">Asignar Permisos</h2>
      <button id="closeButton"  onclick="onClose()" style="color: #6b7280; cursor: pointer;">
        <i class="fas fa-times"></i>
      </button>
    </div>

    <!-- Acciones superiores -->
    <div style="display: flex; justify-content: space-between; align-items: center; padding: 1rem;">
      <div style="display: flex; gap: 1rem; flex: 1;">
        <!-- Búsqueda de Categoría -->
        <div style="position: relative; max-width: 20rem; flex: 1;">
          <input type="text" placeholder="Buscar categoría" style="width: 100%; padding: 0.5rem 2.5rem 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; background-color: #f9fafb;">
          <span style="position: absolute; top: 0.625rem; right: 0.75rem; color: #9ca3af;">
            <i class="fas fa-search"></i>
          </span>
        </div>

        <!-- Búsqueda de Permiso -->
        <div style="position: relative; max-width: 20rem; flex: 1;">
          <input type="text" placeholder="Buscar permiso específico" style="width: 100%; padding: 0.5rem 2.5rem 0.5rem 1rem; border: 1px solid #e5e7eb; border-radius: 0.5rem; background-color: #f9fafb;">
          <span style="position: absolute; top: 0.625rem; right: 0.75rem; color: #9ca3af;">
            <i class="fas fa-search"></i>
          </span>
        </div>
      </div>

      <button id="assignPermissionsButton" style="display: flex; align-items: center; padding: 0.5rem 1rem; background-color: #3b82f6; color: white; border-radius: 0.5rem; cursor: pointer;">
        <i class="fas fa-file-alt" style="margin-right: 0.5rem;"></i> Crear Nuevo Permiso
      </button>
    </div>

    <!-- Contenido de Permisos -->
    <div style="padding: 1rem; max-height: 60vh; overflow-y: auto;">

      <!-- Sección de Gestión de Clientes -->
      <div style="background-color: white; border-radius: 0.5rem; margin-bottom: 1rem;">
        <button onclick="toggleSection('customers')" style="width: 100%; display: flex; align-items: center; padding: 1rem; text-align: left; font-weight: 500;">
          <i class="fas fa-users" style="margin-right: 0.5rem;"></i> ▼ Gestión de Clientes
        </button>

        <div style="padding: 1rem; display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem;">
          <label style="display: flex; align-items: center;">
            <input type="checkbox" style="height: 1.25rem; width: 1.25rem; border: 1px solid #d1d5db;">
            <span style="margin-left: 0.5rem;">Agregar Cliente Nuevo</span>
          </label>
          <label style="display: flex; align-items: center;">
            <input type="checkbox" style="height: 1.25rem; width: 1.25rem; border: 1px solid #d1d5db;">
            <span style="margin-left: 0.5rem;">Editar Información del Cliente</span>
          </label>
        </div>

        <!-- Paginación -->
        <div style="padding: 1rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid;">
          <div style="display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem; background-color: #f3f4f6; border-radius: 0.25rem;">1</button>
            <button style="padding: 0.5rem; background-color: white; border-radius: 0.25rem;">2</button>
          </div>
          <button style="display: flex; align-items: center; color: #4b5563;">
            <i class="fas fa-chevron-right" style="margin-right: 0.5rem;"></i> Next
          </button>
        </div>
      </div>

      <!-- Sección de Gestión de Proveedores -->
      <div style="background-color: white; border-radius: 0.5rem;">
        <button onclick="toggleSection('suppliers')" style="width: 100%; display: flex; align-items: center; padding: 1rem; text-align: left; font-weight: 500;">
          <i class="fas fa-truck" style="margin-right: 0.5rem;"></i> ▼ Gestión de Proveedores
        </button>

        <div style="padding: 1rem; display: grid; grid-template-columns: repeat(1, 1fr); gap: 1rem;">
          <label style="display: flex; align-items: center;">
            <input type="checkbox" style="height: 1.25rem; width: 1.25rem; border: 1px solid #d1d5db;">
            <span style="margin-left: 0.5rem;">Agregar Nuevo Proveedor</span>
          </label>
          <label style="display: flex; align-items: center;">
            <input type="checkbox" style="height: 1.25rem; width: 1.25rem; border: 1px solid #d1d5db;">
            <span style="margin-left: 0.5rem;">Editar Proveedor</span>
          </label>
        </div>

        <!-- Paginación -->
        <div style="padding: 1rem; display: flex; align-items: center; justify-content: space-between; border-top: 1px solid;">
          <div style="display: flex; gap: 0.5rem;">
            <button style="padding: 0.5rem; background-color: #f3f4f6; border-radius: 0.25rem;">1</button>
            <button style="padding: 0.5rem; background-color: white; border-radius: 0.25rem;">2</button>
          </div>
          <button style="display: flex; align-items: center; color: #4b5563;">
            <i class="fas fa-chevron-right" style="margin-right: 0.5rem;"></i> Next
          </button>
        </div>
      </div>
    </div>

    <!-- Acciones del Footer -->
    <div style="padding: 1rem; border-top: 1px solid; display: flex; justify-content: flex-end; gap: 1rem;">
      <button id="cancelButton" style="padding: 0.5rem 1rem; background-color: #f3f4f6; color: #374151; border-radius: 0.5rem; cursor: pointer;">
        <i class="fas fa-times-circle" style="margin-right: 0.5rem;"></i> Cancelar
      </button>
      <button style="padding: 0.5rem 1rem; background-color: #10b981; color: white; border-radius: 0.5rem; cursor: pointer;">
        <i class="fas fa-check-circle" style="margin-right: 0.5rem;"></i> Asignar Permisos
      </button>
    </div>
  </div>
</div>

      `,
                customClass: {
                  popup: 'bg-white shadow-lg rounded-lg',
                },
                buttonsStyling: false,
                heightAuto: false,
                didOpen: () => {
                  // Agregar eventos a los botones
                  const closeModalButton =
                    document.getElementById('closeModal');
                  const cancelButton = document.getElementById('cancelButton');
                  const assignPermissionsButton = document.getElementById(
                    'assignPermissionsButton'
                  );

                  const createNewPermissionButton = document.getElementById(
                    'createNewPermission'
                  );

                  if (closeModalButton) {
                    closeModalButton.addEventListener('click', () => {
                      Swal.close();
                    });
                  }

                  if (cancelButton) {
                    cancelButton.addEventListener('click', () => {
                      Swal.close();
                    });
                  }

                  if (assignPermissionsButton) {
                    assignPermissionsButton.addEventListener('click', () => {
                      // Activate custom SweetAlert
                      Swal.fire({
                        html: `
                          <div class="relative bg-white rounded-lg shadow-lg p-8">
                            <!-- Close Button -->
                            <button id="closeButton" class="absolute top-4 right-4 text-gray-500 hover:text-gray-700 rounded-none">
                              ✕
                            </button>
                            
                            <h1 class="text-2xl font-bold mb-4">Crear Nuevo Permiso</h1>
                            <div class="space-y-4">
                              <div class="flex items-center space-x-4">
                                <label for="nombre" class="block font-medium mb-2 w-1/3 text-right">Nombre del Permiso:</label>
                                <input type="text" id="nombre" class="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="Ingresa un nuevo permiso">
                              </div>
                              <div class="flex items-center space-x-4">
                                <label for="descripcion" class="block font-medium mb-2 w-1/3 text-right">Descripción:</label>
                                <textarea id="descripcion" rows="3" class="w-2/3 border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:ring focus:border-blue-500" placeholder="Ingresa una descripción"></textarea>
                              </div>
                              <button class="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-md">
                                Guardar Cambios
                              </button>
                            </div>
                          </div>
                        `,
                        customClass: {
                          popup: 'bg-white shadow-lg rounded-lg',
                        },
                        buttonsStyling: false,
                        heightAuto: false,
                        showConfirmButton: false, // Esto elimina el botón de OK
                        didOpen: () => {
                          // Close modal event
                          const closeModalButton =
                            document.getElementById('closeButton');
                          const cancelButton =
                            document.getElementById('cancelButton');
                          const assignPermissionsFinalButton =
                            document.getElementById(
                              'assignPermissionsFinalButton'
                            );

                          if (closeModalButton) {
                            closeModalButton.addEventListener('click', () =>
                              Swal.close()
                            );
                          }

                          if (cancelButton) {
                            cancelButton.addEventListener('click', () =>
                              Swal.close()
                            );
                          }

                          if (assignPermissionsFinalButton) {
                            assignPermissionsFinalButton.addEventListener(
                              'click',
                              () => {
                                // Add logic to handle permissions assignment
                                Swal.fire('Permisos Asignados!', '', 'success');
                              }
                            );
                          }
                        },
                      });
                    });
                  }

                  if (createNewPermissionButton) {
                    createNewPermissionButton.addEventListener('click', () => {
                      // Lógica para crear un nuevo permiso
                      console.log('Crear nuevo permiso');
                    });
                  }
                },
              });
            });
          }
        },
      }).then((result) => {
        if (result.isConfirmed) {
          const updatedData = {
            name: this.roleName,
            description: this.roleDescription,
            email: this.email,
            phone: this.phone,
            state: this.state,
          };
          this.saveChanges(roleId, updatedData);
        }
      });
    }
  }
  /// fin de editar

  saveChanges(roleId: number, updatedData: any) {
    // Aquí debes implementar la lógica para guardar los cambios
    console.log(`Actualizando el rol ${roleId}`, updatedData);
    // Lógica para enviar la solicitud de actualización al servidor
  }

  deleteRole(roleId: number): void {
    Swal.fire({
      title: '¿Seguro que deseas eliminar este registro?',
      text: 'Esta acción no se puede deshacer. El usuario será eliminado permanentemente.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'No, cancelar',
      customClass: {
        popup: 'bg-white shadow-lg rounded-lg',
        title: 'text-lg font-bold text-gray-800',
        htmlContainer: 'text-gray-600',
        confirmButton:
          'bg-blue-500 text-white hover:bg-blue-600 py-2 px-4 rounded-md transition-colors',
        cancelButton:
          'bg-red-600 text-black hover:bg-red-400 py-2 px-4 rounded-md transition-colors',
      },
      buttonsStyling: false,
    }).then((result) => {
      if (result.isConfirmed) {
        this.roles = this.roles.filter((role) => role.id !== roleId);
        Swal.fire(
          '¡Eliminado!',
          'El registro ha sido eliminado exitosamente.',
          'success'
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelado', 'El registro está a salvo :)', 'error');
      }
    });
  }

  resetForm() {
    this.roleName = '';
    this.roleDescription = '';
    this.email = ''; // Resetea el correo electrónico
    this.phone = ''; // Resetea el teléfono
    this.state = 'active'; // Resetea el estado
    this.isEditing = false;
    this.editingRoleId = null;
  }
}