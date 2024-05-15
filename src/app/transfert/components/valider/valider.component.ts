import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, map, startWith, tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { BanqueService } from 'src/app/banque/services/banque.service';
import { TransfertService } from '../../services/transfert.service';

@Component({
  selector: 'app-valider',
  templateUrl: './valider.component.html',
  styleUrls: ['./valider.component.scss']
})
export class ValiderComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:TransfertService ,
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




  errors:any = [];
  caisse:any;



  mainForm=this.builder.group({
    transfert_id:this.builder.control(this.activerouter.snapshot.paramMap.get('id')),
   });

  ngOnInit(): void {

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
        Swal.fire('Echec', 'Vueillez ajouter la pièce de justification!', 'error');
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


        myFormData.append('piece', file);
        myFormData.append('transfert_id', this.mainForm.get('transfert_id')?.value!)
          this.service.SavePiece(myFormData).subscribe(
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
