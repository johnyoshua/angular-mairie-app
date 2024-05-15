import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaaswordService {
  constructor(private http: HttpClient){}
  updatePassword(data:any){
   return this.http.post(`${environment.apiUrl}/api/auth/password`, data);
  }

  longout(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/password/`+id);
   }
}
