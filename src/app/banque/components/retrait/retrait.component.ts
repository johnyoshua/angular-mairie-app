import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { BanqueService } from '../../services/banque.service';

@Component({
  selector: 'app-retrait',
  templateUrl: './retrait.component.html',
  styleUrls: ['./retrait.component.scss']
})
export class RetraitComponent implements OnInit {

  base_url=`${environment.apiLink}`;
  constructor(private service:BanqueService ,
              private builder : FormBuilder,
              private route:Router,
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

  montantCtrl!: FormControl;
  motifCtrl!:FormControl;
 
  showCaisseDepense$!: Observable<boolean>;
  showFournisseur$!: Observable<boolean>;
  errors:any = [];
  paiement:any;



  ngOnInit(): void {
    this.getDataDetailPaiement(this.activerouter.snapshot.paramMap.get('id'));
  }

  mainForm=this.builder.group({
    montant:this.montantCtrl=this.builder.control('',[Validators.required]),
    motif:this.motifCtrl=this.builder.control('',[Validators.required]),
    admin_banque_id:this.builder.control(this.activerouter.snapshot.paramMap.get('id')),
   });

  banque:any;
  getDataDetailPaiement(id:any){
    this.isLoading=true;
    this.service.GetDataCompteBancaireOne(id).pipe(
      tap((resultat:any)=>{
          this.isLoading=false;
          this.banque=resultat;
      })).subscribe();
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
        Swal.fire('Echec', 'Vueillez ajouter le bordereau de retrait!', 'error');
        this.loading=false;
      }
  }else{
    Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
    this.loading=false;
  }
  }

  upload(idx: number, file: File): void {
  
    if (file) {
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      let montant_total:any = this.banque.montant;
      let montant:any =this.mainForm.get('montant')?.value;

      if(montant_total<montant){
        this.loading=false;
        Swal.fire({
          title: '',
          text:   'Le montant retirer est supeieur au solde du compte bancaire',
          icon: 'error'
      });
      }else{
        myFormData.append('bordereau', file);
        myFormData.append('montant', this.mainForm.get('montant')?.value!);
        myFormData.append('motif', this.mainForm.get('motif')?.value!);
        myFormData.append('admin_banque_id', this.mainForm.get('admin_banque_id')?.value!);
        this.service.SaveRetraitCompteBancaire(myFormData).subscribe(
            (result: any) => {
                this.loading=false;
                let data =result;
              if(data.message=='pass'){
                this.route.navigateByUrl('/banques/liste');
                Swal.fire({
                  title: '',
                  text:   'Retrait éffectuer avec succès',
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

  
}
