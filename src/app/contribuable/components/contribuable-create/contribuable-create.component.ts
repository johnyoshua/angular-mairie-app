import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';;
import { ContribuableService } from '../../services/contribuable.service';
import { VilleService } from 'src/app/ville/service/ville.service';
import { TypeContribuableService } from 'src/app/type-contribuable/services/type-contribuable.service';

@Component({
  selector: 'app-contribuable-create',
  templateUrl: './contribuable-create.component.html',
  styleUrls: ['./contribuable-create.component.scss']
})
export class ContribuableCreateComponent implements OnInit {


  base_url=`${environment.apiUrl}/`;
  constructor(private service:ContribuableService,
              private serviceVille:VilleService,
              private serviceType:TypeContribuableService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un contribuable";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  villes:any = [];
  types_contribuables:any = [];

  contribuablePreferenceCtrl!: FormControl;

  type_contribuable_idCtrl!: FormControl;
  adresseCtrl!: FormControl;
  telephoneCtrl!: FormControl;
  emailCtrl!: FormControl;
  activiteCtrl!:FormControl;
  nameCtrl!:FormControl;

  nifCtrl!:FormControl;
  rcCtrl!:FormControl;
  numimpotCtrl!:FormControl;

  showSociete$!: Observable<boolean>;



  ngOnInit(): void {
    this.initFormObservables();
    this.getVille();
    this.getContribuable();
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.isEdit=true;
      this.pageTitle="Modifier le contribuable";
      this.service.GetOne(this.idClient).pipe(
        tap(client=>{
          let data:any=client;
          console.log(data);
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }

  private setValueClient(data:any){
      this.mainForm.setValue({
        type_contribuable_id:''+data.type_contribuable_id+'',
        adresse:data.adresse,
        telephone:data.telephone,
        name:data.denomination,
        email:data.email,
        activite:data.activite,
        nif:data.nif,
        rc:data.rc,
        numimpot:data.numero_impot
      })

  }

  mainForm=this.builder.group({
    type_contribuable_id:this.contribuablePreferenceCtrl = this.builder.control('2'),
    adresse:this.adresseCtrl=this.builder.control('',[Validators.required]),
    telephone:this.telephoneCtrl=this.builder.control('',[Validators.required]),
    email:this.emailCtrl=this.builder.control('',[Validators.email]),
    name:this.nameCtrl=this.builder.control('',[Validators.required]),
    activite:this.activiteCtrl=this.builder.control('',[Validators.required]),
    nif:this.nifCtrl=this.builder.control(''),
    rc:this.rcCtrl=this.builder.control(''),
    numimpot:this.numimpotCtrl=this.builder.control(''),
   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'La description du province est obligatoire!';
    } else if(ctrl.hasError('email')) {
      return 'Entrer l\'E-mail valide!';
    }else{
      return 'Ce champ contient une erreur';
    }
}

private initFormObservables() {
  this.showSociete$ = this.contribuablePreferenceCtrl.valueChanges.pipe(
      startWith(this.contribuablePreferenceCtrl.value),
      map(preference => preference == '1'),
  );
}

uploadFiles(): void {
  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idClient,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/contribuables/liste');
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
        },(err: any) => {
          this.errors=err.error;
          this.loading=false;
        }
        )
      ).subscribe();
    }else{
      if(this.mainForm.valid){
          this.service.saveData(this.mainForm.getRawValue()).subscribe(
              (event: any) => {
                  this.loading=false;
                  this.route.navigateByUrl('/contribuables/liste');
                  Swal.fire({
                      title: 'Enregistrement',
                      text: 'Fait avec succès',
                      icon: 'success'
                  });
                  this.loading=false;
                },(err: any) => {
                  this.errors=err.error;
                  this.loading=false;
                }
            );

      }else{
        Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
        this.loading=false;
      }
    }
  }

  getVille(){
    this.serviceVille.getData().subscribe(res=>{
      this.villes = res;
    })
  }

  getContribuable(){
    this.serviceType.getData().subscribe(res=>{
      this.types_contribuables = res;
    })
  }


}
