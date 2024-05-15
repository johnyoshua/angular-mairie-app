import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { BehaviorSubject, delay, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FooterService {

  constructor(private http:HttpClient) { }


  private _loading$ = new BehaviorSubject<boolean>(false);
  get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  private _footterSite$ = new BehaviorSubject<any>([]);
  get footterSite$():Observable<any> {
    return this._footterSite$.asObservable();
  }

  private lastProfilsLoad = 0;

  private setLoadingStatus(loading: boolean) {
    this._loading$.next(loading);
  }

  getFooterSite(){
    if (Date.now()-this.lastProfilsLoad <=80000000) {
      return;
    }else
    this.setLoadingStatus(true);
    return this.http.get<any>(`${environment.apiUrl}/api/auth/getOneFooter`).pipe(
      delay(1000),
      tap(footterSite=>{
        this.lastProfilsLoad = Date.now();
        this._footterSite$.next(footterSite);
        this.setLoadingStatus(false);
      })
    ).subscribe();
  }

  GetOneFooter(){
    return this.http.get(`${environment.apiUrl}/api/auth/getOneFooter`);
  }

  EditFooter(data:any){
    return this.http.post(`${environment.apiUrl}/api/auth/updateFooter/`, data);
  }
}
