import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.css']
})
export class UserTableComponent {
  @Input() users: any[] = [];
  @Input() loading: boolean = false;
  @Output() editUser = new EventEmitter<any>();
  @Output() viewRoles = new EventEmitter<any>();
  @Output() deleteUser = new EventEmitter<any>();
}
