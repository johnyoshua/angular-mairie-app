import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, NgForm, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpEventType, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FileUploadService } from '../../../services/file-upload.service';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { ProfilService } from 'src/app/admin/services/profil.service';

@Component({
  selector: 'app-admin-profil',
  templateUrl: './admin-profil.component.html',
  styleUrls: ['./admin-profil.component.scss']
})
export class AdminProfilComponent implements OnInit {
  constructor(private service:ProfilService , private builder : FormBuilder,private route:Router, private activerouter: ActivatedRoute) { }
  pageTitle="Ajouter le profil"
  idprofil:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  errors:any = [];

  descriptionCtrl!: FormControl;

  ngOnInit(): void {
    this.idprofil=this.activerouter.snapshot.paramMap.get('id');
    if(this.idprofil!=null){
        this.pageTitle="Modifier le profil";
        this.isEdit=true;
        this.SetEditInfos(this.idprofil);
    }
  }

  SetEditInfos(id:any){
    this.isLoading=true;
    this.service.GetOneProfil(id).subscribe(res=>{
      let editdata:any;
      editdata=res;
      if(editdata!=null){
        this.mainForm.setValue({
          description:editdata.description,
        });
      }
      this.isLoading=false;
    });
  }

  mainForm=this.builder.group({
      description:this.descriptionCtrl=this.builder.control('',[Validators.required,Validators.minLength(3)]),
     });


  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'Ce champ est requis';
    } else if (ctrl.hasError('minlength')) {
      return 'La description du profil ne contient pas assez de chiffres';
    }  else {
      return 'Ce champ contient une erreur';
    }
}


  uploadFiles(): void {
    if(this.mainForm.valid){
      this.loading=true;
      if(this.isEdit){
        this.service.editProfil(this.idprofil,this.mainForm.getRawValue()).subscribe(res=>{
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
        },
        (err: any) => {
          this.errors=err.error;
          this.loading=false;
        }
      );
      }else{
        this.service.saveProfil(this.mainForm.getRawValue()).subscribe(res=>{
          let result:any;
          result=res;
          if(result){
            this.route.navigateByUrl('/admin/droits/'+result.profil_id);
            Swal.fire('', 'Enregistrement fait avec succès!', 'success');
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

    }else{
      Swal.fire('Echec', 'Vueillez remplir tous les champs!', 'error');
      this.loading=false;
    }

  }



}
