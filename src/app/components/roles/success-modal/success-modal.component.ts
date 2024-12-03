import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-success-modal',
    templateUrl: './success-modal.component.html',
})
export class SuccessModalComponent {
    @Input() title: string = ''; // Título del modal
    @Input() placeholder: string = ''; // Placeholder para el input
    @Input() isOpen: boolean = false; // Control de visibilidad
    @Output() onClose = new EventEmitter<void>(); // Evento para cerrar el modal
    @Output() onSave = new EventEmitter<string>(); // Evento para guardar datos
  
    inputValue: string = ''; // Valor temporal del input
  
    closeModal() {
      this.onClose.emit();
    }
  
    saveModal() {
      this.onSave.emit(this.inputValue);
      this.inputValue = ''; // Limpiar input tras guardar
    }
  }