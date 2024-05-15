import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthStateService } from 'src/app/login/services/auth-state.service';
import { TokenService } from 'src/app/login/services/token.service';
import { AppService } from '../../../app.service';
import * as histogram from 'highcharts/modules/histogram-bellcurve';
import * as Highcharts from 'highcharts';
import { DashboardService } from '../../services/dashboard.service';
import { DatePipe } from '@angular/common';




@Component({
  selector: 'app-dashbord',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
})
export class DashbordComponent implements OnInit {

  constructor(private appService: AppService,
    private service:DashboardService,
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService) { }

    number(number:number) {
      return  new Intl.NumberFormat('en-EN').format(number);
    }

  user=this.appService.getDataUser();
  droits=this.appService.getDroits();

  juin!:number;
  label:any;
  Totaljournalier!:number;
  totalPoste!:number;
  totalBanque!:number;

 
  ngOnInit(): void {
    this.VerifierCompte();
    this.service.getData().subscribe(
      (data:any)=>{
        
        this.Totaljournalier=data.recete_journalier.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0);
        this.recete_journalier(data.recete_journalier,this.Totaljournalier);

        this.totalPoste=data.recette_poste.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0);

        this.recete_poste(data.recette_poste,this.totalPoste);

        this.totalBanque=data.compte_bancaire.map((t: { montant: number; }) => t.montant).reduce((acc: number, value: number) => acc + value, 0);

        this.getBanque(data.compte_bancaire,this.totalBanque)

      }
    )

  }

  VerifierCompte(){
    if(this.user.statut==0){
      this.auth.setAuthState(false);
      this.token.removeToken();
      this.appService.removeDataUser();
      this.router.navigateByUrl('/admin/redirescte');
    }
  }


  recete_journalier(rerettes:any,total:number){

    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');
    let mois = datepipe.transform(new Date, 'MM');
    let nom_mois='';
    if(mois=='01'){
      nom_mois='Jeanvier';
    }else if(mois=='02'){
      nom_mois='Février';
    }else if(mois=='03'){
      nom_mois='Mars';
    }else if(mois=='04'){
      nom_mois='Avril';
    }else if(mois=='05'){
      nom_mois='Mai';
    }else if(mois=='06'){
      nom_mois='Juin';
    }else if(mois=='07'){
      nom_mois='Juillet';
    }else if(mois=='08'){
      nom_mois='Aout';
    }else if(mois=='09'){
      nom_mois='Septembre';
    }else if(mois=='10'){
      nom_mois='Octobre';
    }else if(mois=='11'){
      nom_mois='Novembre';
    }else if(mois=='12'){
      nom_mois='Décembre';
    }

    // @ts-ignore
    Highcharts.chart('container', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Recette journalier pour le mois de '+nom_mois
      },
      subtitle: {
          text: 'Le montant total de mois de '+nom_mois+' est de <b>'+this.number(total)+' FC</b>'
      },
      xAxis: {
          categories: [
            ...rerettes.map((p: {dateP: number; })=> ('Le '+datepipe.transform(p.dateP, 'dd-MM-YYYY'))),
          ],
          crosshair: true
      },
      yAxis: {
          min: 0,
          title: {
              text: 'Rerettes'
          }
      },
      tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} FC</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
      },
      plotOptions: {
          column: {
              pointPadding: 0.2,
              borderWidth: 0
          }
      },
      series: [{
          name: 'Rerettes',
          data: [
            ...rerettes.map((p: {montant: number; })=> (p.montant)),

          ]

      },]
  });

  }

  recete_poste(postes:any, total:number){

    const datepipe: DatePipe = new DatePipe('en-US');
    let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');
    let mois = datepipe.transform(new Date, 'MM');
    let nom_mois='';
    if(mois=='01'){
      nom_mois='Jeanvier';
    }else if(mois=='02'){
      nom_mois='Février';
    }else if(mois=='03'){
      nom_mois='Mars';
    }else if(mois=='04'){
      nom_mois='Avril';
    }else if(mois=='05'){
      nom_mois='Mai';
    }else if(mois=='06'){
      nom_mois='Juin';
    }else if(mois=='07'){
      nom_mois='Juillet';
    }else if(mois=='08'){
      nom_mois='Aout';
    }else if(mois=='09'){
      nom_mois='Septembre';
    }else if(mois=='10'){
      nom_mois='Octobre';
    }else if(mois=='11'){
      nom_mois='Novembre';
    }else if(mois=='12'){
      nom_mois='Décembre';
    }
    // @ts-ignore
     Highcharts.chart('container_1', {
       chart: {
           type: 'pie',
           options3d: {
               enabled: true,
               alpha: 45
           }
       },
       title: {
           text: 'Recette par poste pour le mois de '+nom_mois,
           align: 'center'
       },
       subtitle: {
           text: 'Montant total de tous les poste est de <b>'+this.number(total)+' FC</b>',
           align: 'center'
       },
       plotOptions: {
           pie: {
               innerSize: 100,
               depth: 45
           }
       },
       series: [{
           name: 'Montant',
           data: [
             ...postes.map((p: {poste:string; montant: number; })=> ([p.poste,p.montant])),
           ]
       }]
     });

 }

 getBanque(banque:any, total:number){
  const datepipe: DatePipe = new DatePipe('en-US');
  let formattedDate = datepipe.transform(new Date, 'dd/MM/YYYY');
  let mois = datepipe.transform(new Date, 'MM');
  let nom_mois='';
  if(mois=='01'){
    nom_mois='Jeanvier';
  }else if(mois=='02'){
    nom_mois='Février';
  }else if(mois=='03'){
    nom_mois='Mars';
  }else if(mois=='04'){
    nom_mois='Avril';
  }else if(mois=='05'){
    nom_mois='Mai';
  }else if(mois=='06'){
    nom_mois='Juin';
  }else if(mois=='07'){
    nom_mois='Juillet';
  }else if(mois=='08'){
    nom_mois='Aout';
  }else if(mois=='09'){
    nom_mois='Septembre';
  }else if(mois=='10'){
    nom_mois='Octobre';
  }else if(mois=='11'){
    nom_mois='Novembre';
  }else if(mois=='12'){
    nom_mois='Décembre';
  }
  // @ts-ignore
  Highcharts.chart('container_2', {
      chart: {
          type: 'column'
      },
      title: {
          text: 'Recette déposer dans les comptes bancaires pour le mois de '+nom_mois
      },
      subtitle: {
          text: 'Montant total est de <b>'+this.number(total)+' Fbu</b>'
      },
      xAxis: {
          type: 'category',
          labels: {
              rotation: -45,
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      },
      yAxis: {
          min: 0,
          title: {
              text:  ' Montant (en francs)'
          }
      },
      legend: {
          enabled: false
      },
      tooltip: {
          pointFormat: 'Montant: <b>{point.y:.1f} Fbu</b>'
      },
      series: [{
          name: 'montant estimé',
          colors: ['teal'],
          colorByPoint: true,
          groupPadding: 0,
          data: [
            ...banque.map((p: {banque:string; montant: number; })=> ([p.banque,p.montant])),
          ],
          dataLabels: {
              enabled: true,
              rotation: -90,
              color: '#FFFFFF',
              align: 'right',
              format: '{point.y:.1f}', // one decimal
              y: 10, // 10 pixels down from the top
              style: {
                  fontSize: '13px',
                  fontFamily: 'Verdana, sans-serif'
              }
          }
      }]
  });

}




  }




