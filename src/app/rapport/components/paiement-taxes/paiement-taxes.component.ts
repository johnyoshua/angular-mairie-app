import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import Swal from 'sweetalert2';

const pdfMake = require('pdfmake/build/pdfmake.js');
import { DatePipe, formatNumber } from '@angular/common';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FormBuilder, FormControl } from '@angular/forms';
import { RapportService } from '../../services/rapport.service';
(<any>pdfMake).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-paiement-taxes',
  templateUrl: './paiement-taxes.component.html',
  styleUrls: ['./paiement-taxes.component.scss']
})
export class PaiementTaxesComponent implements OnInit {

  
  loading$!: Observable<boolean>;
  magasin$!: Observable<any>;

  number(number:number) {
    return  new Intl.NumberFormat('en-EN').format(number);
  }

  base_url='http://localhost/elicom/elicombackend/banckend/public/';
  constructor(private route:ActivatedRoute,
              private router: Router,
              private builder : FormBuilder,
              private service:RapportService) { }

  contribuable:any=[];           

  ELEMENT_DATA: any = [];
  isLoading = false;
  totalRows = 0;
  pageSize = 100;
  currentPage = 0;
  pageSizeOptions: number[] = [100, 150, 200, 250, 500];

  displayedColumns: string[] = ['date','contribuable','matricule','adresse','num_paiement','montant','impression'];
  dataSource: MatTableDataSource<any> = new MatTableDataSource();

  dateDebutCtrl!:FormControl;
  dateFinCtrl!:FormControl;

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  date_debut:any;

  getDateDebut() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let dateDeb = this.mainForm.get('date_debut')?.value;
    let DateModifier=datepipe.transform(dateDeb, 'dd/MM/YYYY');
    this.date_debut = 'DU ' + DateModifier;
    this.loadData()

  }

  date_fin:any;
  getDateFin() {
    const datepipe: DatePipe = new DatePipe('en-US');
    let dateDeb = this.mainForm.get('date_fin')?.value;
    let DateModifier=datepipe.transform(dateDeb, 'dd/MM/YYYY');
    this.date_fin = 'AU ' + DateModifier;
    this.loadData()
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
    this.service.getHistorique(this.mainForm.getRawValue()).pipe(
      tap((data:any)=>{
        if(data){
          this.dataSource.data = data.liste;
          setTimeout(() => {
            this.paginator.pageIndex = this.currentPage;
          });
          this.isLoading = false;
        }
      })
    ).subscribe();
  }

  mainForm=this.builder.group({
    date_debut:this.dateDebutCtrl=this.builder.control(''),
    date_fin:this.dateFinCtrl=this.builder.control(''),
})

  printRapport(){
    this.RapportPDF(this.dataSource.data, this.contribuable );
  }

  getTotalMontant() {
    return this.dataSource.data.map(t => t.montant).reduce((acc, value) => acc + value, 0);
  }

  pageChanged(event: PageEvent) {
    this.pageSize = event.pageSize;
    this.currentPage = event.pageIndex;
    this.loadData();
  }


  Edit(id:any){
    this.router.navigateByUrl('/contribuables/update/'+id);
  }

 

  paiement:any;
  details:any;
  printIncoive(id:any){
    this.service.getRecu(id).subscribe(
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

  RapportPDF(hiatoriques: any, dataC:any) {
    const datepipe: DatePipe = new DatePipe('en-US');
    let dateDebut='';
    if(this.date_debut==undefined){
      dateDebut='';
    }else{
      dateDebut=this.date_debut
    }

    let dateFin='';
    if(this.date_fin==undefined){
      dateFin='';
    }else{
      dateFin=this.date_fin
    }

      const docDefinition = {
          //pageMargins: [ 0, 0, 0, 0 ],
          pageOrientation: 'landscape',
          content: [
            {
              text: 'RAPPORT DES PAIEMENTS DES TAXES '+ dateDebut+' '+dateFin,
              fontSize: 14,
              bold: true,
              alignment: 'center',
              margin:[ 0, 0, 0, 12 ],
            },

            {
              table: {
                headerRows: 1,
                widths: ['auto','auto','auto','*', 'auto', 'auto'],
                body: [
                  ['DATE','CONTRIBUABLES','MATRICULE','TAXES', 'N° RECU', 'MONTANT'],
                  ...hiatoriques.map((p: {date_paiement: string;denomination:string;matricule:string; libelle:string; num_paiement:number; montant: number })=> ([datepipe.transform(p.date_paiement, 'dd/MM/YYYY'),p.denomination,p.matricule, p.libelle, p.num_paiement, this.number(p.montant)])),
                    [{ text: 'TOTAL', colSpan: 5 }, {},{},{},{}, this.number(this.getTotalMontant())],
                ]
              }
            },

           {
            columns: [
              [
                {
                  text:'Ce rapport est généré par le système.',
                  margin:[ 0, 12, 0, 0 ],
                }
              ],
              [ { text: 'Fait à buja le '+datepipe.transform(new Date(), 'dd/MM/YYYY'), alignment: 'right', italics: true,margin:[ 0, 12, 0, 0 ], },],
            ]
          },


          ]
      };

      //pdfMake.createPdf(docDefinition).download('pdfmake.pdf');


    pdfMake.createPdf(docDefinition).print();
    //pdfMake.createPdf(docDefinition).print({}, window);

  }




}
