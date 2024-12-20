import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-modals',
  templateUrl: './user-modals.component.html',
  styleUrls: ['./user-modals.component.css']
})
export class UserModalsComponent {
  @Input() editingUser: any | null = null;
  @Input() userToDelete: any | null = null;
  @Input() isAddingUser: boolean = false;
  @Input() userRolesPermissions: any | null = null;

  @Output() cancelEdit = new EventEmitter<void>();
  @Output() cancelDelete = new EventEmitter<void>();
  @Output() cancelAddUser = new EventEmitter<void>();
  @Output() addUser = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<void>();
  @Output() updateUser = new EventEmitter<any>();
  @Output() closeRolesModal = new EventEmitter<void>();

  newUser = {
    username: '',
    email: '',
    phone: '',
    status: 'Active',
    photo: ''
  };
}
