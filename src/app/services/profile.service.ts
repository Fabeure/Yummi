import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { catchError, map, Observable, of, Subscription } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './authentication.service';
import { applicationUser } from '../models/applicationUser.model';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  userSubscription: Subscription = new Subscription();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) {}

  getFavorites(id: string): Observable<number[]> {
    if (!id) {
      return of([]);
    }
    return this.http.get(`${this.apiUrl}/getUserById`, { params: { id } }).pipe(
      map((res: any) => {
        console.log('Favorites response: service', res);
        if (res && res.resultItem && res.resultItem.favorites) {
          console.log('Favorites response: service', res.resultItem.favorites);

          return res.resultItem.favorites;
        } else {
          console.error('Favorites not found in the response:', res);
          return [];
        }
      })
    );
  }
  saveProfile(id: string, user: applicationUser, token: string): Observable<any> {
    let userParams = new HttpParams()
      .set('id', id)
      .set('Name', user.Name)
      .set('Surname', user.Surname)
      .set('Email', user.Email)
      .set('ProfilePictureBase64', user.ProfilePictureBase64)
    user.Favorites.forEach((favorite, index) => {
      userParams = userParams.set(`Favorites[${index}]`, favorite.toString());
    });
      
    return this.http.patch(`${this.apiUrl}/updateUserById?id=${id}`, userParams)
      .pipe(
        // On successful profile update, update user data in the BehaviorSubject
        map((res: any) => {
          if (res && res.isSuccess) {
            // Assuming the response contains the updated user data
            const updatedUser = {
              email: user.Email,
              userId: id,
              name: user.Name,
              surname: user.Surname,
              favorites: user.Favorites,
              profilePictureBase64: user.ProfilePictureBase64
            };

            // Now update the BehaviorSubject with the new user data
            this.authService.updateUser(updatedUser); // Call updateUser from AuthService
          }
          return res;
        }),
        catchError((err) => {
          console.error('Failed to save profile:', err);
          throw err;
        })
      );
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
  changePassword(userId: string, oldPassword: string, newPassword: string): Observable<any> {
    const url = `${this.apiUrl}/updatePasswordById`;
    const body = new HttpParams()
      .set('id', userId)
      .set('oldPassword', oldPassword)
      .set('newPassword', newPassword);
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    });
    console.log('Change password body ml service:', body);
    return this.http.patch(url, body.toString(), { headers });
  }

}
