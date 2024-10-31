import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Output() sidebarToggle = new EventEmitter<void>();
  isSidebarVisible = false; 

  toggleSidebar() {
    this.isSidebarVisible = !this.isSidebarVisible; 
    this.sidebarToggle.emit();
  }
}
