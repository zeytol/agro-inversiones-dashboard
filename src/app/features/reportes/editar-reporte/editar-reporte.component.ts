import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-editar-reporte',
  templateUrl: './editar-reporte.component.html',
  styleUrls: ['./editar-reporte.component.css']
})
export class EditarReporteComponent {
  // Datos actuales del reporte para editar
  @Input() report: any = {
    name: '',
    type: '',
    date: '',
    address: '',
    permission: '',
    status: '',
    category: '',
    description: ''
  };

  @Output() onClose = new EventEmitter<void>();
  @Output() onUpdate = new EventEmitter<any>();

  // Actualizar reporte
  updateReport() {
    if (!this.report.name || !this.report.type || !this.report.date) {
      alert('Por favor, complete todos los campos obligatorios.');
      return;
    }

    // Emitir el evento con los datos actualizados
    this.onUpdate.emit(this.report);
    this.closeModal();
  }

  // Cerrar el modal
  closeModal() {
    this.onClose.emit();
  }
}
