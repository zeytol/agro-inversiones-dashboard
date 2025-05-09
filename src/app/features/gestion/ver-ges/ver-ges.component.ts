import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';


@Component({
  selector: 'app-ver-ges',
  templateUrl: './ver-ges.component.html',
  styleUrl: './ver-ges.component.css'
})
export class VerGesComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

}
