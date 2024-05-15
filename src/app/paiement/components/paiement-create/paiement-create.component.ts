import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators, FormArray, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { PaiementService } from '../../services/paiement.service';
import { ContribuableService } from 'src/app/contribuable/services/contribuable.service';
import { TaxeService } from 'src/app/taxe/services/taxe.service';
import { MontantService } from 'src/app/montant/services/montant.service';
import { BanqueService } from 'src/app/banque/services/banque.service';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-paiement-create',
  templateUrl: './paiement-create.component.html',
  styleUrls: ['./paiement-create.component.scss']
})
export class PaiementCreateComponent implements OnInit{
  base_url=`${environment.apiUrl}/`;
  constructor(private service:PaiementService,
              private serviceContribuable:ContribuableService,
              private serviceTaxe:TaxeService,
              private serviceMontant:MontantService,
              private serviceBanque:BanqueService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'un paiement de contribuable";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  contribuables:any = [];
  taxes:any = [];
  montants:any = [];
  banques:any = [];

  paimentPreferenceCtrl!: FormControl;
  showOv$!: Observable<boolean>;

  contribuable_idCtrl!: FormControl;
  banque_idCtrl!: FormControl;
  taxe_idCtrl!: FormControl;
  montant_idCtrl!: FormControl;
  adresseCtrl!: FormControl;
  telephoneCtrl!: FormControl;
  emailCtrl!: FormControl;
  activiteCtrl!:FormControl;
  nameCtrl!:FormControl;

  editinvoicedetail:any;
  invoicedetail!: FormArray<any>;
  invoiceproduct!:FormGroup<any>;

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  progressInfos: any[] = [];
  previews: string[] = [];
  ifImage=false;
  linkImage='';




  ngOnInit(): void {
    this.getcontribuable();
    this.getTaxe();
    this.getMontant();
    this. getBanques();
    this.initFormObservables();
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.isEdit=true;
      this.pageTitle="Modifier le paiement de contribuable";
      this.service.GetOne(this.idClient).pipe(
        tap(paiements=>{

          let data:any=paiements;
          console.log(data);
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }


  private setValueClient(data:any){
      this.mainForm.setValue({
        preference:data.preference,
        contribuable_id:data.contribuable_id,
        banque_id:data.taxe_id,
        details:this.editinvoicedetail
      })

  }

  mainForm=this.builder.group({
    preference:this.paimentPreferenceCtrl = this.builder.control('cash'),
    contribuable_id:this.contribuable_idCtrl=this.builder.control('',[Validators.required]),
    banque_id:this.banque_idCtrl=this.builder.control(''),
    details:this.builder.array([]),
   })

  private initFormObservables() {
    this.showOv$ = this.paimentPreferenceCtrl.valueChanges.pipe(
      startWith(this.paimentPreferenceCtrl.value),
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

get invproducts(){
  return this.mainForm.get("details") as FormArray;
}
addNewProduct(){
  this.invoicedetail = this.mainForm.get("details")! as FormArray;
  let contribuable_id= this.mainForm.get("contribuable_id")?.value;
  if((contribuable_id!=null && contribuable_id!='') || this.isEdit){
    this.invoicedetail.push(this.generaterow());
  }else{
    Swal.fire('', 'Entrer le matricule de contribuable!', 'error');
  }
}

generaterow(){
  return this.builder.group({
    taxe_id:this.builder.control(''),
    montant_id:this.builder.control(''),
  });
}

uploadFiles(): void {
  if(this.mainForm.valid){
    this.loading=true;
    if (this.selectedFiles){
      for (let i = 0; i < this.selectedFiles.length; i++) {
        this.upload(i, this.selectedFiles[i]);
      }
    }else if(this.mainForm.get('preference')?.value! =='ov'){
      Swal.fire('Echec', 'Vueillez ajouter le bordereau du versement!', 'error');
      this.loading=false;
    }else{
      this.service.saveData(this.mainForm.getRawValue()).subscribe(
        (event: any) => {
            this.loading=false;
            this.route.navigateByUrl('/paiements/liste');
            Swal.fire({
                title: 'Enregistrement',
                text:   'Fait avec succès',
                icon: 'success'
            });
            this.loading=false;
          },
        (err: any) => {
          this.errors=err.error;
          this.loading=false;
        }
      );
    }
       
  }else{
    Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
    this.loading=false;
  }

  }


  getcontribuable(){
    this.serviceContribuable.getData().subscribe(res=>{
      this.contribuables = res;
    })
  }

  getTaxe(){
    this.serviceTaxe.getData().subscribe(res=>{
      this.taxes = res;
    })
  }

  getMontant(){
    this.serviceMontant.getData().subscribe(res=>{
      this.montants = res;
    })
  }

  getBanques(){
    this.serviceBanque.getData().subscribe(res=>{
      this.banques = res;
    })
  }


  RemoveProduct(index:any){
    Swal.fire({
      title: 'Voulez-vous supprimer cette vente?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Oui, supprimez-là!',
      cancelButtonText: 'Non, Annuler'
    }).then((result) => {
      if (result.value) {
        this.invoicedetail = this.mainForm.get("details") as FormArray;
        this.invoiceproduct= this.invoicedetail.at(index) as FormGroup;
        let article_id = this.invoiceproduct.getRawValue().article_id;
        if(article_id){
          console.log(article_id);
            this.service.deleteTaxe(article_id).pipe(
              tap((res:any)=>{
                if(res){
                  this.invproducts.removeAt(index);
                  Swal.fire(
                    'Supprimer!',
                    'Suppression fait avec succès.',
                    'success'
                  )
                }else{
                  Swal.fire(
                    'Echec',
                    'Echec de suppression',
                    'error'
                  )
                }
              })
            ).subscribe();
        }else{
          this.invproducts.removeAt(index);
          Swal.fire(
            'Supprimer!',
            'Suppression fait avec succès.',
            'success'
          )
        }

      }else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Annuler',
          'Suppression annuler avec succès',
          'success'
        )
      }
    })
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


upload(idx: number, file: File): void {
  this.progressInfos[idx] = {value: 0,fileName:file.name};
  if (file) {
    var myFormData = new FormData();
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    this.service.saveData(this.mainForm.getRawValue()).subscribe(
      (historique_id: any)=>{
        myFormData.append('bordereau', file);
        myFormData.append('paiement_taxe_id', historique_id);
        this.service.saveDataBord(myFormData).subscribe(
            (event: any) => {
                this.loading=false;
                this.route.navigateByUrl('/paiements/liste');
                Swal.fire({
                    title:'Enregistrement',
                    text:'Fait avec succès',
                    icon:'success'
                });
                this.loading=false;
            },
            (err: any) => {
              this.progressInfos[idx].value = 0;
              this.errors=err.error;
              this.loading=false;
            }
          );
        },
      (err: any) => {
        this.errors=err.error;
        this.loading=false;
      });


    
    
  }
}


}
