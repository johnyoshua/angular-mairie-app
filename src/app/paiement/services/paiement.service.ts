import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PaiementService {
  constructor(private http: HttpClient){}
  getData(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/paiement_taxe`);
  }

  saveData(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/paiement_taxe`, data);
  }

  saveDataBord(data:any) {
    return this.http.post(`${environment.apiUrl}/api/auth/insert_img`, data);
  }


  GetOne(id:any){
     return this.http.get(`${environment.apiUrl}/api/auth/paiement_taxe/`+id);
   }

  update(data:any, borderequ:any){
   return this.http.put(`${environment.apiUrl}/api/auth/paiement_ov/`+data, borderequ);
  }

  delete(id:any){
   return this.http.delete(`${environment.apiUrl}/api/auth/paiement_taxe/`+id);
  }

 deleteTaxe(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/paiement_taxe/`+id);
  }

}
