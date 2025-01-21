import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { map } from 'rxjs/operators';

export interface AuthCredentials {
  username: string;
  password: string;
  email?: string;
  role?: string;
}

export interface AuthResponse {
  token: string;
  username: string;
  role: string;
  userId: number;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<AuthResponse | null>;
  private apiUrl = 'http://localhost:8080/user-service/api/auth'; // Update with your gateway URL

  // Predefined users
  private predefinedUsers = [
    {
      username: 'AmalHida', 
      password: 'AmalHida', 
      role: 'STUDENT'
    },
    {
      username: 'YahyaZini', 
      password: 'YahyaZini', 
      role: 'TEACHER'
    }
  ];

  constructor(private http: HttpClient) {
    const storedUser = localStorage.getItem('currentUser');
    this.currentUserSubject = new BehaviorSubject<AuthResponse | null>(
      storedUser ? JSON.parse(storedUser) : null
    );
  }

  public get currentUserValue(): AuthResponse | null {
    return this.currentUserSubject.value;
  }

  // Client-side authentication for predefined users
  signin(credentials: AuthCredentials): Observable<AuthResponse> {
    const matchedUser = this.predefinedUsers.find(
      user => 
        user.username === credentials.username && 
        user.password === credentials.password
    );

    if (matchedUser) {
      const authResponse: AuthResponse = {
        token: this.generateMockToken(),
        username: matchedUser.username,
        role: matchedUser.role,
        userId: this.generateMockUserId(matchedUser.username)
      };

      this.handleAuthentication(authResponse);
      return of(authResponse);
    }

    // If no match, return an error
    return of(null).pipe(
      map(() => { 
        throw new Error('Invalid credentials'); 
      })
    );
  }

  signup(credentials: AuthCredentials): Observable<AuthResponse> {
    // Implement signup logic if needed
    return this.http.post<AuthResponse>(`${this.apiUrl}/signup`, credentials)
      .pipe(map(response => {
        this.handleAuthentication(response);
        return response;
      }));
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }

  private handleAuthentication(response: AuthResponse) {
    localStorage.setItem('currentUser', JSON.stringify(response));
    this.currentUserSubject.next(response);
  }

  isAuthenticated(): boolean {
    return !!this.currentUserValue;
  }

  getUserRole(): string | null {
    return this.currentUserValue?.role || null;
  }

  validateToken(token: string): Observable<boolean> {
    // Mock token validation
    return of(true);
  }

  // Generate a mock token (for client-side simulation)
  private generateMockToken(): string {
    return 'mock_token_' + Math.random().toString(36).substring(2);
  }

  // Generate a mock user ID
  private generateMockUserId(username: string): number {
    return username === 'AmalHida' ? 1 : 
           username === 'YahyaZini' ? 2 : 
           0;
  }
}
