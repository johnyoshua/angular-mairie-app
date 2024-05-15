import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BanqueService {
  constructor(private http: HttpClient){}
  getData(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/banque`);
  }

  saveData(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/banque`, data);
  }

  getDataHistorique(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/historique_banque/`+id);
  }

   GetOne(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/banque/`+id);
   }

   update(id:any, data:any){
   return this.http.put(`${environment.apiUrl}/api/auth/banque/`+id, data);
 }

 delete(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/banque/`+id);
 }

 GetDataCompteBancaireOne(id:any){
  return this.http.get(`${environment.apiUrl}/api/auth/banque/`+id);
}

SaveRetraitCompteBancaire(data:any) {
  return this.http.post(`${environment.apiUrl}/api/auth/retrait_banque`, data);
}

}
