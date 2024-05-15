import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfilService {

  constructor(private http: HttpClient) { }

  saveProfil(data:any){
    return this.http.post(`${environment.apiUrl}/api/auth/profils`, data);
  }
  getProfils(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/profils`);
   }

   GetOneProfil(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/profils/`+id);
  }

  editProfil(id:any, data:any){
    return this.http.put(`${environment.apiUrl}/api/auth/profils/`+id, data);
  }

   RemoveProfil(id:any){
    return this.http.delete(`${environment.apiUrl}/api/auth/profils/`+id);
  }

  GetOneDroits(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/droits/`+id);
  }

  updateDroits(id:any, data:any){
    return this.http.put(`${environment.apiUrl}/api/auth/droits/`+id, data);
  }

}
