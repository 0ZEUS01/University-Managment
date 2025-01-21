import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = environment.apiUrl + '/users';

  constructor(private http: HttpClient) { }

  getUserProfile(username: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/profile/${username}`);
  }

  updateUserProfile(username: string, userData: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/profile/${username}`, userData);
  }
}
