import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

const pdfMake = require('pdfmake/build/pdfmake.js');
import { DatePipe, formatNumber } from '@angular/common';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { GetpaiementService } from '../../services/getpaiement.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-get-list',
  templateUrl: './get-list.component.html',
  styleUrls: ['./get-list.component.scss']
})
export class GetListComponent implements OnInit {

  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  number(number:number) {
    return  new Intl.NumberFormat('en-EN').format(number); 
  }

  base_url='http://localhost/elicom/elicombackend/banckend/public/';
  constructor(private route:ActivatedRoute,
              private router: Router,
              private service:GetpaiementService) { }

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 5;
  currentPage = 0;
  pageSizeOptions: number[] = [5, 10, 25, 50, 100];

  displayedColumns: string[] = ['date','num_paiement','description','montant','impression'];
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
    this.service.getData().pipe(
      tap(paiements=>{
        if(paiements){
          this.dataSource.data = paiements;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
          });
          this.isLoading = false;
          console.log(this.dataSource.data);
        }
      })
    ).subscribe();
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }

  confirmBox(id:number){
    Swal.fire({
      title: 'Voulez-vous vraiment supprimer ce contribuable?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimer!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.service.delete(id).subscribe(res => {
          this.service.getData().pipe(
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
          Swal.fire(
            '',
            'suppresion fait avec succès.',
            'success'
          )
     })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Suppresion annuler avec succès',
          'error'
        )
      }
    })
  }
  Edit(id:any){
    this.router.navigateByUrl('/contribuables/update/'+id);
  }

  paiement:any;
  details:any;
  printIncoive(id:any){
    this.service.GetOne(id).subscribe(
      (data:any)=>{
        this.paiement=data['paiement'];
        this.details=data['details'];
        this.generatePDF(this.paiement,this.details);
      }
    );

  }

  getTotal() {
    return this.details.map((t: { montant: any; }) => t.montant).reduce((acc: any, value: any) => acc + value, 0);
  }

  generatePDF(paiement: any, details:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');

    let  numero=1

      const docDefinition = {
          pageSize: 'A7',
          pageMargins: [ 5, 10, 5, 10 ],

          content: [
            {
              text: 'RECU N° ' + paiement.num_paiement +' DU '+datepipe.transform(paiement.date_paiement, 'dd/MM/YYYY'),
              fontSize: 12,
              bold: true,
              alignment: 'center',
              decoration: 'underline',
              color: 'blue'
            },

            {
              columns: [
                [
                  {
                    text: 'DENOMINATION: ' +paiement.name,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 0, 4, 0, 4 ],
                  },
                  {
                    text: 'MATRIUCLE: ' +paiement.indication+''+paiement.matricule,
                    fontSize: 10,
                    style: 'sectionHeader',
                    margin:[ 0, 4, 0, 4 ],
                  }
                ],
              ]
            },

            {
              table: {
                headerRows: 1,
                widths: ['auto','*', 'auto'],
                body: [
                  ['N°','TAXES', 'MONTANT'],
                  ...details.map((p: {numero: number; description: string;  montant: number })=> ([numero++, p.description, this.number(p.montant)])),
                    [{ text: 'TOTAL', colSpan: 2 }, {}, this.number(this.getTotal())],
                ]
              }
            },

            {
              text: "TERMES ET CONDITIONS",
              style: 'sectionHeader',
              fontSize: 10,
              decoration: 'underline',
              margin:[ 0, 8, 0, 8 ],
            },

            {
              ul: [
                'Ceci est une facture générée par le système.',
                'Plus droit de modifier ou supprimer apres paiement',
              ],
            }


            ]
      };

      //pdfMake.createPdf(docDefinition).download('pdfmake.pdf');


    pdfMake.createPdf(docDefinition).print();
    //pdfMake.createPdf(docDefinition).print({}, window);

  }




}
