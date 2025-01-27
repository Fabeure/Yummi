import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from '../../services/authentication.service';
import { User } from '../../models/user.model';
export interface applicationUser{
  userId: string,
  Name: string,
  Surname: string,
  Email: string,
  ProfilePictureBase64: string,
  Favorites: string[]
}
@Injectable({
  providedIn: 'root'
})

export class ProfileService {
  userSubscription: Subscription = new Subscription();
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private authService: AuthService) { }

  saveProfile(fd: FormData,id:string,token:string,favorites:string[]): Observable<any> | void {
    const user: applicationUser = {
      userId: id,
      Name: fd.get('name') as string,
      Surname: fd.get('surname') as string,
      Email: fd.get('email') as string,
      ProfilePictureBase64: fd.get('profilePicture') as string,
      Favorites: favorites
    }
   // .post(`${this.apiUrl}/api/v1/authenticate/login`, loginData)

    const res= this.http.post(`${this.apiUrl}/api/v1/user/updateUserById/${id}`, user, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("res", res);
    return res;
  }
  deleteAccount() {
  }
  getUserData(): any {
    return this.authService.user$;  // assuming 'user$' is an observable from your AuthService

    // this.userSubscription = this.authService.user$.subscribe(user => {
    //   console.log('User data updated:', user);
    //   return user;
    // });
  }
  unsubscribeUser() {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

}
