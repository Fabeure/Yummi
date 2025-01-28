import { Component, inject } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { LogInComponent } from '../../components/log-in/log-in.component';
import { AuthorizationService } from '../../services/authorisation.service';
import { AuthService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';
import { APP_ROUTES } from '../../../config/routes.config';
import { Router, RouterModule } from '@angular/router';
import { SearchComponent } from "../../components/search/search.component";

@Component({
  selector: 'app-header',
  imports: [CommonModule, RouterModule, SearchComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  standalone: true
})
export class HeaderComponent {
  routes = APP_ROUTES;
  authService = inject(AuthService);
  authoService = inject(AuthorizationService);
  user$ = this.authService.user$;
  profilePictureUrl: string = '../../../assets/cat.png';

  ngOnInit() {
    this.authService.user$.subscribe({
      next: (user) => {
        if (user) {
          this.profilePictureUrl = user.profilePictureBase64;
        }
      }
    });
  }

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
