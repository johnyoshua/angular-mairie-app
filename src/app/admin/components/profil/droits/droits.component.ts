import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ProfilService } from 'src/app/admin/services/profil.service';
import {JsonPipe} from '@angular/common';
import {MatCheckboxModule} from '@angular/material/checkbox'
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-droits',
  templateUrl: './droits.component.html',
  styleUrls: ['./droits.component.scss']
})
export class DroitsComponent implements OnInit {

  constructor(
    private service:ProfilService ,
    private _formBuilder : FormBuilder,
    private route:Router,
    private appService : AppService,
    private activerouter: ActivatedRoute
    ) { }
  pageTitle="Ajouter ou supprimer les droits"
  loading=false;

  droits = this.appService.getDroits();

  ngOnInit(): void {

    let profil_di = this.activerouter.snapshot.paramMap.get('id');

    this.service.GetOneDroits(profil_di).subscribe((data:any)=>{

      this.toppings.setValue({
        super_administrateur: data.super_administrateur,
        administrateur:  data.administrateur,
        agent:  data.agent,
        contribuable:  data.contribuable,
        province:  data.province,
        ville:  data.ville,
        poste:  data.poste,
        pos:  data.pos,
        montant:  data.montant,
        taxe:  data.taxe,
        type_contribuable:  data.type_contribuable,
        paiement_taxe:  data.paiement_taxe,
        caisse_recette:  data.caisse_recette,
        caisse:  data.caisse,
        transfert:  data.transfert,
        banque:  data.banque,
        rapport_par_poste:  data.rapport_par_poste,
        rapport_banque:  data.rapport_banque,
        rapport_caisse_recette:  data.rapport_caisse_recette,
        rapport_paiement_taxe:  data.rapport_paiement_taxe,
        profil:  data.profil,
        mot_de_passe:  data.mot_de_passe,
        user:  data.user,
      })
    });

  }

  toppings = this._formBuilder.group({
    super_administrateur: false,
    administrateur: false,
    agent: false,
    contribuable: false,
    province: false,
    ville: false,
    poste: false,
    pos: false,
    montant: false,
    taxe: false,
    type_contribuable: false,
    paiement_taxe: false,
    caisse_recette: false,
    caisse: false,
    transfert: false,
    banque: false,
    rapport_par_poste: false,
    rapport_banque: false,
    rapport_caisse_recette: false,
    rapport_paiement_taxe: false,
    profil: false,
    mot_de_passe: false,
    user: false,
  });

  save(){
    this.service.updateDroits(this.activerouter.snapshot.paramMap.get('id'),this.toppings.getRawValue()).subscribe(res=>{
      let result:any;
      result=res;
      if(result.message=='pass'){
        this.route.navigateByUrl('/admin/profil/list');
        Swal.fire('', 'Modification fait avec succès!', 'success');
        this.loading = false;
      }else{
        Swal.fire('', 'Echec modufication!', 'error');
        this.loading = false;
      }
    }
  );
  }



}
