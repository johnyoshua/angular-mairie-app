import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AttriuerService {

  constructor(private http: HttpClient){}
  getData(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/attribuer`);
  }

  saveData(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/attribuer`, data);
  }

   GetOne(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/attribuer/`+id);
   }

   update(id:any, data:any){
   return this.http.put(`${environment.apiUrl}/api/auth/attribuer/`+id, data);
 }

 delete(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/attribuer/`+id);
 }

 getListAgent(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/getListAgent`);
}

getPos(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/getPos`);
}

}
