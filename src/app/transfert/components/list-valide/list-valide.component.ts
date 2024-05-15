import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

const pdfMake = require('pdfmake/build/pdfmake.js');
import { DatePipe, formatNumber } from '@angular/common';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { TransfertService } from '../../services/transfert.service';
import { AppService } from 'src/app/app.service';
import { environment } from 'src/environments/environment.prod';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-list-valide',
  templateUrl: './list-valide.component.html',
  styleUrls: ['./list-valide.component.scss']
})
export class ListValideComponent implements OnInit {
  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  number(number:number) {
    return  new Intl.NumberFormat('en-EN').format(number);
  }

  base_url=`${environment.apiLink}`;
  constructor(private route:ActivatedRoute,
              private router: Router,
              private appservice:AppService,
              private service:TransfertService) { }

  droit=this.appservice.getDroits();

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['num','agent','pos','montant','destination','piece'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;

  }

ngOnInit(): void {

  this.loadData();
}
  loadData(){
    this.isLoading = true;
    this.service.getTransfertValide().pipe(
      tap(clients=>{
        if(clients){
          this.dataSource.data = clients;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
          });
          this.isLoading = false;
        }
      })
    ).subscribe();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }


  Edit(id:any){
    this.router.navigateByUrl('/transfert/valider/'+id);
  }

  transfert:any;
  printIncoive(id:any){
    this.service.GetOne(id).subscribe(
      (data:any)=>{
        this.transfert=data;

        this.generatePDF(this.transfert);
      }
    );

  }


  generatePDF(transfert:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');

    console.log(transfert);

    let  numero=1

      const docDefinition = {
          pageSize: 'A5',
          pageMargins: [ 5, 10, 5, 10 ],

          content: [
            {
              text:transfert.ville,
              fontSize: 12,
              bold: true,
              alignment: 'center',
              decoration: 'underline',
              color: 'blue',
              margin:[ 0, 4, 0, 4 ],
            },
            {
              text: 'TRANSFERT N° ' + transfert.num_transfert +' DU '+datepipe.transform(transfert.date_transfert, 'dd/MM/YYYY'),
              fontSize: 12,
              bold: true,
              alignment: 'center',
              decoration: 'underline',
              color: 'black'
            },

            {
              columns: [
                [
                  {
                    text: 'EXPEDITEUR : ' +transfert.pos,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 8, 0, 4 ],
                  },
                  {
                    text: 'AGENT : ' +transfert.agent,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 4, 0, 4 ],
                  },
                  {
                    text: 'MATRICULE : ' +transfert.matricule,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 4, 0, 4 ],
                  },
                  {
                    text: 'POSTE : ' +transfert.poste,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 4, 0, 4 ],
                  },
                ],
                [
                  {
                    text: 'DESTINATEUR : '+transfert.caisse,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 8, 0, 4 ],
                  },
                  {
                    text: 'CAISSIER : ' +transfert.ville,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 10, 4, 0, 4 ]
                  },

                ],
              ]
            },

            {
              text: 'Transaction d\'une somme de '+ this.number(transfert.montant)+'Fc à la caisse centrale par l\'agent '+transfert.agent+' du poste '+transfert.poste +', PoS ' +transfert.pos,
              fontSize: 10,
              style: 'sectionHeader',
              margin:[ 10, 8, 4, 4 ],
            },

            {
              text: 'Montant en toute lettre : ..................................................................................................................................',
              fontSize: 10,
              style: 'sectionHeader',
              margin:[ 10, 4, 4, 4 ],
            },


            {
              columns: [
                [
                  {
                    text: 'EXPEDITEUR : ' +transfert.pos,
                    fontSize: 10,
                    style: 'sectionHeader',
                    alignment: 'center',
                    margin:[ 10, 8, 0, 4 ],
                  },
                  {
                    text: 'Nom et signature',
                    fontSize: 10,
                    style: 'sectionHeader',
                    alignment: 'center',
                    margin:[ 10, 4, 0, 4 ],
                  },

                ],
                [
                  {
                    text: 'DESTINATEUR : '+transfert.caisse,
                    fontSize: 10,
                    style: 'sectionHeader',
                    alignment: 'center',
                    margin:[ 10, 8, 0, 4 ],
                  },
                  {
                    text: 'Nom et signature',
                    fontSize: 10,
                    style: 'sectionHeader',
                    alignment: 'center',
                    margin:[ 10, 4, 0, 4 ],
                  },

                ],
              ]
            },




            ]
      };

      //pdfMake.createPdf(docDefinition).download('pdfmake.pdf');


    pdfMake.createPdf(docDefinition).print();
    //pdfMake.createPdf(docDefinition).print({}, window);

  }




}
