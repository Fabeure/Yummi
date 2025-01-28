import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { map, Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
import { applicationUser } from '../../models/applicationUser.model';

@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  userSubscription: Subscription = new Subscription();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  getFavorites(id: string): any {
    return this.http.get(`${this.apiUrl}/getUserById`, { params: { id } }).pipe(
      map((res: any) => {
        if (res && res.resultItem && res.resultItem.favorites) {
          return res.resultItem.favorites;
        } else {
          console.error('Favorites not found in the response:', res);
          return [];
        }
      })
    );

  }
  saveProfile(user: applicationUser, token: string, favorites: string[]): Observable<any> {
    const id = user.userId;
    console.log("id", id);
    console.log("token", token);
    console.log("favorites", favorites);
    return this.http.patch(`${this.apiUrl}/updateUserById`, {
      params: { id, user, token }
    });
  }


  deleteAccount(id: string, token: string) {
    return this.http.delete(`${this.apiUrl}/deleteUserById`, {
      params: { id, token },
    });

  }
  getUserData(): any {
    return this.authService.user$;
  }

  unsubscribeUser() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
