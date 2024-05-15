import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, startWith, tap } from 'rxjs';

import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';


import { BanqueService } from 'src/app/banque/services/banque.service';
import { CaisseRecetteService } from '../../services/caisse-recette.service';


@Component({
  selector: 'app-transfert',
  templateUrl: './transfert.component.html',
  styleUrls: ['./transfert.component.scss']
})
export class TransfertComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:CaisseRecetteService ,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;

  caisses:any[]=[];

  montantCtrl!: FormControl;
  caisse_idCtrl!:FormControl;



  errors:any = [];
  caisse:any;

  detail_paiement_id:any;

  mainForm=this.builder.group({
    montant:this.montantCtrl=this.builder.control('',[Validators.required]),
    caisse_id:this.caisse_idCtrl=this.builder.control('',[Validators.required]),
    solde:this.builder.control(0),
    caisse_recette_id : this.builder.control(this.activerouter.snapshot.paramMap.get('id')),
   });

  ngOnInit(): void {
    this.getListCaisse();
    this.detail_paiement_id = this.activerouter.snapshot.paramMap.get('id');
    this.getDataDetailPaiement(this.detail_paiement_id);
  }
  banque:any;
  getDataDetailPaiement(id:any){
    this.isLoading=true;
    this.service.GetDataCaisseRecetteOne(id).pipe(
      tap(resultat=>{
        let data :any=resultat;
        this.isLoading=false;
          this.caisse=data.caisse;
          this.mainForm.get('montant')?.setValue(this.caisse.solde);
          this.mainForm.get('solde')?.setValue(this.caisse.solde);
      })
    ).subscribe();
  }

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Ce champ est requis';
    } else if(ctrl.hasError('email')){
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce motif ne contient pas assez des lettres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
  }

uploadFiles(): void {
  if(this.mainForm.valid){
    this.loading=true;
    this.service.SaveTransfert(this.mainForm.getRawValue()).subscribe(
      (result: any) => {
          this.loading=false;
          let data =result;
        if(data.message=='pass'){
          this.route.navigateByUrl('/caisse-recette/list');
          Swal.fire({
            title: '',
            text:   'TRansfert effectuer avec succes',
            icon: 'success'
        });
        }else{
          Swal.fire({
            title: '',
            text:   ''+data.message+'',
            icon: 'error'
        });
        }
          this.loading=false;
      },
      (err: any) => {
        this.errors=err.error;
        this.loading=false;
      }
    );


  }else{
    Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
    this.loading=false;
  }
  }


  private getListCaisse(){
    this.service.getListCaisses().pipe(
      tap((resultat:any)=>{
        if(resultat){
          this.caisses=resultat;
        }
      })
    ).subscribe();
  }

  GetDetail(){
    this.route.navigateByUrl('/admin/factures/detail-paiement/'+this.caisse.invoice_num);
  }
}
