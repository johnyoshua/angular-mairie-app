import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, AbstractControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import Swal from 'sweetalert2';
import { environment } from 'src/environments/environment';
import { VilleService } from '../../service/ville.service';
import { ProvinceService } from 'src/app/province/services/province.service';

@Component({
  selector: 'app-ville-create',
  templateUrl: './ville-create.component.html',
  styleUrls: ['./ville-create.component.scss']
})
export class VilleCreateComponent implements OnInit {

  base_url=`${environment.apiUrl}/`;
  constructor(private service:VilleService,
              private serviceProvince:ProvinceService,
              private builder : FormBuilder,
              private route:Router,
              private activerouter: ActivatedRoute) { }

  pageTitle="Ajout d'une ville";
  idClient:any;
  isEdit=false;
  isLoading=false;
  loading=false;
  selected:any;
  errors:any = [];
  provinces:any = [];

  descriptionCtrl!: FormControl;
  province_idtrl!: FormControl;
  emailCtrl!: FormControl;
  telephoneCtrl!: FormControl;

  ngOnInit(): void {
    this.getProvince();
    this.idClient=this.activerouter.snapshot.paramMap.get('id');
    if(this.idClient){
      this.isEdit=true;
      this.isLoading=true;
      this.pageTitle="Modifier les informations de la mairie";
      this.service.GetOne(this.idClient).pipe(
        tap(client=>{
          let data:any=client;
          this.setValueClient(data);
        })
      ).subscribe();
    }
  }

  private setValueClient(data:any){
      this.mainForm.setValue({
        province_id:data.province_id,
        description:data.description,
        email:data.email,
        telephone:data.telephone,
      })
      this.selected=''+data.tva+'';

      this.isLoading=false;
  }

  mainForm=this.builder.group({
    province_id:this.province_idtrl=this.builder.control('',[Validators.required]),
    description:this.descriptionCtrl=this.builder.control('',[Validators.required]),
    telephone:this.telephoneCtrl=this.builder.control('',[Validators.required]),
    email:this.emailCtrl=this.builder.control('',[Validators.required]),
   })

  getFormControlErrorText(ctrl: AbstractControl) {
    if (ctrl.hasError('required')) {
        return 'La description du province est obligatoire!';
    } else {
      return 'Ce champ contient une erreur';
    }
}

uploadFiles(): void {
  this.loading=true;
    if(this.isEdit){
      this.service.update(this.idClient,this.mainForm.getRawValue()).pipe(
        tap(res=>{
          let resultat:any=res;
          this.loading=false;
          if(resultat.message=='pass'){
            this.route.navigateByUrl('/villes/liste');
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
                  this.route.navigateByUrl('/villes/liste');
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

  getProvince(){
    this.serviceProvince.getData().subscribe(res=>{
      this.provinces = res;
    })
  }


}
