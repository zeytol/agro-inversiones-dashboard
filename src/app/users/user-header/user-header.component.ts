import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.css']
})
export class UserHeaderComponent {
  @Output() onSidebarToggle = new EventEmitter<void>();
}
