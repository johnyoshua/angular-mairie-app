import { Injectable } from '@angular/core';

@Injectable()

export class AppService {

  constructor(){}

  handleUser(dataUser: string){
    localStorage.setItem('user', JSON.stringify(dataUser));
  }

  handleDroits(dataDroits: string){
    localStorage.setItem('droits', JSON.stringify(dataDroits));
   }

  getDataUser(){
    return JSON.parse(localStorage.getItem('user')!);
  }

  getDroits(){
    return JSON.parse(localStorage.getItem('droits')!);
  }

  removeDataUser() {
    localStorage.removeItem('user');
  }

  removeDataUserDroits() {
    localStorage.removeItem('droits');
  }



}
