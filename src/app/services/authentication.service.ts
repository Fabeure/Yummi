import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

export interface User {
  email: string;
  userId: string;
  name: string;
  favorites : string[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null> = new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) {}


  register(username: string, email: string, password: string): Observable<any> {
    const registerData = {
      Email: email,
      Username: username,
      Password: password,
    };
  
    return this.http
      .post(`${this.apiUrl}/api/v1/authenticate/register`, registerData)
      .pipe(
        map((res: any) => {
          if (res?.success) {
            const { accessToken } = res;
            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', accessToken);
            }
            this.router.navigate(['/'])
          }
          return res;
        }),
        catchError((err) => {
          console.error('Registration error:', err);
          throw err;
        })
      );
  }

  login(email: string, password: string): Observable<any> {
    const loginData = { Email: email, Password: password };
  
    return this.http
      .post(`${this.apiUrl}/api/v1/authenticate/login`, loginData)
      .pipe(
        map((res: any) => {
          if (res?.success) {
            const { accessToken, email, userId, name , favorites } = res;
  
            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', accessToken);
            }  
            this.userSubject.next({ email, userId, name, favorites }); // Emit updated user data
            console.log("done emitting user data",{ email, userId, name, favorites })
            //this.router.navigate(['/profile']);
          } else {
            console.log('Login failed:', res?.message);
          }
          return res;
        }),
        catchError((err) => {
          console.error('Login error:', err);
          throw err;
        })
      );
  }

  isLoggedIn(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    return localStorage && !!localStorage.getItem('accessToken') && !(localStorage.getItem('accessToken') == 'undefined');
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }    this.userSubject.next(null);
    this.router.navigate(['/']);
  }
}
