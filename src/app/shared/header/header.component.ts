import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../components/log-in/log-in.component';

@Component({
  selector: 'app-header',
  imports: [],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  constructor(private dialog: MatDialog) { }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LogInComponent, {
      width: '500px',
      disableClose: true, // Empêche la fermeture en cliquant à l'extérieur
    });

  }
}
