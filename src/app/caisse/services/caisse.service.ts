import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CaisseService {
  constructor(private http: HttpClient){}

  getData(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/caisse`);
  }

  getDataHistorique(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/caisse/`+id);
  }

  GetDataCaisseRecetteOne(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/caisse/`+id);
  }

  SaveDecaissement(data:any){
    return this.http.post(`${environment.apiUrl}/api/auth/decaissement`, data);
  }

  UpdatePaiementOv(id:any){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/historique_caise_recette/`+id);
  }

  saveData(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/caisse`, data);
  }



   GetOne(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/caisse_recette/`+id);
   }

   update(id:any, data:any){
   return this.http.put(`${environment.apiUrl}/api/auth/caisse_recette/`+id, data);
 }

 delete(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/caisse_recette/`+id);
 }

}
