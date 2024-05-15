import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ProfilService } from 'src/app/admin/services/profil.service';
import { UserService } from 'src/app/admin/services/user.service';
import { AppService } from 'src/app/app.service';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.scss']
})
export class AdminUserComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:UserService ,
              private builder : FormBuilder,
              private route:Router,
              private appService:AppService,
              private servicep:ProfilService,
              private activerouter: ActivatedRoute) { }
  droits = this.appService.getDroits();
  user = this.appService.getDataUser();

  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  pageTitle="Ajout d'un utilisateur"
  progressInfos: any[] = [];
  previews: string[] = [];
  ifImage=false;
  linkImage='';
  idService:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  errors:any = [];
  profils:any = [];
  magasins:any = [];

  nameCtrl!: FormControl;
  telephoneCtrl!:FormControl;
  emailCtrl!:FormControl;


  ngOnInit(): void {
    
  }

  mainForm=this.builder.group({
    name:this.nameCtrl=this.builder.control('',[Validators.required]),
    telephone:this.telephoneCtrl=this.builder.control('',[Validators.required]),
    email:this.emailCtrl=this.builder.control('',[Validators.required,Validators.email]),
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

  uploadFiles(): void {
      if(this.mainForm.valid){
        this.loading=true;
          if (this.selectedFiles){
            for (let i = 0; i < this.selectedFiles.length; i++) {
              this.upload(i, this.selectedFiles[i]);
            }
          }else{
            this.service.saveUsernonImg(this.mainForm.getRawValue()).subscribe(
              (event: any) => {
                  this.loading=false;
                  this.route.navigateByUrl('/admin/user/list');
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

  upload(idx: number, file: File): void {
    this.progressInfos[idx] = { value: 0, fileName: file.name };

    if (file) {
      var myFormData = new FormData();
      const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');

      myFormData.append('image', file);
      myFormData.append('name', this.mainForm.get('name')?.value!);
      myFormData.append('telephone', this.mainForm.get('telephone')?.value!);
      myFormData.append('email', this.mainForm.get('email')?.value!);

        this.service.saveUser(myFormData).subscribe(
          (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse){
              this.loading=false;
              this.route.navigateByUrl('/admin/user/list');
              Swal.fire({
                  title: 'Enregistrement',
                  text:   'Fait avec succès',
                  icon: 'success'
              });
              this.loading=false;
            }
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
