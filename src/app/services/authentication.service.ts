import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  email: string;
  userId: string;
  name: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}

  login(email: string, password: string) {
    const loginData = {
      Email: email,
      Password: password,
    };
  
    this.http
      .post(`${this.apiUrl}/api/v1/authenticate/login`, loginData)
      .pipe(
        map((res: any) => {
          if (res?.success) {
            const { accessToken, email, userId, name } = res;
  
            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', accessToken);
            }  
            this.userSubject.next({ email, userId, name }); // Emit updated user data
            console.log("done emitting user data")
            //this.router.navigate(['/profile']);
          } else {
            console.log('Login failed:', res?.message);
          }
        }),
        catchError((err) => {
          console.error('Login error:', err);
          this.userSubject.error('An error occurred during login');
          return [];
        })
      )
      .subscribe();
  }

  // Check if the user is logged in (based on presence of access token)
  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage && !!localStorage.getItem('accessToken');
  }

  // Logout method (clear the user data and token)
  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }    this.userSubject.next(null);
    //this.router.navigate(['/']);
  }
}
