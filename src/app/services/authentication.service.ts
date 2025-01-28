import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;
  private userSubject: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);
  public user$ = this.userSubject.asObservable();

  constructor(private router: Router, private http: HttpClient) { 
    this.TryGetUser();
  }


  TryGetUser(): void {
    console.log("TRYING")
    if (this.isLoggedIn()) {
      const accessToken = localStorage.getItem('accessToken');
      if (accessToken) {
        this.http
          .get(`${this.apiUrl}/getUserByToken?token=${accessToken}`)
          .pipe(
            map((res: any) => {
              if (res && res.resultItem) {
                const user: User = {
                  email: res.resultItem.email,
                  userId: res.resultItem.id,
                  name: res.resultItem.name,
                  surname: res.resultItem.surname,
                  favorites: res.resultItem.favorites || [],
                };
                console.log("USER FROM REFRESH:", user)
                this.userSubject.next(user); // Emit user data
              } else {
                console.error('Failed to fetch user:', res);
                this.userSubject.next(null); // Clear user data if fetching fails
              }
            }),
            catchError((err) => {
              console.error('Error fetching user on init:', err);
              this.userSubject.next(null);
              throw err;
            })
          )
          .subscribe();
      }
    }
  }

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
            this.router.navigate(['/']);
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
            const {
              accessToken,
              email,
              userId,
              name,
              surname,
              profilePictureBase64,
              favorites,
            } = res;

            if (typeof window !== 'undefined') {
              localStorage.setItem('accessToken', accessToken);
            }
            this.userSubject.next({
              email,
              userId,
              name,
              surname,
              favorites,
              profilePictureBase64,
            }); // Emit updated user data
            console.log('done emitting user data', { email, userId, name });
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
    return (
      localStorage &&
      !!localStorage.getItem('accessToken') &&
      !(localStorage.getItem('accessToken') == 'undefined')
    );
  }

  logout(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('accessToken');
    }
    this.userSubject.next(null);
    this.router.navigate(['/']);
  }

  updateUser(user: User): void {
    console.log('nexting user:', user);
    this.userSubject.next(user);
  }
}
