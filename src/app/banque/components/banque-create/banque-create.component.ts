import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { BanqueService } from '../../services/banque.service';



@Component({
  selector: 'app-banque-create',
  templateUrl: './banque-create.component.html',
  styleUrls: ['./banque-create.component.scss']
})
export class BanqueCreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:BanqueService ,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajouter le compte bancaire";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  societes:any[]=[];
  errors:any = [];

  societe_idCtrl!: FormControl;
  descriptionCtrl!:FormControl;
  montantCtrl!:FormControl;
  compteCtrl!:FormControl;


  showSociete$!: Observable<boolean>;

  ngOnInit(): void {
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.loading = true;
      this.isEdit=true;
      this.pageTitle="Modifier les informations du compte bancaire";
      this.service.GetOne(this.idClient).pipe(
        tap(banque=>{
          this.loading = false;
          let data:any=banque;
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }
  private setValueClient(data:any){
      this.mainForm.setValue({
        description:data.description,
        compte:data.compte,
        montant:data.montant,
      })
      this.selected=''+data.tva+'';
  }

  mainForm=this.builder.group({
    description:this.descriptionCtrl=this.builder.control('',[Validators.required]),
    compte:this.compteCtrl=this.builder.control('',[Validators.required]),
    montant:this.montantCtrl=this.builder.control('',[Validators.required]),
   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Ce champ est requis';
    } else if(ctrl.hasError('email')){
      return 'Merci d\'entrer une adresse mail valide';
    } else if (ctrl.hasError('minlength')) {
      return 'Ce numéro de téléphone ne contient pas assez de chiffres';
    } else if (ctrl.hasError('maxlength')) {
      return 'Ce numéro de téléphone contient trop de chiffres';
    } else {
      return 'Ce champ contient une erreur';
    }
}

saved(): void {
  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idClient,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/banques/liste');
            Swal.fire({
              title: 'Modification',
              text:   'Modification fait avec succès',
              icon: 'success'
            });
          }else{
            Swal.fire({
              title: 'Erreur',
              text:   'Modification fait avec succès',
              icon: 'error'
          });
          }
        },
        (err:any)=>{
          this.loading=false;
          this.errors=err.error;
        }
        )
      ).subscribe();

    }else{
      if(this.mainForm.valid){
          this.service.saveData(this.mainForm.getRawValue()).subscribe(
              (event: any) => {
                  this.loading=false;
                  this.route.navigateByUrl('/banques/liste');
                  Swal.fire({
                      title: 'Enregistrement',
                      text:   'Fait avec succès',
                      icon: 'success'
                  });
                  this.loading=false;
                },
              (err:any)=>{
                this.loading=false;
                this.errors=err.error;
              }
          );
      }else{
        Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
        this.loading=false;
      }
    }
  }
}
