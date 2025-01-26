import { Component, inject, Inject, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { AuthorizationService } from '../../services/authorisation.service';
import { AuthService, User } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from '../../../config/routes.config';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [CommonModule,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  routes=APP_ROUTES;
  authService=inject(AuthService);
  authoService=inject(AuthorizationService);
  user$=this.authService.user$;
  
  constructor(private dialog: MatDialog) { 
    //console.log("user$: ", this.authoService.isLoggedIn());
  }

  openLoginDialog() {
    const dialogRef = this.dialog.open(LogInComponent, {
      width: '500px',
      disableClose: true, // Empêche la fermeture en cliquant à l'extérieur
    });
    
  }
  logout() {
    this.authService.logout();
  }

}
