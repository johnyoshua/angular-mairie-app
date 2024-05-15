import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterService {

  constructor(private http: HttpClient){}

  private _loading$ = new BehaviorSubject<boolean>(false);

  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }
  private lastProfilsLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  private _magasins$ = new BehaviorSubject<any>([]);
  get magasins$(): Observable<any> {
    return this._magasins$.asObservable();
  }

  // getMagasins(){
  //   this.setLoadingStatus(true);
  //   this.http.get<any>(`${environment.apiUrl}/api/auth/magasins`).pipe(
  //     delay(1000),
  //     tap(magasins => {
  //       this._magasins$.next(magasins);
  //       this.setLoadingStatus(false);
  //     })
  //   ).subscribe();
  // }

  saveMagasin(data:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/magasins/`, data, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }


  getMission(){
    return this.http.get<any>(`${environment.apiUrl}/api/missions`);
  }

  getVision(){
    return this.http.get<any>(`${environment.apiUrl}/api/visions`);
  }


  updateMission(id:any ,data: any){
    return this.http.put(`${environment.apiUrl}/api/missions/`+id, data);
  }


  updateVision(id:any ,data: any){
    return this.http.put(`${environment.apiUrl}/api/visions/`+id, data);
  }

  getService(){
    return this.http.get<any>(`${environment.apiUrl}/api/services`);
  }


  getEtablissement(){
    return this.http.get<any>(`${environment.apiUrl}/api/etablissements`);
  }

  getAliments(){
    return this.http.get<any>(`${environment.apiUrl}/api/aliments`);
  }

  getblogs(){
    return this.http.get<any>(`${environment.apiUrl}/api/blogs`);
  }
// DEBUT CONTACT

  GetAllContact(){
    return this.http.get<any>(`${environment.apiUrl}/api/auth/contacts/`);
  }
  saveContact(data:any){
      return this.http.post<any>(`${environment.apiUrl}/api/contacts`, data);
  }

  RemoveContact(id:any){
    return this.http.delete(`${environment.apiUrl}/api/auth/contacts/`+id);
  }


// FIN CONTACT



  GetAccueil(){
    return this.http.get<any>(`${environment.apiUrl}/api/accueils`);
  }

  // Debut qui somme nous

  upload(data:any): Observable<HttpEvent<any>> {
    const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/quisommenous/`, data, {
      reportProgress: true,
      responseType: 'json'
    });
    return this.http.request(req);
  }

  EdittextQuisomme(id:any, data: any){
    return this.http.put(`${environment.apiUrl}/api/auth/quisommenous/`+id, data);
  }

 // Fin qui somme nous.

 // Debut ce que nous fqisons

 CequenousfaisonsUpload(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/cequenousfaisons/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

EdittextCEquenousfaisons(id:any, data: any){
  return this.http.put(`${environment.apiUrl}/api/auth/cequenousfaisons/`+id, data);
}

// Fin ce que nous fqisons

// Debut Blog
saveblog(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/blobAdmins/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

getAllBlog(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/blobAdmins`);
}

RemoveBlog(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/blobAdmins/`+id);
}

GetOneblog(id:any){
  return this.http.get(`${environment.apiUrl}/api/auth/blobAdmins/`+id);
}

EditBlog(id:any, data:any){
  return this.http.put(`${environment.apiUrl}/api/auth/blobAdmins/`+id, data);
}

EditBlogImg(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/atherController/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}
// Fin ce que blog


// Debut Services
saveService(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/services/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

getAllService(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/services`);
}

RemoveService(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/services/`+id);
}

GetOneService(id:any){
  return this.http.get(`${environment.apiUrl}/api/auth/services/`+id);
}

EditService(id:any, data:any){
  return this.http.put(`${environment.apiUrl}/api/auth/services/`+id, data);
}

EditSeriveImg(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/atherupdate/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}
// Fin ce que Servicces

// Debut Etablissement
saveEtablissement(data:any){
  return this.http.post(`${environment.apiUrl}/api/auth/etablissements`, data);
}

getAllEtablissement(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/etablissements`);
}

RemoveEtablissement(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/etablissements/`+id);
}

GetOneEtablissement(id:any){
  return this.http.get(`${environment.apiUrl}/api/auth/etablissements/`+id);
}

EditEtablissement(id:any, data:any){
  return this.http.put(`${environment.apiUrl}/api/auth/etablissements/`+id, data);
}

// Fin ce que Etablissement

// Debut Aliementation
saveAlimentation(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/aliments/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

getAllAlimentation(){
  return this.http.get<any>(`${environment.apiUrl}/api/auth/aliments`);
}

RemoveAlimentation(id:any){
  return this.http.delete(`${environment.apiUrl}/api/auth/aliments/`+id);
}

GetOneAlimentation(id:any){
  return this.http.get(`${environment.apiUrl}/api/auth/aliments/`+id);
}

EditAlimentation(id:any, data:any){
  return this.http.put(`${environment.apiUrl}/api/auth/aliments/`+id, data);
}

EditAlimentationImg(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/atherAlimentUpdate/`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}
// Fin Alimentation

// Inscription

saveInscription(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/register`, data, {
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}


GetOneHome(){
  return this.http.get(`${environment.apiUrl}/api/auth/getOneHome`);
}

EditHome(data:any): Observable<HttpEvent<any>> {
  const req = new HttpRequest('POST', `${environment.apiUrl}/api/auth/updateHome/`, data,{
    reportProgress: true,
    responseType: 'json'
  });
  return this.http.request(req);
}

EdittextHome(data:any){
  return this.http.post(`${environment.apiUrl}/api/auth/updatetextHomer/`, data);
}



}
