import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-en-tete',
  templateUrl: './en-tete.component.html',
  styleUrls: ['./en-tete.component.scss']
})
export class EnTeteComponent implements OnInit {

  constructor() { }

  tilePage="";
  nameSite="";

  ngOnInit(): void {
  }

}
