import { Component, ViewChild, TemplateRef, Inject, Output, EventEmitter } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClienteService } from '../../../services/cliente.service';
import { customers } from '../../../models/client.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-usuario',
  templateUrl: './agregar-usuario.component.html',
  styleUrls: ['./agregar-usuario.component.css']
})
export class AgregarUsuarioComponent {
  @ViewChild('successModal') successModal!: TemplateRef<any>;
  @ViewChild('errorModal') errorModal!: TemplateRef<any>;

  @Output() clienteAdded = new EventEmitter<void>();

  razonSocial: string = '';
  tipoCliente: string = '';
  tipoDocumento: string = '';
  numeroDocumento: string = '';
  direccion: string = '';
  telefono: string = '';
  correo: string = '';
  dialogRef!: MatDialogRef<any>;

  constructor(
    public dialog: MatDialog,
    @Inject(MatDialogRef) private parentDialogRef: MatDialogRef<any>,
    private clienteService: ClienteService
  ) {}

  onCancel(): void {
    this.parentDialogRef.close();
  }

  async onAdd(): Promise<void> {
    if (!this.isFormValid()) {
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos obligatorios.',
        icon: 'warning',
        confirmButtonText: 'Aceptar'
      });
      return;
    }

    const cliente: customers = this.createCliente();
    
    console.log('Cliente a enviar:', cliente);
    Swal.fire({
      title: 'Agregando cliente...',
      html: 'Por favor, espera mientras se registra el cliente.',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      }
    });

    try {
      const response = await this.clienteService.guardarCliente(cliente).toPromise();
      
      Swal.fire({
        title: 'Cliente registrado',
        text: 'El cliente se ha registrado con éxito.',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      }).then(() => {
        this.clienteAdded.emit();
        this.parentDialogRef.close();
      });
    } catch (error) {
      Swal.fire({
        title: 'Error',
        text: 'No se pudo registrar el cliente. Intenta nuevamente.',
        icon: 'error',
        confirmButtonText: 'Aceptar'
      });
      console.error('Error al agregar cliente:', error);
    }
  }

  private isFormValid(): boolean {
    return (
      this.razonSocial !== '' &&
      this.tipoCliente !== '' &&
      this.tipoDocumento !== '' &&
      this.numeroDocumento !== '' &&
      this.direccion !== '' &&
      this.telefono !== '' &&
      this.correo !== ''
    );
  }

  // Método para crear objeto cliente
  private createCliente(): customers {
    return {
      id: 0,
      name: this.razonSocial,
      typeCustomer: this.tipoCliente,
      documentType: this.tipoDocumento,
      documentNumber: this.numeroDocumento,
      address: this.direccion,
      phone: this.telefono,
      email: this.correo
    };
  }

  // Método modal de éxito
  private showSuccessModal(response: any): void {
    console.log(response); 
    this.dialogRef = this.dialog.open(this.successModal, {
      width: '400px',
      height: 'auto'
    });
    this.dialogRef.afterClosed().subscribe(() => {
      this.clienteAdded.emit();
      this.parentDialogRef.close();
    });
  }

  // Método modal de error
  private showErrorModal(): void {
    this.dialogRef = this.dialog.open(this.errorModal, {
      width: '400px',
      height: 'auto'
    });
  }

  closeSuccessModal(): void {
    this.dialogRef.close();
  }

  closeErrorModal(): void {
    this.dialogRef.close();
  }

  retryAdd(): void {
    this.dialogRef.close();
  }

  // Validación de campo numero documento

  onKeyPress(event: KeyboardEvent): void {
    if (this.tipoDocumento === 'RUC' || this.tipoDocumento === 'DNI' || this.tipoDocumento === 'Carné de Extranjería') {
      const pattern = /^[0-9]*$/;
      if (!pattern.test(event.key)) {
        event.preventDefault();
      }
    }
    else if (this.tipoDocumento === 'Pasaporte') {
      const pattern = /^[A-Za-z0-9]*$/;
      if (!pattern.test(event.key)) {
        event.preventDefault();
      }
    }
  }

  getDocumentoPattern(): string {
    switch (this.tipoDocumento) {
      case 'RUC':
        return '^[0-9]{11}$';  
      case 'DNI':
        return '^[0-9]{8}$';  
      case 'Carné de Extranjería':
        return '^[0-9]{9}$';  
      case 'Pasaporte':
        return '^[A-Za-z0-9]+$'; 
      default:
        return '';  
    }
  }

  getDocumentoMaxLength(): number {
    switch (this.tipoDocumento) {
      case 'RUC':
        return 11; 
      case 'DNI':
        return 8; 
      case 'Carné de Extranjería':
      case 'Pasaporte':
        return 9;  
      default:
        return 0; 
    }
  }
  
 
  limpiarNumeroDocumento(): void {
     this.numeroDocumento = '';
  }

  onPaste(event: ClipboardEvent): void {
    const textoPegado = event.clipboardData?.getData('text');
    const isValid = this.esValidoPegado(textoPegado);
  
    if (!isValid) {
      event.preventDefault();
    }
  }
  
  private esValidoPegado(textoPegado: string | undefined): boolean {
    if (!textoPegado) {
      return false;
    }
  
    switch (this.tipoDocumento) {
      case 'RUC':
        return /^[0-9]{11}$/.test(textoPegado);  
      case 'DNI':
        return /^[0-9]{8}$/.test(textoPegado);
      case 'Carné de Extranjería':
        return /^[0-9]{9}$/.test(textoPegado);
      case 'Pasaporte':
        return /^[A-Za-z0-9]+$/.test(textoPegado);
      default:
        return false;
    }
  }

  // Validación del campo teléfono

  onTelefonoKeyPress(event: KeyboardEvent): void {
    const pattern = /^[0-9]$/;
    if (!pattern.test(event.key)) {
      event.preventDefault();
    }
  }
  
  onTelefonoPaste(event: ClipboardEvent): void {
    const textoPegado = event.clipboardData?.getData('text');
    if (!this.esValidoTelefono(textoPegado)) {
      event.preventDefault();
    }
  }
  
  // Método para validar el texto pegado en el campo de teléfono
  private esValidoTelefono(textoPegado: string | undefined): boolean {
    return textoPegado ? /^\d{9}$/.test(textoPegado) : false;
  }
}
