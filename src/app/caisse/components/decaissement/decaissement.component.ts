import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { CaisseService } from '../../services/caisse.service';
import { BanqueService } from 'src/app/banque/services/banque.service';


@Component({
  selector: 'app-decaissement',
  templateUrl: './decaissement.component.html',
  styleUrls: ['./decaissement.component.scss']
})
export class DecaissementComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:CaisseService ,
              private builder : FormBuilder,
              private route:Router,
              private serviceBanque:BanqueService,
              private activerouter: ActivatedRoute) { }

  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  previews: string[] = [];
  ifImage=false;
  linkImage='';

  decaissementPreferenceCtrl!: FormControl;
  montantCtrl!: FormControl;
  banque_idCtrl!:FormControl;
  motif_modificationCtrl!:FormControl;

  showCash$!: Observable<boolean>;
  showOv$!: Observable<boolean>;
  errors:any = [];
  caisse:any;

  detail_paiement_id:any;

  mainForm=this.builder.group({
    preference:this.decaissementPreferenceCtrl = this.builder.control('autre'),
    montant:this.montantCtrl=this.builder.control('',[Validators.required]),
    banque_id:this.banque_idCtrl=this.builder.control(''),
    solde:this.builder.control(0),
    motif_modification:this.motif_modificationCtrl=this.builder.control('',[Validators.required,Validators.minLength(15)]),
   });

  ngOnInit(): void {
    this.getBanque();
    this.initFormObservable();
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
          this.mainForm.get('solde')?.setValue(this.caisse.solde);
      })
    ).subscribe();
  }

  private initFormObservable(){
    this.showOv$ = this.decaissementPreferenceCtrl.valueChanges.pipe(
      startWith(this.decaissementPreferenceCtrl.value),
      map(preference => preference === 'ov'),
      tap(showOv =>{
        if(showOv){
          this.banque_idCtrl.addValidators([
            Validators.required
          ]);
        }else{
          this.banque_idCtrl.clearValidators();
        }
        this.banque_idCtrl.updateValueAndValidity();
      })
    );
  }


   selectFiles(event: any): void {
    this.progressInfos = [];
    this.selectedFileNames = [];
    this.selectedFiles = event.target.files;
    this.ifImage=false;

    this.previews = [];
    if (this.selectedFiles && this.selectedFiles[0]) {
      const numberOfFiles = this.selectedFiles.length;
      for (let i = 0; i < numberOfFiles; i++) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          this.previews.push(e.target.result);
        };
        reader.readAsDataURL(this.selectedFiles[i]);
        this.selectedFileNames.push(this.selectedFiles[i].name);
      }
    }
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
    let preferenceSelect = this.mainForm.get('preference')?.value;
      if (this.selectedFiles){
        for (let i = 0; i < this.selectedFiles.length; i++) {
          this.upload(i, this.selectedFiles[i]);
        }
      }else{
        Swal.fire('Echec', 'Vueillez ajouter le bordereau!', 'error');
        this.loading=false;
      }


  }else{
    Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
    this.loading=false;
  }
  }

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };
    if (file) {
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      let solde:any =this.mainForm.get('solde')?.value;
      let montant:any =this.mainForm.get('montant')?.value;

      if(montant>solde){
        this.loading=false;
        Swal.fire({
          title: '',
          text:   'Le solde de la caisse est inferieur au montant décaisser',
          icon: 'error'
        });
      }else{
        myFormData.append('bordereau', file);
        myFormData.append('montant',montant);
        myFormData.append('preference', this.mainForm.get('preference')?.value!);
        myFormData.append('motif', this.mainForm.get('motif_modification')?.value!);
        myFormData.append('banque_id', this.mainForm.get('banque_id')?.value!);
        myFormData.append('solde', solde!);
        myFormData.append('caisse_id', this.activerouter.snapshot.paramMap.get('id')!);

          this.service.SaveDecaissement(myFormData).subscribe(
            (result: any) => {
                this.loading=false;
                let data =result;
              if(data.message=='pass'){
                this.route.navigateByUrl('/caisse/list');
                Swal.fire({
                  title: '',
                  text:   'Versement effectuer avec succes',
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
              this.progressInfos[idx].value = 0;
              this.errors=err.error;
              this.loading=false;
            }
          );
      }

    }
  }

  banques:any[]=[];
  private getBanque(){
    this.serviceBanque.getData().pipe(
      tap((resultat:any)=>{
        if(resultat){
          this.banques=resultat;
        }
      })
    ).subscribe();
  }

  GetDetail(){
    this.route.navigateByUrl('/admin/factures/detail-paiement/'+this.caisse.invoice_num);
  }
}
