import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) {}

  login(email: string, password: string) {
    return this.http
      .post<{ authtoken: string }>(`${this.apiUrl}/api/auth/login`, {
        email,
        password,
      })
      .subscribe((response) => {
        localStorage.setItem('token', response.authtoken);
        this.router.navigate(['/']);
      });
  }

  register(name: string, password: string, email: string, dob: string) {
    return this.http
      .post<{ authtoken: string }>(`${this.apiUrl}/api/auth/register`, {
        name,
        password,
        email,
        dob,
      })
      .subscribe((response) => {
        localStorage.setItem('token', response.authtoken);
        this.router.navigate(['/']);
      });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // endpoint for starting serverless function
  startServerless() {
    return this.http.get(`${this.apiUrl}/health`);
  }
}
