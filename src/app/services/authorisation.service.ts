import { Injectable } from '@angular/core';
import { AuthService } from './authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthorizationService {
  constructor(private authService: AuthService) {}

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }
}
