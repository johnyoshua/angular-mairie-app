import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor() { }

  smallMenu=true;
  traitement="hidden";


  ngOnInit(): void {

  }

  showMenu(){
    if(this.smallMenu){
      this.smallMenu=false;
      this.traitement=''
    }else{
      this.smallMenu=true;
      this.traitement='hidden';
    }
  }

  open(){

  }





}
