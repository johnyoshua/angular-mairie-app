import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MontantService {
  constructor(private http: HttpClient){}
  getData(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/montant`);
  }

  saveData(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/montant`, data);
  }

   GetOne(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/montant/`+id);
   }

   update(id:any, data:any){
   return this.http.put(`${environment.apiUrl}/api/auth/montant/`+id, data);
 }

 delete(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/montant/`+id);
 }

}
