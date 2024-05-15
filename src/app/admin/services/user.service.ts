import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient){}

  getUsers(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/users`);
  }

  saveUser(data:any): Observable<HttpEvent<any>> {
     const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/users`, data, {
       reportProgress: true,
       responseType: 'json'
     });
     return this.http.request(req);
   }

   saveUsernonImg(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/users`, data);
  }

   GetOneUser(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/users/`+id);
   }

   EditUser(id:any, data:any){
   return this.http.put(`${environment.apiUrl}/api/auth/users/`+id, data);
 }

 EditUserImg(data:any): Observable<HttpEvent<any>> {
   const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/updateUserImg`, data, {
     reportProgress: true,
     responseType: 'json'
   });
   return this.http.request(req);
 }

 DesactiveUser(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/users/`+id);
 }
 ActiveUser(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/users/`+id);
}
}
