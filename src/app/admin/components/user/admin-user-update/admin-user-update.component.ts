import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { UserService } from 'src/app/admin/services/user.service';
import { ProfilService } from 'src/app/admin/services/profil.service';


@Component({
  selector: 'app-admin-user-update',
  templateUrl: './admin-user-update.component.html',
  styleUrls: ['./admin-user-update.component.scss']
})
export class AdminUserUpdateComponent implements OnInit {

  base_url=`${environment.apiLink}`;
  constructor(private service:UserService,
              private servicep:ProfilService,
    
               private builder : FormBuilder,
               private route:Router,
               private activerouter: ActivatedRoute) { }
  selectedFiles?: FileList;
  selectedFileNames: string[] = [];
  pageTitle="Modification d'un utilisateur"
  progressInfos: any[] = [];
  previews: string[] = [];
  ifImage=false;
  linkImage='';
  idUser:any;
  isLoading=false;
  loading=false;
  errors:any = [];
  profils:any = [];
  magasins:any = [];

  nameCtrl!: FormControl;
  telephoneCtrl!:FormControl;
  emailCtrl!:FormControl;
 

  ngOnInit(): void {
    this.idUser=this.activerouter.snapshot.paramMap.get('id');
    this.isLoading=true;
    this.service.GetOneUser(this.idUser).subscribe(res=>{
      let editdata:any;
      editdata=res;
      if(editdata!=null){
        this.ifImage=true;
        this.mainForm.setValue({
          name:editdata.name,
          telephone:editdata.telephone,
          email:editdata.email,
        });
        this.linkImage=editdata.image;
      }
      this.isLoading=false;
    });

    this.getProfils();

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
      myFormData.append('id', this.idUser)

      this.service.EditUserImg(myFormData).subscribe(
            (event: any) => {
            if (event.type === HttpEventType.UploadProgress) {
              this.progressInfos[idx].value = Math.round(
                (100 * event.loaded) / event.total
              );
            } else if (event instanceof HttpResponse){
              this.route.navigateByUrl('/admin/user/list');
                Swal.fire({
                  title: 'Modification',
                  text:   'Fait avec succès',
                  icon: 'success'
              });
              this.loading=false;
            }
          },
          (err: any) => {
            this.progressInfos[idx].value = 0;
            Swal.fire({
              title: '',
              text:   'Echec de modification',
              icon: 'error'
          });
          this.loading=false;
          }
          );
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
      this.loading=true;
        if (this.selectedFiles){
          for (let i = 0; i < this.selectedFiles.length; i++) {
            this.upload(i, this.selectedFiles[i]);
          }
        }else{
          this.service.EditUser(this.idUser, this.mainForm.getRawValue()).subscribe(res=>{
              let result:any;
              result=res;
              if(result.message=='pass'){
                this.route.navigateByUrl('/admin/user/list');
                Swal.fire('', 'Modufication fait avec succès!', 'success');
                this.loading = false;
              }else{
                Swal.fire('', 'Echec modufication!', 'error');
                this.loading = false;
              }
          },
          (err: any) => {
            this.errors=err.error;
            this.loading=false;
          }
          );
        }
  }
  getProfils(){
    this.servicep.getProfils().subscribe(res=>{
      this.profils = res;
    })
  }
  



}
