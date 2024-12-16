import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-role-modal',
  templateUrl: './role-modal.component.html',
  styleUrls: ['./role-modal.component.css']
})
export class RoleModalComponent {
  openModal(user: any) {
    throw new Error('Method not implemented.');
  }
  @Input() user: any;
  @Output() closeModal = new EventEmitter<void>();

  availableRoles = ['Admin', 'Usuario']; // Puedes añadir más roles aquí

  showModal = false;
selectedUser: any;

  saveChanges() {
    console.log('Roles actualizados:', this.user.roles);
    this.closeModal.emit();
  }

  close() {
    this.closeModal.emit();
  }
}