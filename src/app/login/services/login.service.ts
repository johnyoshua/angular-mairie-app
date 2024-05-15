import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private token!: string;

  constructor(private http: HttpClient) { }

  signin(user:any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/api/auth/login`, user);
  }

  profileUser(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/api/auth/user-profile`);
  }
}
