import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable} from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RapportService {
  constructor(private http: HttpClient){}

  getHistorique(data:any){
    return this.http.post(`${environment.apiUrl}/api/auth/rapport_contribuable`, data);
  }
  getRecu(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/paiement_taxe/`+id);
   }
  getData(data:any){
    return this.http.post<any>(`${environment.apiUrl}/api/auth/getFactureEnregistrer`,data);
  }

  getProformaConfirmer(data:any){
    return this.http.post<any>(`${environment.apiUrl}/api/auth/getFactureConfirmer`,data);
  }


  getFacturePayer(data:any){
    return this.http.post<any>(`${environment.apiUrl}/api/auth/getFacturePayer`,data);
  }

  getFactureNonPayer(data:any){
    return this.http.post<any>(`${environment.apiUrl}/api/auth/getFactureNonPayer`,data);
  }

  getDetailCompteBancaire(data:any,id:any){
    return this.http.put<any>(`${environment.apiUrl}/api/auth/getDetailCompteBancaire/`+id,data);
  }

  getDetailCaisseRecette(data:any,id:any){
    return this.http.put<any>(`${environment.apiUrl}/api/auth/getDetailCaisseRecette/`+id,data);
  }

  getDetailCaisseDepense(data:any,id:any){
    return this.http.put<any>(`${environment.apiUrl}/api/auth/getDetailCaisseDepense/`+id,data);
  }
  getDetailFournisseur(data:any,id:any){
    return this.http.put<any>(`${environment.apiUrl}/api/auth/getDetailFournisseur/`+id,data);
  }


  GetOne(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/proformas/`+id);
  }

  GetOnePayer(id:any){
    return this.http.get(`${environment.apiUrl}/api/auth/factures_payer/`+id);
  }

}
